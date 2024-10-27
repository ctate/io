# Bar Chart

A bar chart provides a way of showing data values represented as vertical bars. It is sometimes used to show trend data and the comparison of multiple data sets side by side.

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

module.exports = {
  actions: [],
  config: config,
};
```

## Dataset Properties

Namespaces:

- `data.datasets[index]` - options for this dataset only
- `options.datasets.bar` - options for all bar datasets
- `options.elements.bar` - options for all bar elements
- `options` - options for the whole chart

The bar chart allows a number of properties to be specified for each dataset. These are used to set display properties for a specific dataset. Only the `data` option needs to be specified in the dataset namespace.

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `base` | `number` | Yes | Yes |  |
| `barPercentage` | `number` | - | - | `0.9` |
| `barThickness` | `number` or `string` | - | - |  |
| `borderColor` | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `borderSkipped` | `string` or `boolean` | Yes | Yes | `'start'` |
| `borderWidth` | `number` or `object` | Yes | Yes | `0` |
| `borderRadius` | `number` or `object` | Yes | Yes | `0` |
| `categoryPercentage` | `number` | - | - | `0.8` |
| `clip` | `number` or `object` or `false` | - | - |  |
| `data` | `object` or `object[]` or `number[]` or `string[]` | - | - | **required** |
| `grouped` | `boolean` | - | - | `true` |
| `hoverBackgroundColor` | `Color` | Yes | Yes |  |
| `hoverBorderColor` | `Color` | Yes | Yes |  |
| `hoverBorderWidth` | `number` | Yes | Yes | `1` |
| `hoverBorderRadius` | `number` | Yes | Yes | `0` |
| `indexAxis` | `string` | - | - | `'x'` |
| `inflateAmount` | `number` or `'auto'` | Yes | Yes | `'auto'` |
| `maxBarThickness` | `number` | - | - |  |
| `minBarLength` | `number` | - | - |  |
| `label` | `string` | - | - | `''` |
| `order` | `number` | - | - | `0` |
| `pointStyle` | `pointStyle` | Yes | - | `'circle'` |
| `skipNull` | `boolean` | - | - |  |
| `stack` | `string` | - | - | `'bar'` |
| `xAxisID` | `string` | - | - | first x axis |
| `yAxisID` | `string` | - | - | first y axis |

All these values, if `undefined`, fallback to the scopes described in option resolution.

### Example dataset configuration

```javascript
data: {
    datasets: [{
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50, 60, 70]
    }]
};
```

### General

| Name | Description |
| ---- | ---- |
| `base` | Base value for the bar in data units along the value axis. Defaults to the value axis base value if not set. |
| `clip` | How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. `0` = clip at chartArea. |
| `grouped` | Should the bars be grouped on index axis. When `true`, all datasets at the same index value will be placed next to each other. When `false`, each bar is placed on its actual index-axis value. |
| `indexAxis` | The base axis of the dataset. `'x'` for vertical bars and `'y'` for horizontal bars. |
| `label` | The label for the dataset which appears in the legend and tooltips. |
| `order` | The drawing order of dataset. Affects order for stacking, tooltip, and legend. |
| `skipNull` | If `true`, null or undefined values will not be used for spacing calculations when determining bar size. |
| `stack` | The ID of the group to which this dataset belongs to (when stacked). |
| `xAxisID` | The ID of the x-axis to plot this dataset on. |
| `yAxisID` | The ID of the y-axis to plot this dataset on. |

### Styling

The style of each bar can be controlled with the following properties:

| Name | Description |
| ---- | ---- |
| `backgroundColor` | The bar background color. |
| `borderColor` | The bar border color. |
| `borderSkipped` | The edge to skip when drawing the bar. |
| `borderWidth` | The bar border width (in pixels). |
| `borderRadius` | The bar border radius (in pixels). |
| `minBarLength` | Set this to ensure that bars have a minimum length in pixels. |
| `pointStyle` | Style of the point for legend. |

All these values, if `undefined`, fallback to the associated elements.bar options.

#### borderSkipped

This setting is used to avoid drawing the bar stroke at the base of the fill or disable the border radius. Options are:

- `'start'`
- `'end'`
- `'middle'`
- `'bottom'`
- `'left'`
- `'top'`
- `'right'`
- `false` (don't skip any borders)
- `true` (skip all borders)

#### borderWidth

If this value is a number, it is applied to all sides of the rectangle. If this value is an object, the `left` property defines the left border width. Omitted borders and `borderSkipped` are skipped.

#### borderRadius

If this value is a number, it is applied to all corners of the rectangle. If this value is an object, the `topLeft` property defines the top-left corners border radius. Omitted corners and those touching the `borderSkipped` are skipped.

#### inflateAmount

This option can be used to inflate the rects that are used to draw the bars. The default value `'auto'` should work in most cases.

### Interactions

The interaction with each bar can be controlled with the following properties:

| Name | Description |
| ---- | ----------- |
| `hoverBackgroundColor` | The bar background color when hovered. |
| `hoverBorderColor` | The bar border color when hovered. |
| `hoverBorderWidth` | The bar border width when hovered (in pixels). |
| `hoverBorderRadius` | The bar border radius when hovered (in pixels). |

### barPercentage

Percent (0-1) of the available width each bar should be within the category width. 

### categoryPercentage

Percent (0-1) of the available width each category should be within the sample width.

### barThickness

If this value is a number, it is applied to the width of each bar, in pixels. When this is enforced, `barPercentage` and `categoryPercentage` are ignored.

### maxBarThickness

Set this to ensure that bars are not sized thicker than this.

## Scale Configuration

The bar chart sets unique default values for the following configuration from the associated scale options:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `offset` | `boolean` | `true` | If true, extra space is added to both edges and the axis is scaled to fit into the chart area. |
| `grid.offset` | `boolean` | `true` | If true, the bars for a particular data point fall between the grid lines. |

### Example scale configuration

```javascript
options = {
    scales: {
        x: {
            grid: {
              offset: true
            }
        }
    }
};
```

### Offset Grid Lines

If true, the bars for a particular data point fall between the grid lines. This is set to true for a category scale in a bar chart while false for other scales or chart types by default.

## Default Options

Global bar chart settings are stored in `Chart.overrides.bar`. Changing the global options only affects charts created after the change.

## barPercentage vs categoryPercentage

The following shows the relationship between the bar percentage option and the category percentage option.

```
// categoryPercentage: 1.0
// barPercentage: 1.0
Bar:        | 1.0 | 1.0 |
Category:   |    1.0    |
Sample:     |===========|

// categoryPercentage: 1.0
// barPercentage: 0.5
Bar:          |.5|  |.5|
Category:  |      1.0     |
Sample:    |==============|

// categoryPercentage: 0.5
// barPercentage: 1.0
Bar:             |1.0||1.0|
Category:        |   .5   |
Sample:     |==================|
```

## Data Structure

All the supported data structures can be used with bar charts.

## Stacked Bar Chart

Bar charts can be configured into stacked bar charts by changing the settings on the X and Y axes to enable stacking.

```javascript
const stackedBar = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }
});
```

## Horizontal Bar Chart

A horizontal bar chart is a variation on a vertical bar chart. To achieve this, set the `indexAxis` property in the options object to `'y'`.

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const config = {
  type: 'bar',
  data,
  options: {
    indexAxis: 'y',
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Horizontal Bar Chart config Options

The configuration options for the horizontal bar chart are the same as for the bar chart. However, any options specified on the x-axis in a bar chart are applied to the y-axis in a horizontal bar chart.

## Internal data format

`{x, y, _custom}` where `_custom` is an optional object defining stacked bar properties: `{start, end, barStart, barEnd, min, max}`.