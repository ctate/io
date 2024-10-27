# Step-by-step guide

Follow this guide to get familiar with all major concepts of Chart.js: chart types and elements, datasets, customization, plugins, components, and tree-shaking. We'll build a Chart.js data visualization with a couple of charts from scratch.

## Build a new application with Chart.js

In a new folder, create the `package.json` file with the following contents:

```json
{
  "name": "chartjs-example",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  },
  "devDependencies": {
    "parcel": "^2.6.2"
  },
  "dependencies": {
    "@cubejs-client/core": "^0.31.0",
    "chart.js": "^4.0.0"
  }
}
```

Modern front-end applications often use JavaScript module bundlers, so we’ve picked Parcel as a nice zero-configuration build tool. We’re also installing Chart.js v4 and a JavaScript client for Cube, an open-source API for data apps we’ll use to fetch real-world data.

Run `npm install`, `yarn install`, or `pnpm install` to install the dependencies, then create the `src` folder. Inside that folder, create a simple `index.html` file:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Chart.js example</title>
  </head>
  <body>
    <div style="width: 800px;"><canvas id="acquisitions"></canvas></div>
    <script type="module" src="acquisitions.js"></script>
  </body>
</html>
```

Chart.js requires minimal markup: a `canvas` tag with an `id` for referencing the chart later. By default, Chart.js charts are responsive and take the whole enclosing container.

Create the `src/acquisitions.js` file with the following contents:

```jsx
import Chart from 'chart.js/auto'

