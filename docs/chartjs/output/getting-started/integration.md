# Integration

Chart.js can be integrated with plain JavaScript or different module loaders. The examples below show how to load Chart.js in various systems.

If you're using a front-end framework (e.g., React, Angular, or Vue), please see available integrations.

## Script Tag

```html
<script src="path/to/chartjs/dist/chart.umd.js"></script>
<script>
    const myChart = new Chart(ctx, {...});
</script>
```

## Bundlers (Webpack, Rollup, etc.)

Chart.js is tree-shakeable, so it is necessary to import and register the controllers, elements, scales, and plugins you are going to use.

### Quick Start

If you don't care about the bundle size, you can use the `auto` package ensuring all features are available:

```javascript
import Chart from 'chart.js/auto';
```

### Bundle Optimization

When optimizing the bundle, import and register only the components needed in your application. The options are categorized into controllers, elements, plugins, and scales. Each type of chart has its own bare-minimum requirements:

- **Bar Chart**
  - `BarController`
  - `BarElement`
  - Default scales: `CategoryScale` (x), `LinearScale` (y)
  
- **Bubble Chart**
  - `BubbleController`
  - `PointElement`
  - Default scales: `LinearScale` (x/y)
  
- **Doughnut Chart**
  - `DoughnutController`
  - `ArcElement`
  - Not using scales
  
- **Line Chart**
  - `LineController`
  - `LineElement`
  - `PointElement`
  - Default scales: `CategoryScale` (x), `LinearScale` (y)
  
- **Pie Chart**
  - `PieController`
  - `ArcElement`
  - Not using scales
  
- **PolarArea Chart**
  - `PolarAreaController`
  - `ArcElement`
  - Default scale: `RadialLinearScale` (r)
  
- **Radar Chart**
  - `RadarController`
  - `LineElement`
  - `PointElement`
  - Default scale: `RadialLinearScale` (r)
  
- **Scatter Chart**
  - `ScatterController`
  - `PointElement`
  - Default scales: `LinearScale` (x/y)

### Available Plugins

- Decimation
- Filler - used to fill area described by `LineElement`
- Legend
- SubTitle
- Title
- Tooltip

### Available Scales

- **Cartesian Scales (x/y)**
  - CategoryScale
  - LinearScale
  - LogarithmicScale
  - TimeScale
  - TimeSeriesScale

- **Radial Scales (r)**
  - RadialLinearScale

### Helper Functions

To use helper functions, import them separately from the helpers package and use them as stand-alone functions.

Example of converting events to data values using bundlers:

```javascript
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    onClick: (e) => {
      const canvasPosition = getRelativePosition(e, chart);
      const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
      const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
    }
  }
});
```

## CommonJS

Because Chart.js is an ESM library, in CommonJS modules you should use a dynamic `import`:

```javascript
const { Chart } = await import('chart.js');
```

## RequireJS

**Important:** RequireJS can load only AMD modules, so be sure to require one of the UMD builds instead (i.e., `dist/chart.umd.js`).

```javascript
require(['path/to/chartjs/dist/chart.umd.js'], function(Chart){
    const myChart = new Chart(ctx, {...});
});
```

**Note:** To use the time scale, ensure one of the available date adapters and corresponding date library are fully loaded after requiring Chart.js. You can use nested requires:

```javascript
require(['chartjs'], function(Chart) {
    require(['moment'], function() {
        require(['chartjs-adapter-moment'], function() {
            new Chart(ctx, {...});
        });
    });
});
```