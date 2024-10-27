# Colors

Charts support three color options:
- For geometric elements, you can change background and border colors.
- For textual elements, you can change the font color.

You can also change the whole canvas background.

## Default colors

If a color is not specified, a global default color from `Chart.defaults` is used:

| Name               | Type                     | Description      | Default value               |
|--------------------|--------------------------|------------------|-----------------------------|
| `backgroundColor`  | Color                    | Background color  | rgba(0, 0, 0, 0.1)         |
| `borderColor`      | Color                    | Border color      | rgba(0, 0, 0, 0.1)         |
| `color`            | Color                    | Font color        | #666                        |

You can reset default colors by updating these properties of `Chart.defaults`:

```javascript
Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#36A2EB';
Chart.defaults.color = '#000';
```

### Per-dataset color settings

If your chart has multiple datasets, using default colors would make individual datasets indistinguishable. In that case, you can set `backgroundColor` and `borderColor` for each dataset:

```javascript
const data = {
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2, 3],
      borderColor: '#36A2EB',
      backgroundColor: '#9BD0F5',
    },
    {
      label: 'Dataset 2',
      data: [2, 3, 4],
      borderColor: '#FF6384',
      backgroundColor: '#FFB1C1',
    }
  ]
};
```

However, setting colors for each dataset might require additional work. In that case, consider using plugins with pre-defined or generated palettes.

### Default color palette

If you don't have any preference for colors, you can use the built-in `Colors` plugin. It will cycle through a palette of seven Chart.js brand colors.

All you need is to import and register the plugin:

```javascript
import { Colors } from 'chart.js';

Chart.register(Colors);
```

Note: If you are using the UMD version of Chart.js, this plugin will be enabled by default. You can disable it by setting the `enabled` option to `false`:

```javascript
const options = {
  plugins: {
    colors: {
      enabled: false
    }
  }
};
```

### Dynamic datasets at runtime

By default, the colors plugin only works when you initialize the chart without any colors for the border or background specified. If you want to force the colors plugin to always color your datasets, set the `forceOverride` option to true:

```javascript
const options = {
  plugins: {
    colors: {
      forceOverride: true
    }
  }
};
```

### Advanced color palettes

See the awesome list for plugins that provide more flexibility in defining color palettes.

## Color formats

You can specify the color as a string in the following notations:

| Notation         | Example               | Example with transparency |
|------------------|-----------------------|---------------------------|
| Hexadecimal      | #36A2EB               | #36A2EB80                 |
| RGB or RGBA      | rgb(54, 162, 235)     | rgba(54, 162, 235, 0.5)   |
| HSL or HSLA      | hsl(204, 82%, 57%)    | hsla(204, 82%, 57%, 0.5)  |

Alternatively, you can pass a CanvasPattern or CanvasGradient object instead of a string color.

## Patterns and Gradients

You can fill a dataset with a pattern from an image:

```javascript
const img = new Image();
img.src = 'https://example.com/my_image.png';
img.onload = () => {
  const ctx = document.getElementById('canvas').getContext('2d');
  const fillPattern = ctx.createPattern(img, 'repeat');

  const chart = new Chart(ctx, {
    data: {
      labels: ['Item 1', 'Item 2', 'Item 3'],
      datasets: [{
        data: [10, 20, 30],
        backgroundColor: fillPattern
      }]
    }
  });
};
```

Pattern fills can help viewers with vision deficiencies more easily understand your data.

You can use the Patternomaly library to generate patterns to fill datasets:

```javascript
const chartData = {
  datasets: [{
    data: [45, 25, 20, 10],
    backgroundColor: [
      pattern.draw('square', '#ff6384'),
      pattern.draw('circle', '#36a2eb'),
      pattern.draw('diamond', '#cc65fe'),
      pattern.draw('triangle', '#ffce56')
    ]
  }],
  labels: ['Red', 'Blue', 'Purple', 'Yellow']
};
```