(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();
```

This code imports `Chart`, the main Chart.js class, and instantiates a new `Chart` instance with the canvas element and options object. The chart type is set to `bar`, and the data consists of `labels` and `datasets`.

Run the example with `npm run dev`, `yarn dev`, or `pnpm dev` and navigate to localhost:1234 in your web browser.

### Simple customizations

To customize the chart, turn off animations and hide the legend and tooltips. Replace the `new Chart(...);` invocation in `src/acquisitions.js` with:

```jsx
  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
```

### Real-world data

To connect to a data API, create the `src/api.js` file with the following contents:

```jsx
import { CubejsApi } from '@cubejs-client/core';

const apiUrl = 'https://heavy-lansford.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1';
const cubeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMDAwMDAwMDAsImV4cCI6NTAwMDAwMDAwMH0.OHZOpOBVKr-sCwn8sbZ5UFsqI3uCs6e4omT7P6WVMFw';

const cubeApi = new CubejsApi(cubeToken, { apiUrl });

export async function getAquisitionsByYear() {
  const acquisitionsByYearQuery = {
    dimensions: [
      'Artworks.yearAcquired',
    ],
    measures: [
      'Artworks.count'
    ],
    filters: [ {
      member: 'Artworks.yearAcquired',
      operator: 'set'
    } ],
    order: {
      'Artworks.yearAcquired': 'asc'
    }
  };

  const resultSet = await cubeApi.load(acquisitionsByYearQuery);

  return resultSet.tablePivot().map(row => ({
    year: parseInt(row['Artworks.yearAcquired']),
    count: parseInt(row['Artworks.count'])
  }));
}

export async function getDimensions() {
  const dimensionsQuery = {
    dimensions: [
      'Artworks.widthCm',
      'Artworks.heightCm'
    ],
    measures: [
      'Artworks.count'
    ],
    filters: [
      {
        member: 'Artworks.classification',
        operator: 'equals',
        values: [ 'Painting' ]
      },
      {
        member: 'Artworks.widthCm',
        operator: 'set'
      },
      {
        member: 'Artworks.widthCm',
        operator: 'lt',
        values: [ '500' ]
      },
      {
        member: 'Artworks.heightCm',
        operator: 'set'
      },
      {
        member: 'Artworks.heightCm',
        operator: 'lt',
        values: [ '500' ]
      }
    ]
  };

  const resultSet = await cubeApi.load(dimensionsQuery);

  return resultSet.tablePivot().map(row => ({
    width: parseInt(row['Artworks.widthCm']),
    height: parseInt(row['Artworks.heightCm']),
    count: parseInt(row['Artworks.count'])
  }));
}
```

Update `src/acquisitions.js` to use real-world data:

```jsx
import { getAquisitionsByYear } from './api'

// ...

const data = await getAquisitionsByYear();
```

### Further customizations

To create a Bubble chart, uncomment the following lines in `src/index.html`:

```html
<div style="width: 500px;"><canvas id="dimensions"></canvas></div><br/>
<script type="module" src="dimensions.js"></script>
```

Create the `src/dimensions.js` file with the following contents:

```jsx
import Chart from 'chart.js/auto'
import { getDimensions } from './api'

(async function() {
  const data = await getDimensions();

  new Chart(
    document.getElementById('dimensions'),
    {
      type: 'bubble',
      data: {
        labels: data.map(x => x.year),
        datasets: [
          {
            label: 'Dimensions',
            data: data.map(row => ({
              x: row.width,
              y: row.height,
              r: row.count
            }))
          }
        ]
      }
    }
  );
})();
```

Modify the aspect ratio for the bubble chart:

```jsx
new Chart(
  document.getElementById('dimensions'),
  {
    type: 'bubble',
    options: {
      aspectRatio: 1,
    },
```

Adjust the axes configuration:

```jsx
new Chart(
  document.getElementById('dimensions'),
  {
    type: 'bubble',
    options: {
      aspectRatio: 1,
      scales: {
        x: {
          max: 500
        },
        y: {
          max: 500
        }
      }
    },
```

Add custom tick formats:

```jsx
new Chart(
  document.getElementById('dimensions'),
  {
    type: 'bubble',
    options: {
      aspectRatio: 1,
      scales: {
        x: {
          max: 500,
          ticks: {
            callback: value => `${value / 100} m`
          }
        },
        y: {
          max: 500,
          ticks: {
            callback: value => `${value / 100} m`
          }
        }
      }
    },
```

### Multiple datasets

To separate datasets, replace the `datasets` with:

```jsx
datasets: [
  {
    label: 'width = height',
    data: data
      .filter(row => row.width === row.height)
      .map(row => ({
        x: row.width,
        y: row.height,
        r: row.count
      }))
  },
  {
    label: 'width > height',
    data: data
      .filter(row => row.width > row.height)
      .map(row => ({
        x: row.width,
        y: row.height,
        r: row.count
      }))
  },
  {
    label: 'width < height',
    data: data
      .filter(row => row.width < row.height)
      .map(row => ({
        x: row.width,
        y: row.height,
        r: row.count
      }))
  }
]
```

### Plugins

To customize Chart.js charts with plugins, insert the following snippet before the `new Chart(...);` invocation in `src/dimensions.js`:

```jsx
const chartAreaBorder = {
  id: 'chartAreaBorder',

  beforeDraw(chart, args, options) {
    const { ctx, chartArea: { left, top, width, height } } = chart;

    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  }
};

new Chart(
  document.getElementById('dimensions'),
  {
    type: 'bubble',
    plugins: [ chartAreaBorder ],
    options: {
      plugins: {
        chartAreaBorder: {
          borderColor: 'red',
          borderWidth: 2,
          borderDash: [ 5, 5 ],
          borderDashOffset: 2,
        }
      },
      aspectRatio: 1,
```

### Tree-shaking

To reduce the bundle size, remove the import statement `import Chart from 'chart.js/auto'` from both `src/acquisitions.js` and `src/dimensions.js`. Instead, load only necessary components and register them:

For `src/acquisitions.js`:

```jsx
import {
  Chart,
  Colors,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend
} from 'chart.js'

Chart.register(
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend
);
```

For `src/dimensions.js`:

```jsx
import {
  Chart,
  Colors,
  BubbleController,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
} from 'chart.js'

Chart.register(
  Colors,
  BubbleController,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend
);
```

Run `yarn build` to check the bundle size after applying tree-shaking.

## Next steps

Now you’re familiar with all major concepts of Chart.js: chart types and elements, datasets, customization, plugins, components, and tree-shaking. 

Feel free to review many examples of charts in the documentation and check the awesome list of Chart.js plugins and additional chart types as well as framework integrations. Also, consider joining Chart.js Discord and following Chart.js on Twitter.

Have fun and good luck building with Chart.js!