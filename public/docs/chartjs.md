### Common options to all axes

Namespace: `options.scales[scaleId]`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `type` | `string` | | Type of scale being employed. Custom scales can be created and registered with a string key. This allows changing the type of an axis for a chart.
| `alignToPixels` | `boolean` | `false` | Align pixel values to device pixels.
| `backgroundColor` | [`Color`](/general/colors.md) | | Background color of the scale area.
| `border` | `object` | | Border configuration. [more...](/axes/styling.md#border-configuration)
| `display` | `boolean`\|`string` | `true` | Controls the axis global visibility (visible when `true`, hidden when `false`). When `display: 'auto'`, the axis is visible only if at least one associated dataset is visible.
| `grid` | `object` | | Grid line configuration. [more...](/axes/styling.md#grid-line-configuration)
| `min` | `number` | | User defined minimum number for the scale, overrides minimum value from data. [more...](/axes/index.md#axis-range-settings)
| `max` | `number` | | User defined maximum number for the scale, overrides maximum value from data. [more...](/axes/index.md#axis-range-settings)
| `reverse` | `boolean` | `false` | Reverse the scale.
| `stacked` | `boolean`\|`string` | `false` | Should the data be stacked. [more...](/axes/index.md#stacking)
| `suggestedMax` | `number` | | Adjustment used when calculating the maximum data value. [more...](/axes/index.md#axis-range-settings)
| `suggestedMin` | `number` | | Adjustment used when calculating the minimum data value. [more...](/axes/index.md#axis-range-settings)
| `ticks` | `object` | | Tick configuration. [more...](/axes/index.md#tick-configuration)
| `weight` | `number` | `0` | The weight used to sort the axis. Higher weights are further away from the chart area.


### Common tick options to all axes

Namespace: `options.scales[scaleId].ticks`

| Name | Type | Scriptable | Default | Description
| ---- | ---- | :-------------------------------: | ------- | -----------
| `backdropColor` | [`Color`](../../general/colors.md) | Yes | `'rgba(255, 255, 255, 0.75)'` | Color of label backdrops.
| `backdropPadding` | [`Padding`](../../general/padding.md) | | `2` | Padding of label backdrop.
| `callback` | `function` | | | Returns the string representation of the tick value as it should be displayed on the chart. See [callback](/axes/labelling.md#creating-custom-tick-formats).
| `display` | `boolean` | | `true` | If true, show tick labels.
| `color` | [`Color`](/general/colors.md) | Yes | `Chart.defaults.color` | Color of ticks.
| `font` | `Font` | Yes | `Chart.defaults.font` | See [Fonts](/general/fonts.md)
| `major` | `object` | | `{}` | [Major ticks configuration](/axes/styling.md#major-tick-configuration).
| `padding` | `number` | | `3` | Sets the offset of the tick labels from the axis
| `showLabelBackdrop` | `boolean` | Yes | `true` for radial scale, `false` otherwise | If true, draw a background behind the tick labels.
| `textStrokeColor` | [`Color`](/general/colors.md) | Yes | `` | The color of the stroke around the text.
| `textStrokeWidth` | `number` | Yes | `0` | Stroke width around the text.
| `z` | `number` | | `0` | z-index of tick layer. Useful when ticks are drawn on chart area. Values &lt;= 0 are drawn under datasets, &gt; 0 on top.


### Common options to all cartesian axes

Namespace: `options.scales[scaleId]`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `bounds` | `string` | `'ticks'` | Determines the scale bounds. [more...](./index.md#scale-bounds)
| `clip` | `boolean` | `true` | If true, clip the dataset drawing against the size of the scale instead of chart area
| `position` | `string` \| `object` | | Position of the axis. [more...](./index.md#axis-position)
| `stack` | `string` | | Stack group. Axes at the same `position` with same `stack` are stacked.
| `stackWeight` | `number` | 1 | Weight of the scale in stack group. Used to determine the amount of allocated space for the scale within the group.
| `axis` | `string` | | Which type of axis this is. Possible values are: `'x'`, `'y'`. If not set, this is inferred from the first character of the ID which should be `'x'` or `'y'`.
| `offset` | `boolean` | `false` | If true, extra space is added to the both edges and the axis is scaled to fit into the chart area. This is set to `true` for a bar chart by default.
| `title` | `object` | | Scale title configuration. [more...](../labelling.md#scale-title-configuration)


### Common tick options to all cartesian axes

Namespace: `options.scales[scaleId].ticks`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `align` | `string` | `'center'` | The tick alignment along the axis. Can be `'start'`, `'center'`, `'end'`, or `'inner'`. `inner` alignment means align `start` for first tick and `end` for the last tick of horizontal axis
| `crossAlign` | `string` | `'near'` | The tick alignment perpendicular to the axis. Can be `'near'`, `'center'`, or `'far'`. See [Tick Alignment](/axes/cartesian/#tick-alignment)
| `sampleSize` | `number` | `ticks.length` | The number of ticks to examine when deciding how many labels will fit. Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.
| `autoSkip` | `boolean` | `true` | If true, automatically calculates how many labels can be shown and hides labels accordingly. Labels will be rotated up to `maxRotation` before skipping any. Turn `autoSkip` off to show all labels no matter what.
| `autoSkipPadding` | `number` | `3` | Padding between the ticks on the horizontal axis when `autoSkip` is enabled.
| `includeBounds` | `boolean` | `true` | Should the defined `min` and `max` values be presented as ticks even if they are not "nice".
| `labelOffset` | `number` | `0` | Distance in pixels to offset the label from the centre point of the tick (in the x-direction for the x-axis, and the y-direction for the y-axis). *Note: this can cause labels at the edges to be cropped by the edge of the canvas*
| `maxRotation` | `number` | `50` | Maximum rotation for tick labels when rotating to condense labels. Note: Rotation doesn't occur until necessary. *Note: Only applicable to horizontal scales.*
| `minRotation` | `number` | `0` | Minimum rotation for tick labels. *Note: Only applicable to horizontal scales.*
| `mirror` | `boolean` | `false` | Flips tick labels around axis, displaying the labels inside the chart instead of outside. *Note: Only applicable to vertical scales.*
| `padding` | `number` | `0` | Padding between the tick label and the axis. When set on a vertical axis, this applies in the horizontal (X) direction. When set on a horizontal axis, this applies in the vertical (Y) direction.
| `maxTicksLimit` | `number` | `11` | Maximum number of ticks and gridlines to show.


# Category Axis

If the global configuration is used, labels are drawn from one of the label arrays included in the chart data. If only `data.labels` is defined, this will be used. If `data.xLabels` is defined and the axis is horizontal, this will be used. Similarly, if `data.yLabels` is defined and the axis is vertical, this property will be used. Using both `xLabels` and `yLabels` together can create a chart that uses strings for both the X and Y axes.

Specifying any of the settings above defines the x-axis as `type: 'category'` if not defined otherwise. For more fine-grained control of category labels, it is also possible to add `labels` as part of the category axis definition. Doing so does not apply the global defaults.

## Category Axis Definition

Globally:

```javascript
let chart = new Chart(ctx, {
    type: ...
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: ...
    }
});
```

As part of axis definition:

```javascript
let chart = new Chart(ctx, {
    type: ...
    data: ...
    options: {
        scales: {
            x: {
                type: 'category',
                labels: ['January', 'February', 'March', 'April', 'May', 'June']
            }
        }
    }
});
```

## Configuration Options

### Category Axis specific options

Namespace: `options.scales[scaleId]`

| Name | Type | Description
| ---- | ---- | -----------
| `min` | `string`\|`number` | The minimum item to display. [more...](#min-max-configuration)
| `max` | `string`\|`number` | The maximum item to display. [more...](#min-max-configuration)
| `labels` | `string[]`\|`string[][]` | An array of labels to display. When an individual label is an array of strings, each item is rendered on a new line.

!!!include(axes/cartesian/_common.md)!!!

!!!include(axes/_common.md)!!!

## Tick Configuration

!!!include(axes/cartesian/_common_ticks.md)!!!

!!!include(axes/_common_ticks.md)!!!

## Min Max Configuration

For both the `min` and `max` properties, the value must be `string` in the `labels` array or `numeric` value as an index of a label in that array. In the example below, the x axis would only display "March" through "June".

```javascript
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [10, 20, 30, 40, 50, 60]
        }],
        labels: ['January', 'February', 'March', 'April', 'May', 'June']
    },
    options: {
        scales: {
            x: {
                min: 'March'
            }
        }
    }
});
```

## Internal data format

Internally category scale uses label indices


# Cartesian Axes

Axes that follow a cartesian grid are known as 'Cartesian Axes'. Cartesian axes are used for line, bar, and bubble charts. Four cartesian axes are included in Chart.js by default:

- linear
- logarithmic
- category
- time
- timeseries

## Visual Components

A cartesian axis is composed of visual components that can be individually configured. These components are:

- border
- grid lines
- tick
- tick mark
- title

### Border

The axis border is drawn at the edge of the axis, beside the chart area. 

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 0, 5],
  }]
};

const config = {
  type: 'line',
  data,
  options: {
    scales: {
      x: {
        border: {
          color: 'red'
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Grid lines

The grid lines for an axis are drawn on the chart area.

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 0, 5],
  }]
};

const config = {
  type: 'line',
  data,
  options: {
    scales: {
      x: {
        grid: {
          color: 'red',
          borderColor: 'grey',
          tickColor: 'grey'
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Ticks and Tick Marks

Ticks represent data values on the axis that appear as labels. The tick mark is the extension of the grid line from the axis border to the label.

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 0, 5],
  }]
};

const config = {
  type: 'line',
  data,
  options: {
    scales: {
      x: {
        grid: {
          tickColor: 'red'
        },
        ticks: {
          color: 'blue',
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Title

The title component of the axis is used to label the data.

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 0, 5],
  }]
};

const config = {
  type: 'line',
  data,
  options: {
    scales: {
      x: {
        title: {
          color: 'red',
          display: true,
          text: 'Month'
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

## Common Configuration

Note: These are only the common options supported by all cartesian axes. Please see the specific axis documentation for all the available options for that axis.

### Axis Position

An axis can either be positioned at the edge of the chart, at the center of the chart area, or dynamically with respect to a data value.

To position the axis at the edge of the chart, set the `position` option to one of: `'top'`, `'left'`, `'bottom'`, `'right'`. To position the axis at the center of the chart area, set the `position` option to `'center'`. In this mode, either the `axis` option must be specified or the axis ID has to start with the letter 'x' or 'y'. To position the axis with respect to a data value, set the `position` option to an object such as:

```javascript
{
    x: -20
}
```

### Scale Bounds

The `bounds` property controls the scale boundary strategy (bypassed by `min`/`max` options).

- `'data'`: makes sure data are fully visible, labels outside are removed
- `'ticks'`: makes sure ticks are fully visible, data outside are truncated

### Tick Configuration

Note: These are only the common tick options supported by all cartesian axes. Please see specific axis documentation for all of the available options for that axis.

### Tick Alignment

The alignment of ticks is primarily controlled using two settings on the tick configuration object: `align` and `crossAlign`. 

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
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
    borderWidth: 1,
    data: [65, 59, 80, 81, 56, 55, 40],
  }]
};

const config = {
  type: 'bar',
  data,
  options: {
    indexAxis: 'y',
    scales: {
      y: {
        ticks: {
          crossAlign: 'far',
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Axis ID

The properties `dataset.xAxisID` or `dataset.yAxisID` have to match to `scales` property. 

```javascript
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            yAxisID: 'first-y-axis'
        }, {
            yAxisID: 'second-y-axis'
        }]
    },
    options: {
        scales: {
            'first-y-axis': {
                type: 'linear'
            },
            'second-y-axis': {
                type: 'linear'
            }
        }
    }
});
```

## Creating Multiple Axes

With cartesian axes, it is possible to create multiple X and Y axes. To do so, you can add multiple configuration objects to the `xAxes` and `yAxes` properties. 

```javascript
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [20, 50, 100, 75, 25, 0],
            label: 'Left dataset',
            yAxisID: 'left-y-axis'
        }, {
            data: [0.1, 0.5, 1.0, 2.0, 1.5, 0],
            label: 'Right dataset',
            yAxisID: 'right-y-axis'
        }],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    options: {
        scales: {
            'left-y-axis': {
                type: 'linear',
                position: 'left'
            },
            'right-y-axis': {
                type: 'linear',
                position: 'right'
            }
        }
    }
});
```

# Linear Axis

The linear scale is used to chart numerical data and can be placed on either the x or y-axis. The scatter chart type automatically configures a line chart to use one of these scales for the x-axis. Linear interpolation is used to determine where a value lies on the axis.

## Configuration Options

### Linear Axis Specific Options

Namespace: `options.scales[scaleId]`

| Name            | Type            | Description                                                                 |
|-----------------|-----------------|-----------------------------------------------------------------------------|
| `beginAtZero`   | `boolean`       | If true, scale will include 0 if it is not already included.               |
| `grace`         | `number` or `string` | Percentage (string ending with `%`) or amount (number) for added room in the scale range above and below data. |

## Tick Configuration

### Linear Axis Specific Tick Options

Namespace: `options.scales[scaleId].ticks`

| Name        | Type        | Scriptable | Default     | Description                                                                 |
|-------------|-------------|------------|-------------|-----------------------------------------------------------------------------|
| `count`     | `number`    | Yes        | `undefined` | The number of ticks to generate. If specified, this overrides the automatic generation. |
| `format`    | `object`    | Yes        |             | The `Intl.NumberFormat` options used by the default label formatter.        |
| `precision` | `number`    | Yes        |             | If defined and `stepSize` is not specified, the step size will be rounded to this many decimal places. |
| `stepSize`  | `number`    | Yes        |             | User-defined fixed step size for the scale.                                 |

## Step Size

If set, the scale ticks will be enumerated by multiples of `stepSize`, having one tick per increment. If not set, the ticks are labeled automatically using the nice numbers algorithm.

Example configuration for a chart with a y-axis that creates ticks at `0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5`:

```javascript
let options = {
    scales: {
        y: {
            max: 5,
            min: 0,
            ticks: {
                stepSize: 0.5
            }
        }
    }
};
```

## Grace

If the value is a string ending with `%`, it's treated as a percentage. If a number, it's treated as a value. The value is added to the maximum data value and subtracted from the minimum data, extending the scale range as if the data values were that much greater.

Example configuration:

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: ['Positive', 'Negative'],
  datasets: [{
    data: [100, -50],
    backgroundColor: 'rgb(255, 99, 132)'
  }],
};

const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      y: {
        type: 'linear',
        grace: '5%'
      }
    },
    plugins: {
      legend: false
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

## Internal Data Format

Internally, the linear scale uses numeric data.

# Logarithmic Axis

The logarithmic scale is used to chart numerical data. It can be placed on either the x or y-axis. As the name suggests, logarithmic interpolation is used to determine where a value lies on the axis.

## Configuration Options

!!!include(axes/cartesian/_common.md)!!!

!!!include(axes/_common.md)!!!

## Tick Configuration

### Logarithmic Axis specific options

Namespace: `options.scales[scaleId].ticks`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `format` | `object` | | The [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options used by the default label formatter

!!!include(axes/cartesian/_common_ticks.md)!!!

!!!include(axes/_common_ticks.md)!!!

## Internal data format

Internally, the logarithmic scale uses numeric data.


# Time Cartesian Axis

The time scale is used to display times and dates. Data are spread according to the amount of time between data points. When building its ticks, it will automatically calculate the most comfortable unit based on the size of the scale.

## Date Adapters

The time scale **requires** both a date library and a corresponding adapter to be present. Please choose from the [available adapters](https://github.com/chartjs/awesome#adapters).

## Data Sets

### Input Data

See [data structures](../../general/data-structures.md).

### Date Formats

When providing data for the time scale, Chart.js uses timestamps defined as milliseconds since the epoch (midnight January 1, 1970, UTC) internally. However, Chart.js also supports all of the formats that your chosen date adapter accepts. You should use timestamps if you'd like to set `parsing: false` for better performance.

## Configuration Options

### Time Axis specific options

Namespace: `options.scales[scaleId]`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `min` | `number`\|`string` | | The minimum item to display. [more...](#min-max-configuration)
| `max` | `number`\|`string` | | The maximum item to display. [more...](#min-max-configuration)
| `suggestedMin` | `number`\|`string` | | The minimum item to display if there is no datapoint before it. [more...](../index.md#axis-range-settings)
| `suggestedMax` | `number`\|`string` | | The maximum item to display if there is no datapoint behind it. [more...](../index.md#axis-range-settings)
| `adapters.date` | `object` | `{}` | Options for adapter for external date library if that adapter needs or supports options
| `bounds` | `string` | `'data'` | Determines the scale bounds. [more...](./index.md#scale-bounds)
| `offsetAfterAutoskip` | `boolean` | `false` | If true, bar chart offsets are computed with auto skipped ticks.
| `ticks.source` | `string` | `'auto'` | How ticks are generated. [more...](#ticks-source)
| `time.displayFormats` | `object` | | Sets how different time units are displayed. [more...](#display-formats)
| `time.isoWeekday` | `boolean`\|`number` | `false` | If `boolean` and true and the unit is set to 'week', then the first day of the week will be Monday. Otherwise, it will be Sunday. If `number`, the index of the first day of the week (0 - Sunday, 6 - Saturday)
| `time.parser` | `string`\|`function` | | Custom parser for dates. [more...](#parser)
| `time.round` | `string` | `false` | If defined, dates will be rounded to the start of this unit. See [Time Units](#time-units) below for the allowed units.
| `time.tooltipFormat` | `string` | | The format string to use for the tooltip.
| `time.unit` | `string` | `false` | If defined, will force the unit to be a certain type. See [Time Units](#time-units) section below for details.
| `time.minUnit` | `string` | `'millisecond'` | The minimum display format to be used for a time unit.

!!!include(axes/cartesian/_common.md)!!!

!!!include(axes/_common.md)!!!

#### Time Units

The following time measurements are supported. The names can be passed as strings to the `time.unit` config option to force a certain unit.

* `'millisecond'`
* `'second'`
* `'minute'`
* `'hour'`
* `'day'`
* `'week'`
* `'month'`
* `'quarter'`
* `'year'`

For example, to create a chart with a time scale that always displayed units per month, the following config could be used.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            }
        }
    }
});
```

#### Display Formats

You may specify a map of display formats with a key for each unit:

* `millisecond`
* `second`
* `minute`
* `hour`
* `day`
* `week`
* `month`
* `quarter`
* `year`

The format string used as a value depends on the date adapter you chose to use.

For example, to set the display format for the `quarter` unit to show the month and year, the following config might be passed to the chart constructor.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                }
            }
        }
    }
});
```

#### Ticks Source

The `ticks.source` property controls the ticks generation.

* `'auto'`: generates "optimal" ticks based on scale size and time options
* `'data'`: generates ticks from data (including labels from data `{x|y}` objects)
* `'labels'`: generates ticks from user given `labels` ONLY

#### Parser

If this property is defined as a string, it is interpreted as a custom format to be used by the date adapter to parse the date.

If this is a function, it must return a type that can be handled by your date adapter's `parse` method.

## Min Max Configuration

For both the `min` and `max` properties, the value must be `string` that is parsable by your date adapter or a number with the amount of milliseconds that have elapsed since UNIX epoch.
In the example below the x axis will start at 7 November 2021.

```javascript
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [{
                x: '2021-11-06 23:39:30',
                y: 50
            }, {
                x: '2021-11-07 01:00:28',
                y: 60
            }, {
                x: '2021-11-07 09:00:28',
                y: 20
            }]
        }],
    },
    options: {
        scales: {
            x: {
                min: '2021-11-07 00:00:00',
            }
        }
    }
});
```

## Changing the scale type from Time scale to Logarithmic/Linear scale.

When changing the scale type from Time scale to Logarithmic/Linear scale, you need to add `bounds: 'ticks'` to the scale options. Changing the `bounds` parameter is necessary because its default value is the `'data'` for the Time scale.

Initial config:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'time',
            }
        }
    }
});
```

Scale update:

```javascript
chart.options.scales.x = {
    type: 'logarithmic',
    bounds: 'ticks'
};
```

## Internal data format

Internally time scale uses milliseconds since epoch


# Time Series Axis

The time series scale extends from the time scale and supports all the same options. However, for the time series scale, each data point is spread equidistant.

## Example

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'timeseries',
            }
        }
    }
});
```

## More details

Please see [the time scale documentation](./time.md) for all other details.


# Axes

Axes are an integral part of a chart. They are used to determine how data maps to a pixel value on the chart. In a cartesian chart, there is 1 or more X-axis and 1 or more Y-axis to map points onto the 2-dimensional canvas. These axes are known as ['cartesian axes'](./cartesian/).

In a radial chart, such as a radar chart or a polar area chart, there is a single axis that maps points in the angular and radial directions. These are known as ['radial axes'](./radial/).

Scales in Chart.js >v2.0 are significantly more powerful, but also different from those of v1.0.

* Multiple X & Y axes are supported.
* A built-in label auto-skip feature detects would-be overlapping ticks and labels and removes every nth label to keep things displayed normally.
* Scale titles are supported.
* New scale types can be extended without writing an entirely new chart type.

## Default scales

The default `scaleId`'s for cartesian charts are `'x'` and `'y'`. For radial charts: `'r'`.
Each dataset is mapped to a scale for each axis (x, y or r) it requires. The scaleId's that a dataset is mapped to is determined by the `xAxisID`, `yAxisID` or `rAxisID`.
If the ID for an axis is not specified, the first scale for that axis is used. If no scale for an axis is found, a new scale is created.

Some examples:

The following chart will have `'x'` and `'y'` scales:

```js
let chart = new Chart(ctx, {
  type: 'line'
});
```

The following chart will have scales `'x'` and `'myScale'`:

```js
let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      data: [1, 2, 3]
    }]
  },
  options: {
    scales: {
      myScale: {
        type: 'logarithmic',
        position: 'right', // `axis` is determined by the position as `'y'`
      }
    }
  }
});
```

The following chart will have scales `'xAxis'` and `'yAxis'`:

```js
let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      yAxisID: 'yAxis'
    }]
  },
  options: {
    scales: {
      xAxis: {
        // The axis for this scale is determined from the first letter of the id as `'x'`
        // It is recommended to specify `position` and / or `axis` explicitly.
        type: 'time',
      }
    }
  }
});
```

The following chart will have `'r'` scale:

```js
let chart = new Chart(ctx, {
  type: 'radar'
});
```

The following chart will have `'myScale'` scale:

```js
let chart = new Chart(ctx, {
  type: 'radar',
  scales: {
    myScale: {
      axis: 'r'
    }
  }
});
```

## Common Configuration

:::tip Note
These are only the common options supported by all axes. Please see specific axis documentation for all the available options for that axis.
:::

!!!include(axes/_common.md)!!!

## Tick Configuration

:::tip Note
These are only the common tick options supported by all axes. Please see specific axis documentation for all the available tick options for that axis.
:::

!!!include(axes/_common_ticks.md)!!!

## Axis Range Settings

Given the number of axis range settings, it is important to understand how they all interact with each other.

The `suggestedMax` and `suggestedMin` settings only change the data values that are used to scale the axis. These are useful for extending the range of the axis while maintaining the auto-fit behaviour.

```javascript
let minDataValue = Math.min(mostNegativeValue, options.suggestedMin);
let maxDataValue = Math.max(mostPositiveValue, options.suggestedMax);
```

In this example, the largest positive value is 50, but the data maximum is expanded out to 100. However, because the lowest data value is below the `suggestedMin` setting, it is ignored.

```javascript
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'First dataset',
            data: [0, 20, 40, 50]
        }],
        labels: ['January', 'February', 'March', 'April']
    },
    options: {
        scales: {
            y: {
                suggestedMin: 50,
                suggestedMax: 100
            }
        }
    }
});
```

In contrast to the `suggested*` settings, the `min` and `max` settings set explicit ends to the axes. When these are set, some data points may not be visible.

## Stacking

By default, data is not stacked. If the `stacked` option of the value scale (y-axis on horizontal chart) is `true`, positive and negative values are stacked separately. Additionally, a `stack` option can be defined per dataset to further divide into stack groups [more...](../general/data-structures/#dataset-configuration).
For some charts, you might want to stack positive and negative values together. That can be achieved by specifying `stacked: 'single'`.

## Callbacks

There are a number of config callbacks that can be used to change parameters in the scale at different points in the update process. The options are supplied at the top level of the axis options.

Namespace: `options.scales[scaleId]`

| Name | Arguments | Description
| ---- | --------- | -----------
| `beforeUpdate` | `axis` | Callback called before the update process starts.
| `beforeSetDimensions` | `axis` | Callback that runs before dimensions are set.
| `afterSetDimensions` | `axis` | Callback that runs after dimensions are set.
| `beforeDataLimits` | `axis` | Callback that runs before data limits are determined.
| `afterDataLimits` | `axis` | Callback that runs after data limits are determined.
| `beforeBuildTicks` | `axis` | Callback that runs before ticks are created.
| `afterBuildTicks` | `axis` | Callback that runs after ticks are created. Useful for filtering ticks.
| `beforeTickToLabelConversion` | `axis` | Callback that runs before ticks are converted into strings.
| `afterTickToLabelConversion` | `axis` | Callback that runs after ticks are converted into strings.
| `beforeCalculateLabelRotation` | `axis` | Callback that runs before tick rotation is determined.
| `afterCalculateLabelRotation` | `axis` | Callback that runs after tick rotation is determined.
| `beforeFit` | `axis` | Callback that runs before the scale fits to the canvas.
| `afterFit` | `axis` | Callback that runs after the scale fits to the canvas.
| `afterUpdate` | `axis` | Callback that runs at the end of the update process.

### Updating Axis Defaults

The default configuration for a scale can be easily changed. All you need to do is set the new options to `Chart.defaults.scales[type]`.

For example, to set the minimum value of 0 for all linear scales, you would do the following. Any linear scales created after this time would now have a minimum of 0.

```javascript
Chart.defaults.scales.linear.min = 0;
```

## Creating New Axes

To create a new axis, see the [developer docs](../developers/axes.md).


# Labeling Axes

When creating a chart, you want to tell the viewer what data they are viewing. To do this, you need to label the axis.

## Scale Title Configuration

Namespace: `options.scales[scaleId].title`, it defines options for the scale title. Note that this only applies to cartesian axes.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `display` | `boolean` | `false` | If true, display the axis title.
| `align` | `string` | `'center'` | Alignment of the axis title. Possible options are `'start'`, `'center'` and `'end'`
| `text` | `string`\|`string[]` | `''` | The text for the title. (i.e. "# of People" or "Response Choices").
| `color` | [`Color`](../general/colors.md) | `Chart.defaults.color` | Color of label.
| `font` | `Font` | `Chart.defaults.font` | See [Fonts](../general/fonts.md)
| `padding` | [`Padding`](../general/padding.md) | `4` | Padding to apply around scale labels. Only `top`, `bottom` and `y` are implemented.

## Creating Custom Tick Formats

It is also common to want to change the tick marks to include information about the data type. For example, adding a dollar sign ('$').
To do this, you need to override the `ticks.callback` method in the axis configuration.

The method receives 3 arguments:

* `value` - the tick value in the **internal data format** of the associated scale. For time scale, it is a timestamp.
* `index` - the tick index in the ticks array.
* `ticks` - the array containing all of the [tick objects](../api/interfaces/Tick).

The call to the method is scoped to the scale. `this` inside the method is the scale object.

If the callback returns `null` or `undefined` the associated grid line will be hidden.

:::tip
The [category axis](../axes/cartesian/category), which is the default x-axis for line and bar charts, uses the `index` as internal data format. For accessing the label, use `this.getLabelForValue(value)`. [API: getLabelForValue](../api/classes/Scale.md#getlabelforvalue)
:::

In the following example, every label of the Y-axis would be displayed with a dollar sign at the front.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return '$' + value;
                    }
                }
            }
        }
    }
});
```

Keep in mind that overriding `ticks.callback` means that you are responsible for all formatting of the label. Depending on your use case, you may want to call the default formatter and then modify its output. In the example above, that would look like:

```javascript
                        // call the default formatter, forwarding `this`
                        return '$' + Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks]);
```

Related samples:

* [Tick configuration sample](../samples/scale-options/ticks)


# Radial Axes

Radial axes are used specifically for the radar and polar area chart types. These axes overlay the chart area, rather than being positioned on one of the edges. One radial axis is included by default in Chart.js.

## Visual Components

A radial axis is composed of visual components that can be individually configured. These components are:

- Angle lines
- Grid lines
- Point labels
- Ticks

### Angle Lines

The grid lines for an axis are drawn on the chart area. They stretch out from the center towards the edge of the canvas. In the example below, they are red.

```js
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 0, 5],
  }]
};

const config = {
  type: 'radar',
  data,
  options: {
    scales: {
      r: {
        angleLines: {
          color: 'red'
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Grid Lines

The grid lines for an axis are drawn on the chart area. In the example below, they are red.

```js
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 0, 5],
  }]
};

const config = {
  type: 'radar',
  data,
  options: {
    scales: {
      r: {
        grid: {
          color: 'red'
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Point Labels

The point labels indicate the value for each angle line. In the example below, they are red.

```js
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 0, 5],
  }]
};

const config = {
  type: 'radar',
  data,
  options: {
    scales: {
      r: {
        pointLabels: {
          color: 'red'
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Ticks

The ticks are used to label values based on how far they are from the center of the axis. In the example below, they are red.

```js
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 0, 5],
  }]
};

const config = {
  type: 'radar',
  data,
  options: {
    scales: {
      r: {
        ticks: {
          color: 'red'
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

# Linear Radial Axis

The linear radial scale is used to chart numerical data. Linear interpolation determines where a value lies in relation to the center of the axis.

## Configuration Options

### Linear Radial Axis specific options

Namespace: `options.scales[scaleId]`

| Name            | Type     | Default | Description                                                                 |
|-----------------|----------|---------|-----------------------------------------------------------------------------|
| `animate`       | `boolean`| `true`  | Whether to animate scaling the chart from the center.                      |
| `angleLines`    | `object` |         | Angle line configuration.                                                  |
| `beginAtZero`   | `boolean`| `false` | If true, scale will include 0 if it is not already included.              |
| `pointLabels`   | `object` |         | Point label configuration.                                                 |
| `startAngle`    | `number` | `0`     | Starting angle of the scale in degrees, 0 is at the top.                  |

### Common options for all axes

Namespace: `options.scales[scaleId]`

| Name            | Type     | Default | Description                                                                 |
|-----------------|----------|---------|-----------------------------------------------------------------------------|
| `type`          | `string` |         | Type of scale being employed. Custom scales can be created and registered. |
| `alignToPixels` | `boolean`| `false` | Align pixel values to device pixels.                                       |
| `backgroundColor` | `Color` |         | Background color of the scale area.                                        |
| `display`       | `boolean`| `true`  | Controls the axis global visibility.                                       |
| `grid`          | `object` |         | Grid line configuration.                                                   |
| `min`           | `number` |         | User defined minimum number for the scale.                                 |
| `max`           | `number` |         | User defined maximum number for the scale.                                 |
| `reverse`       | `boolean`| `false` | Reverse the scale.                                                         |
| `stacked`       | `boolean`| `false` | Should the data be stacked.                                                |
| `suggestedMax`  | `number` |         | Adjustment used when calculating the maximum data value.                   |
| `suggestedMin`  | `number` |         | Adjustment used when calculating the minimum data value.                   |
| `ticks`         | `object` |         | Tick configuration.                                                        |
| `weight`        | `number` | `0`     | The weight used to sort the axis.                                         |

## Tick Configuration

### Linear Radial Axis specific tick options

Namespace: `options.scales[scaleId].ticks`

| Name            | Type     | Scriptable | Default | Description                                                                 |
|-----------------|----------|------------|---------|-----------------------------------------------------------------------------|
| `count`         | `number` | Yes        | `undefined` | The number of ticks to generate.                                          |
| `format`        | `object` | Yes        |         | The `Intl.NumberFormat` options used by the default label formatter.      |
| `maxTicksLimit` | `number` | Yes        | `11`    | Maximum number of ticks and gridlines to show.                            |
| `precision`     | `number` | Yes        |         | If defined, the step size will be rounded to this many decimal places.    |
| `stepSize`      | `number` | Yes        |         | User defined fixed step size for the scale.                               |

The scriptable context is described in the Options section.

## Grid Line Configuration

Namespace: `options.scales[scaleId].grid`

| Name              | Type     | Scriptable | Indexable | Default                          | Description                                   |
|-------------------|----------|------------|-----------|----------------------------------|-----------------------------------------------|
| `borderDash`      | `number[]` |          |           | `[]`                            | Length and spacing of dashes on grid lines.  |
| `borderDashOffset`| `number` | Yes        |           | `0.0`                           | Offset for line dashes.                       |
| `circular`        | `boolean`|            |           | `false`                         | If true, gridlines are circular.              |
| `color`           | `Color`  | Yes        | Yes       | `Chart.defaults.borderColor`   | The color of the grid lines.                  |
| `display`         | `boolean`|            |           | `true`                          | If false, do not display grid lines.          |
| `lineWidth`       | `number` | Yes        | Yes       | `1`                             | Stroke width of grid lines.                    |

The scriptable context is described in the Options section.

## Axis Range Settings

The `suggestedMax` and `suggestedMin` settings change the data values used to scale the axis, useful for extending the range while maintaining auto-fit behavior.

```javascript
let minDataValue = Math.min(mostNegativeValue, options.ticks.suggestedMin);
let maxDataValue = Math.max(mostPositiveValue, options.ticks.suggestedMax);
```

In this example, the largest positive value is 50, but the data maximum is expanded to 100. The lowest data value below the `suggestedMin` is ignored.

```javascript
let chart = new Chart(ctx, {
    type: 'radar',
    data: {
        datasets: [{
            label: 'First dataset',
            data: [0, 20, 40, 50]
        }],
        labels: ['January', 'February', 'March', 'April']
    },
    options: {
        scales: {
            r: {
                suggestedMin: 50,
                suggestedMax: 100
            }
        }
    }
});
```

In contrast, the `min` and `max` settings set explicit ends to the axes, which may hide some data points.

## Step Size

If set, the scale ticks will be enumerated by multiples of `stepSize`. If not set, ticks are labeled automatically using the nice numbers algorithm.

```javascript
let options = {
    scales: {
        r: {
            max: 5,
            min: 0,
            ticks: {
                stepSize: 0.5
            }
        }
    }
};
```

## Angle Line Options

Namespace: `options.scales[scaleId].angleLines`

| Name            | Type     | Scriptable | Default | Description                                                                 |
|-----------------|----------|------------|---------|-----------------------------------------------------------------------------|
| `display`       | `boolean`|            | `true`  | If true, angle lines are shown.                                            |
| `color`         | `Color`  | Yes        | `Chart.defaults.borderColor` | Color of angled lines.            |
| `lineWidth`     | `number` | Yes        | `1`     | Width of angled lines.                                                     |
| `borderDash`    | `number[]` | Yes      | `[]`    | Length and spacing of dashes on angled lines.                             |
| `borderDashOffset` | `number` | Yes      | `0.0`   | Offset for line dashes.                                                   |

The scriptable context is described in the Options section.

## Point Label Options

Namespace: `options.scales[scaleId].pointLabels`

| Name              | Type     | Scriptable | Default | Description                                                                 |
|-------------------|----------|------------|---------|-----------------------------------------------------------------------------|
| `backdropColor`   | `Color`  | `true`     | `undefined` | Background color of the point label.                                     |
| `backdropPadding` | `Padding`|            | `2`     | Padding of label backdrop.                                                 |
| `borderRadius`    | `number` | `true`     | `0`     | Border radius of the point label.                                         |
| `display`         | `boolean`| `string`   | `true`  | If true, point labels are shown.                                          |
| `callback`        | `function`|           |         | Callback function to transform data labels to point labels.               |
| `color`           | `Color`  | Yes        | `Chart.defaults.color` | Color of label.                  |
| `font`            | `Font`   | Yes        | `Chart.defaults.font` | See Fonts.                       |
| `padding`         | `number` | Yes        | `5`     | Padding between chart and point labels.                                   |
| `centerPointLabels` | `boolean`|           | `false` | If true, point labels are centered.                                       |

The scriptable context is described in the Options section.

## Internal data format

Internally, the linear radial scale uses numeric data.

# Styling

There are a number of options to allow styling an axis. There are settings to control [grid lines](#grid-line-configuration) and [ticks](#tick-configuration).

## Grid Line Configuration

Namespace: `options.scales[scaleId].grid`, it defines options for the grid lines that run perpendicular to the axis.

| Name | Type | Scriptable | Indexable | Default | Description
| ---- | ---- | :-------------------------------: | :-----------------------------: | ------- | -----------
| `circular` | `boolean` | | | `false` | If true, gridlines are circular (on radar and polar area charts only).
| `color` | [`Color`](../general/colors.md)  | Yes | Yes | `Chart.defaults.borderColor` | The color of the grid lines. If specified as an array, the first color applies to the first grid line, the second to the second grid line, and so on.
| `display` | `boolean` | | | `true` | If false, do not display grid lines for this axis.
| `drawOnChartArea` | `boolean` | | | `true` | If true, draw lines on the chart area inside the axis lines. This is useful when there are multiple axes and you need to control which grid lines are drawn.
| `drawTicks` | `boolean` | | | `true` | If true, draw lines beside the ticks in the axis area beside the chart.
| `lineWidth` | `number` | Yes | Yes | `1` | Stroke width of grid lines.
| `offset` | `boolean` | | | `false` | If true, grid lines will be shifted to be between labels. This is set to `true` for a bar chart by default.
| `tickBorderDash` | `number[]` | Yes | Yes | `[]` | Length and spacing of the tick mark line. If not set, defaults to the grid line `borderDash` value.
| `tickBorderDashOffset` | `number` | Yes | Yes |  | Offset for the line dash of the tick mark. If unset, defaults to the grid line `borderDashOffset` value
| `tickColor` | [`Color`](../general/colors.md) | Yes | Yes | | Color of the tick line. If unset, defaults to the grid line color.
| `tickLength` | `number` | | | `8` | Length in pixels that the grid lines will draw into the axis area.
| `tickWidth` | `number` | Yes | Yes | | Width of the tick mark in pixels. If unset, defaults to the grid line width.
| `z` | `number` | | | `-1` | z-index of the gridline layer. Values &lt;= 0 are drawn under datasets, &gt; 0 on top.

The scriptable context is described in [Options](../general/options.md#tick) section.

## Tick Configuration

!!!include(axes/_common_ticks.md)!!!

The scriptable context is described in [Options](../general/options.md#tick) section.

## Major Tick Configuration

Namespace: `options.scales[scaleId].ticks.major`, it defines options for the major tick marks that are generated by the axis.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `enabled` | `boolean` | `false` | If true, major ticks are generated. A major tick will affect autoskipping and `major` will be defined on ticks in the scriptable options context.

## Border Configuration

Namespace: `options.scales[scaleId].border`, it defines options for the border that run perpendicular to the axis.

| Name | Type | Scriptable | Indexable | Default | Description
| ---- | ---- | :-------------------------------: | :-----------------------------: | ------- | -----------
| `display` | `boolean` | | | `true` | If true, draw a border at the edge between the axis and the chart area.
| `color` | [`Color`](../general/colors.md) | | | `Chart.defaults.borderColor` | The color of the border line.
| `width` | `number` | | | `1` | The width of the border line.
| `dash` | `number[]` | Yes | | `[]` | Length and spacing of dashes on grid lines. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `dashOffset` | `number` | Yes | | `0.0` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `z` | `number` | | | `0` | z-index of the border layer. Values &lt;= 0 are drawn under datasets, &gt; 0 on top.


# Area Chart

Both line and radar charts support a `fill` option on the dataset object which can be used to create space between two datasets or a dataset and a boundary, i.e. the scale `origin`, `start`, or `end`. 

**Note:** This feature is implemented by the `filler` plugin.

## Filling modes

| Mode | Type | Values |
| :--- | :--- | :--- |
| Absolute dataset index | `number` | `1`, `2`, `3`, ... |
| Relative dataset index | `string` | `'-1'`, `'-2'`, `'+1'`, ... |
| Boundary | `string` | `'start'`, `'end'`, `'origin'` |
| Disabled | `boolean` | `false` |
| Stacked value below | `string` | `'stack'` |
| Axis value | `object` | `{ value: number; }` |
| Shape (fill inside line) | `string` | `'shape'` |

For backward compatibility, `fill: true` is equivalent to `fill: 'origin'`.

### Example

```javascript
new Chart(ctx, {
    data: {
        datasets: [
            {fill: 'origin'},      
            {fill: '+2'},          
            {fill: 1},             
            {fill: false},         
            {fill: '-2'},          
            {fill: {value: 25}}    
        ]
    }
});
```

If you need to support multiple colors when filling from one dataset to another, you may specify an object with the following option:

| Param | Type | Description |
| :--- | :--- | :--- |
| `target` | `number`, `string`, `boolean`, `object` | The accepted values are the same as the filling mode values. |
| `above` | `Color` | Default color will be the background color of the chart. |
| `below` | `Color` | Same as above. |

### Example with multiple colors

```javascript
new Chart(ctx, {
    data: {
        datasets: [
            {
              fill: {
                target: 'origin',
                above: 'rgb(255, 0, 0)',   
                below: 'rgb(0, 0, 255)'    
              }
            }
        ]
    }
});
```

## Configuration

Namespace: `options.plugins.filler`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `drawTime` | `string` | `beforeDatasetDraw` | Filler draw time. Supported values: `'beforeDraw'`, `'beforeDatasetDraw'`, `'beforeDatasetsDraw'` |
| `propagate` | `boolean` | `true` | Fill propagation when target is hidden. |

### propagate

`propagate` takes a `boolean` value (default: `true`).

If `true`, the fill area will be recursively extended to the visible target defined by the `fill` value of hidden dataset targets.

#### Example using propagate

```javascript
new Chart(ctx, {
    data: {
        datasets: [
            {fill: 'origin'},   
            {fill: '-1'},       
            {fill: 1},          
            {fill: false},      
            {fill: '-2'}        
        ]
    },
    options: {
        plugins: {
            filler: {
                propagate: true
            }
        }
    }
});
```

`propagate: true`:
- If dataset 2 is hidden, dataset 4 will fill to dataset 1.
- If dataset 2 and 1 are hidden, dataset 4 will fill to `'origin'`.

`propagate: false`:
- If dataset 2 and/or 4 are hidden, dataset 4 will not be filled.

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

# Bubble Chart

A bubble chart is used to display three dimensions of data simultaneously. The bubble's location is determined by the first two dimensions on the horizontal and vertical axes, while the third dimension is represented by the size of the bubbles.

```js
const data = {
  datasets: [{
    label: 'First Dataset',
    data: [{
      x: 20,
      y: 30,
      r: 15
    }, {
      x: 40,
      y: 10,
      r: 10
    }],
    backgroundColor: 'rgb(255, 99, 132)'
  }]
};

const config = {
  type: 'bubble',
  data: data,
  options: {}
};

module.exports = {
  actions: [],
  config: config,
};
```

## Dataset Properties

Namespaces:

- `data.datasets[index]` - options for this dataset only
- `options.datasets.bubble` - options for all bubble datasets
- `options.elements.point` - options for all point elements
- `options` - options for the whole chart

The bubble chart allows several properties to be specified for each dataset, which are used to set display properties. For example, the color of the bubbles is generally set this way.

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | Color | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `borderColor` | Color | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `borderWidth` | number | Yes | Yes | `3` |
| `clip` | number\|object\|false | - | - | `undefined` |
| `data` | object[] | - | - | **required** |
| `drawActiveElementsOnTop` | boolean | Yes | Yes | `true` |
| `hoverBackgroundColor` | Color | Yes | Yes | `undefined` |
| `hoverBorderColor` | Color | Yes | Yes | `undefined` |
| `hoverBorderWidth` | number | Yes | Yes | `1` |
| `hoverRadius` | number | Yes | Yes | `4` |
| `hitRadius` | number | Yes | Yes | `1` |
| `label` | string | - | - | `undefined` |
| `order` | number | - | - | `0` |
| `pointStyle` | pointStyle | Yes | Yes | `'circle'` |
| `rotation` | number | Yes | Yes | `0` |
| `radius` | number | Yes | Yes | `3` |

All these values, if `undefined`, fallback to the scopes described in option resolution.

### General

| Name | Description |
| ---- | ---- |
| `clip` | How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. `0` = clip at chartArea. Clipping can also be configured per side. |
| `drawActiveElementsOnTop` | Draw the active bubbles of a dataset over the other bubbles of the dataset. |
| `label` | The label for the dataset which appears in the legend and tooltips. |
| `order` | The drawing order of dataset, affecting tooltip and legend order. |

### Styling

The style of each bubble can be controlled with the following properties:

| Name | Description |
| ---- | ---- |
| `backgroundColor` | Bubble background color. |
| `borderColor` | Bubble border color. |
| `borderWidth` | Bubble border width (in pixels). |
| `pointStyle` | Bubble shape style. |
| `rotation` | Bubble rotation (in degrees). |
| `radius` | Bubble radius (in pixels). |

All these values, if `undefined`, fallback to the associated elements.point options.

### Interactions

The interaction with each bubble can be controlled with the following properties:

| Name | Description |
| ---- | ---- |
| `hitRadius` | Bubble additional radius for hit detection (in pixels). |
| `hoverBackgroundColor` | Bubble background color when hovered. |
| `hoverBorderColor` | Bubble border color when hovered. |
| `hoverBorderWidth` | Bubble border width when hovered (in pixels). |
| `hoverRadius` | Bubble additional radius when hovered (in pixels). |

All these values, if `undefined`, fallback to the associated elements.point options.

## Default Options

Default values for the Bubble chart type can be changed, affecting all bubble charts created after this point. The default configuration for the bubble chart can be accessed at Chart.overrides.bubble.

## Data Structure

Bubble chart datasets must contain a `data` array of points, each represented by an object with the following properties:

```javascript
{
    x: number, // X Value
    y: number, // Y Value
    r: number  // Bubble radius in pixels (not scaled).
}
```

**Important:** The radius property, `r`, is not scaled by the chart; it is the raw radius in pixels of the bubble drawn on the canvas.

## Internal Data Format

`{x, y, _custom}` where `_custom` is the radius.

# Doughnut and Pie Charts

Pie and doughnut charts are commonly used charts divided into segments, where the arc of each segment shows the proportional value of each piece of data. They effectively illustrate relational proportions between data.

Pie and doughnut charts are the same class in Chart.js, differing only in their default `cutout` value: `0` for pie charts and `'50%'` for doughnuts. They are registered under two aliases in the `Chart` core.

## Doughnut Example

```js
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'doughnut',
  data: data,
};

module.exports = {
  actions: [],
  config: config,
};
```

## Pie Example

```js
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'pie',
  data: data,
};

module.exports = {
  actions: [],
  config: config,
};
```

## Dataset Properties

Namespaces:

- `data.datasets[index]` - options for this dataset only
- `options.datasets.doughnut` - options for all doughnut datasets
- `options.datasets.pie` - options for all pie datasets
- `options.elements.arc` - options for all arc elements
- `options` - options for the whole chart

### Properties

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | Color | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `borderAlign` | 'center'|'inner' | Yes | Yes | `'center'` |
| `borderColor` | Color | Yes | Yes | `'#fff'` |
| `borderDash` | number[] | Yes | - | `[]` |
| `borderDashOffset` | number | Yes | - | `0.0` |
| `borderJoinStyle` | 'round'|'bevel'|'miter' | Yes | Yes | `undefined` |
| `borderRadius` | number|object | Yes | Yes | `0` |
| `borderWidth` | number | Yes | Yes | `2` |
| `circumference` | number | - | - | `undefined` |
| `clip` | number|object|false | - | `undefined` |
| `data` | number[] | - | - | **required** |
| `hoverBackgroundColor` | Color | Yes | Yes | `undefined` |
| `hoverBorderColor` | Color | Yes | Yes | `undefined` |
| `hoverBorderDash` | number[] | Yes | - | `undefined` |
| `hoverBorderDashOffset` | number | Yes | - | `undefined` |
| `hoverBorderJoinStyle` | 'round'|'bevel'|'miter' | Yes | Yes | `undefined` |
| `hoverBorderWidth` | number | Yes | Yes | `undefined` |
| `hoverOffset` | number | Yes | Yes | `0` |
| `offset` | number|number[] | Yes | Yes | `0` |
| `rotation` | number | - | - | `undefined` |
| `spacing` | number | - | - | `0` |
| `weight` | number | - | - | `1` |

### General Properties

| Name | Description |
| ---- | ---- |
| `circumference` | Per-dataset override for the sweep that the arcs cover |
| `clip` | How to clip relative to chartArea |
| `rotation` | Per-dataset override for the starting angle to draw arcs from |

### Styling Properties

| Name | Description |
| ---- | ---- |
| `backgroundColor` | Arc background color |
| `borderColor` | Arc border color |
| `borderDash` | Arc border length and spacing of dashes |
| `borderDashOffset` | Arc border offset for line dashes |
| `borderJoinStyle` | Arc border join style |
| `borderWidth` | Arc border width (in pixels) |
| `offset` | Arc offset (in pixels) |
| `spacing` | Fixed arc offset (in pixels) |
| `weight` | Relative thickness of the dataset |

### Border Alignment

Supported values for `borderAlign`:

- `'center'` (default)
- `'inner'`

### Border Radius

If a number, it applies to all corners of the arc. If an object, specific properties can be defined for each corner.

### Interactions

| Name | Description |
| ---- | ----------- |
| `hoverBackgroundColor` | Arc background color when hovered |
| `hoverBorderColor` | Arc border color when hovered |
| `hoverBorderDash` | Arc border length and spacing of dashes when hovered |
| `hoverBorderDashOffset` | Arc border offset for line dashes when hovered |
| `hoverBorderJoinStyle` | Arc border join style when hovered |
| `hoverBorderWidth` | Arc border width when hovered (in pixels) |
| `hoverOffset` | Arc offset when hovered (in pixels) |

## Config Options

Customization options specific to Pie & Doughnut charts:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `cutout` | number|string | `50%` for doughnut, `0` for pie | Portion of the chart cut out of the middle |
| `radius` | number|string | `100%` | Outer radius of the chart |
| `rotation` | number | 0 | Starting angle to draw arcs from |
| `circumference` | number | 360 | Sweep to allow arcs to cover |
| `animation.animateRotate` | boolean | `true` | If true, the chart will animate in with a rotation animation |
| `animation.animateScale` | boolean | `false` | If true, will animate scaling the chart from the center outwards |

## Default Options

Default values for each Doughnut type can be changed at `Chart.overrides.doughnut`. Pie charts have similar defaults at `Chart.overrides.pie`, differing only in `cutout` being set to 0.

## Data Structure

For a pie chart, datasets must contain an array of data points (numbers). An array of labels is also needed for tooltips.

```javascript
data = {
    datasets: [{
        data: [10, 20, 30]
    }],
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
```

# Line Chart

A line chart is a way of plotting data points on a line, often used to show trend data or compare two data sets.

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: data,
};

module.exports = {
  actions: [],
  config: config,
};
```

## Dataset Properties

Namespaces:

- `data.datasets[index]` - options for this dataset only
- `options.datasets.line` - options for all line datasets
- `options.elements.line` - options for all line elements
- `options.elements.point` - options for all point elements
- `options` - options for the whole chart

### Properties

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | Color | Yes | - | `'rgba(0, 0, 0, 0.1)'` |
| `borderCapStyle` | string | Yes | - | `'butt'` |
| `borderColor` | Color | Yes | - | `'rgba(0, 0, 0, 0.1)'` |
| `borderDash` | number[] | Yes | - | `[]` |
| `borderDashOffset` | number | Yes | - | `0.0` |
| `borderJoinStyle` | 'round'|'bevel'|'miter' | Yes | - | `'miter'` |
| `borderWidth` | number | Yes | - | `3` |
| `clip` | number|object|false | - | `undefined` |
| `cubicInterpolationMode` | string | Yes | - | `'default'` |
| `data` | object|object[]|number[]|string[] | - | **required** |
| `drawActiveElementsOnTop` | boolean | Yes | Yes | `true` |
| `fill` | boolean|string | Yes | - | `false` |
| `hoverBackgroundColor` | Color | Yes | - | `undefined` |
| `hoverBorderCapStyle` | string | Yes | - | `undefined` |
| `hoverBorderColor` | Color | Yes | - | `undefined` |
| `hoverBorderDash` | number[] | Yes | - | `undefined` |
| `hoverBorderDashOffset` | number | Yes | - | `undefined` |
| `hoverBorderJoinStyle` | 'round'|'bevel'|'miter' | Yes | - | `undefined` |
| `hoverBorderWidth` | number | Yes | - | `undefined` |
| `indexAxis` | string | - | - | `'x'` |
| `label` | string | - | - | `''` |
| `order` | number | - | - | `0` |
| `pointBackgroundColor` | Color | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `pointBorderColor` | Color | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `pointBorderWidth` | number | Yes | Yes | `1` |
| `pointHitRadius` | number | Yes | Yes | `1` |
| `pointHoverBackgroundColor` | Color | Yes | Yes | `undefined` |
| `pointHoverBorderColor` | Color | Yes | Yes | `undefined` |
| `pointHoverBorderWidth` | number | Yes | Yes | `1` |
| `pointHoverRadius` | number | Yes | Yes | `4` |
| `pointRadius` | number | Yes | Yes | `3` |
| `pointRotation` | number | Yes | Yes | `0` |
| `pointStyle` | pointStyle | Yes | Yes | `'circle'` |
| `segment` | object | - | - | `undefined` |
| `showLine` | boolean | - | - | `true` |
| `spanGaps` | boolean|number | - | - | `undefined` |
| `stack` | string | - | - | `'line'` |
| `stepped` | boolean|string | - | - | `false` |
| `tension` | number | - | - | `0` |
| `xAxisID` | string | - | - | first x axis |
| `yAxisID` | string | - | - | first y axis |

### General Properties

| Name | Description |
| ---- | ---- |
| `clip` | How to clip relative to chartArea. |
| `drawActiveElementsOnTop` | Draw the active points of a dataset over the other points. |
| `indexAxis` | The base axis of the dataset. |
| `label` | The label for the dataset. |
| `order` | The drawing order of dataset. |
| `stack` | The ID of the group to which this dataset belongs. |
| `xAxisID` | The ID of the x-axis to plot this dataset on. |
| `yAxisID` | The ID of the y-axis to plot this dataset on. |

### Point Styling Properties

| Name | Description |
| ---- | ---- |
| `pointBackgroundColor` | The fill color for points. |
| `pointBorderColor` | The border color for points. |
| `pointBorderWidth` | The width of the point border in pixels. |
| `pointHitRadius` | The pixel size of the non-displayed point that reacts to mouse events. |
| `pointRadius` | The radius of the point shape. |
| `pointRotation` | The rotation of the point in degrees. |
| `pointStyle` | Style of the point. |

### Line Styling Properties

| Name | Description |
| ---- | ---- |
| `backgroundColor` | The line fill color. |
| `borderCapStyle` | Cap style of the line. |
| `borderColor` | The line color. |
| `borderDash` | Length and spacing of dashes. |
| `borderDashOffset` | Offset for line dashes. |
| `borderJoinStyle` | Line joint style. |
| `borderWidth` | The line width (in pixels). |
| `fill` | How to fill the area under the line. |
| `tension` | Bezier curve tension of the line. |
| `showLine` | If false, the line is not drawn for this dataset. |
| `spanGaps` | If true, lines will be drawn between points with no or null data. |

### Interactions Properties

| Name | Description |
| ---- | ---- |
| `pointHoverBackgroundColor` | Point background color when hovered. |
| `pointHoverBorderColor` | Point border color when hovered. |
| `pointHoverBorderWidth` | Border width of point when hovered. |
| `pointHoverRadius` | The radius of the point when hovered. |

### cubicInterpolationMode

Supported interpolation modes:

- `'default'`
- `'monotone'`

### Segment

Line segment styles can be overridden by scriptable options in the `segment` object. 

### Stepped

Supported values for `stepped`:

- `false`: No Step Interpolation (default)
- `true`: Step-before Interpolation
- `'before'`: Step-before Interpolation
- `'after'`: Step-after Interpolation
- `'middle'`: Step-middle Interpolation

## Default Options

Global line chart settings are stored in `Chart.overrides.line`. Changing global options affects only charts created after the change.

```javascript
Chart.overrides.line.spanGaps = true;
```

## Data Structure

All supported data structures can be used with line charts.

## Stacked Area Chart

Line charts can be configured into stacked area charts by enabling stacking on the y-axis.

```javascript
const stackedLine = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                stacked: true
            }
        }
    }
});
```

## Vertical Line Chart

To create a vertical line chart, set the `indexAxis` property to `'y'`.

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
  type: 'line',
  data: data,
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Config Options

Configuration options for the vertical line chart are the same as for the line chart. 

## Internal Data Format

`{x, y}`

# Mixed Chart Types

With Chart.js, it is possible to create mixed charts that combine two or more different chart types. A common example is a bar chart that also includes a line dataset.

When creating a mixed chart, specify the chart type for each dataset.

```javascript
const mixedChart = new Chart(ctx, {
    data: {
        datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40]
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: [50, 50, 50, 50],
        }],
        labels: ['January', 'February', 'March', 'April']
    },
    options: options
});
```

The chart will render as expected. Note that the default options for the charts are only considered at the dataset level and are not merged at the chart level.

```javascript
const data = {
  labels: [
    'January',
    'February',
    'March',
    'April'
  ],
  datasets: [{
    type: 'bar',
    label: 'Bar Dataset',
    data: [10, 20, 30, 40],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)'
  }, {
    type: 'line',
    label: 'Line Dataset',
    data: [50, 50, 50, 50],
    fill: false,
    borderColor: 'rgb(54, 162, 235)'
  }]
};

const config = {
  type: 'scatter',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

## Drawing Order

By default, datasets are drawn such that the first one is top-most. This can be altered by specifying the `order` option for datasets. The `order` defaults to `0`. This affects stacking, legend, and tooltip, essentially reordering the datasets.

The `order` property behaves like a weight; the higher the number, the sooner that dataset is drawn on the canvas, causing datasets with a lower order number to be drawn over it.

```javascript
const mixedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Bar Dataset',
            data: [10, 20, 30, 40],
            order: 2 // this dataset is drawn below
        }, {
            label: 'Line Dataset',
            data: [10, 10, 10, 10],
            type: 'line',
            order: 1 // this dataset is drawn on top
        }],
        labels: ['January', 'February', 'March', 'April']
    },
    options: options
});
```

# Polar Area Chart

Polar area charts are similar to pie charts, but each segment has the same angle; the radius of the segment differs depending on the value. This type of chart is useful for showing comparison data similar to a pie chart while also providing a scale of values for context.

```js
const data = {
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [11, 16, 7, 3, 14],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ]
  }]
};

const config = {
  type: 'polarArea',
  data: data,
  options: {}
};

module.exports = {
  actions: [],
  config: config,
};
```

## Dataset Properties

Namespaces:

- `data.datasets[index]` - options for this dataset only
- `options.datasets.polarArea` - options for all polarArea datasets
- `options.elements.arc` - options for all arc elements
- `options` - options for the whole chart

The following options can be included in a polar area chart dataset to configure options for that specific dataset.

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `borderAlign` | `'center'` | Yes | Yes | `'center'` |
| `borderColor` | `Color` | Yes | Yes | `'#fff'` |
| `borderDash` | `number[]` | Yes | - | `[]` |
| `borderDashOffset` | `number` | Yes | - | `0.0` |
| `borderJoinStyle` | `'round'` | Yes | Yes | `undefined` |
| `borderWidth` | `number` | Yes | Yes | `2` |
| `clip` | `number` | - | - | `undefined` |
| `data` | `number[]` | - | - | **required** |
| `hoverBackgroundColor` | `Color` | Yes | Yes | `undefined` |
| `hoverBorderColor` | `Color` | Yes | Yes | `undefined` |
| `hoverBorderDash` | `number[]` | Yes | - | `undefined` |
| `hoverBorderDashOffset` | `number` | Yes | - | `undefined` |
| `hoverBorderJoinStyle` | `'round'` | Yes | Yes | `undefined` |
| `hoverBorderWidth` | `number` | Yes | Yes | `undefined` |
| `circular` | `boolean` | Yes | Yes | `true` |

All these values, if `undefined`, fallback to the scopes described in option resolution.

### General

| Name | Description |
| ---- | ---- |
| `clip` | How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. `0` = clip at chartArea. Clipping can also be configured per side: `clip: {left: 5, top: false, right: -2, bottom: 0}` |

### Styling

The style of each arc can be controlled with the following properties:

| Name | Description |
| ---- | ---- |
| `backgroundColor` | arc background color. |
| `borderColor` | arc border color. |
| `borderDash` | arc border length and spacing of dashes. |
| `borderDashOffset` | arc border offset for line dashes. |
| `borderJoinStyle` | arc border join style. |
| `borderWidth` | arc border width (in pixels). |
| `circular` | By default the Arc is curved. If `circular: false` the Arc will be flat. |

All these values, if `undefined`, fallback to the associated elements.arc options.

### Border Alignment

The following values are supported for `borderAlign`.

- `'center'` (default)
- `'inner'`

When `'center'` is set, the borders of arcs next to each other will overlap. When `'inner'` is set, it is guaranteed that all the borders do not overlap.

### Interactions

The interaction with each arc can be controlled with the following properties:

| Name | Description |
| ---- | ----------- |
| `hoverBackgroundColor` | arc background color when hovered. |
| `hoverBorderColor` | arc border color when hovered. |
| `hoverBorderDash` | arc border length and spacing of dashes when hovered. |
| `hoverBorderDashOffset` | arc border offset for line dashes when hovered. |
| `hoverBorderJoinStyle` | arc border join style when hovered. |
| `hoverBorderWidth` | arc border width when hovered (in pixels). |

All these values, if `undefined`, fallback to the associated elements.arc options.

## Config Options

These are the customization options specific to Polar Area charts. These options are looked up on access and form together with the global chart default options the options of the chart.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `animation.animateRotate` | `boolean` | `true` | If true, the chart will animate in with a rotation animation. This property is in the `options.animation` object. |
| `animation.animateScale` | `boolean` | `true` | If true, will animate scaling the chart from the center outwards. |

The polar area chart uses the radialLinear scale. Additional configuration is provided via the scale.

## Default Options

We can also change these default values for each PolarArea type that is created. This object is available at `Chart.overrides.polarArea`. Changing the global options only affects charts created after the change. Existing charts are not changed.

For example, to configure all new polar area charts with `animateScale = false` you would do:

```javascript
Chart.overrides.polarArea.animation.animateScale = false;
```

## Data Structure

For a polar area chart, datasets need to contain an array of data points. The data points should be a number; Chart.js will total all of the numbers and calculate the relative proportion of each. You also need to specify an array of labels so that tooltips appear correctly for each slice.

```javascript
data = {
    datasets: [{
        data: [10, 20, 30]
    }],
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
```

# Radar Chart

A radar chart is a way of showing multiple data points and the variation between them. They are often useful for comparing the points of two or more different data sets.

```javascript
const data = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'My Second Dataset',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};

const config = {
  type: 'radar',
  data: data,
  options: {
    elements: {
      line: {
        borderWidth: 3
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
- `options.datasets.line` - options for all line datasets
- `options.elements.line` - options for all line elements
- `options.elements.point` - options for all point elements
- `options` - options for the whole chart

The radar chart allows a number of properties to be specified for each dataset. These are used to set display properties for a specific dataset.

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | `Color` | Yes | - | `'rgba(0, 0, 0, 0.1)'` |
| `borderCapStyle` | `string` | Yes | - | `'butt'` |
| `borderColor` | `Color` | Yes | - | `'rgba(0, 0, 0, 0.1)'` |
| `borderDash` | `number[]` | Yes | - | `[]` |
| `borderDashOffset` | `number` | Yes | - | `0.0` |
| `borderJoinStyle` | `'round'`|'bevel'|'miter' | Yes | - | `'miter'` |
| `borderWidth` | `number` | Yes | - | `3` |
| `hoverBackgroundColor` | `Color` | Yes | - | `undefined` |
| `hoverBorderCapStyle` | `string` | Yes | - | `undefined` |
| `hoverBorderColor` | `Color` | Yes | - | `undefined` |
| `hoverBorderDash` | `number[]` | Yes | - | `undefined` |
| `hoverBorderDashOffset` | `number` | Yes | - | `undefined` |
| `hoverBorderJoinStyle` | `'round'`|'bevel'|'miter' | Yes | - | `undefined` |
| `hoverBorderWidth` | `number` | Yes | - | `undefined` |
| `clip` | `number`|`object`|`false` | - | `undefined` |
| `data` | `number[]` | - | - | **required** |
| `fill` | `boolean`|`string` | Yes | - | `false` |
| `label` | `string` | - | - | `''` |
| `order` | `number` | - | - | `0` |
| `tension` | `number` | - | - | `0` |
| `pointBackgroundColor` | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `pointBorderColor` | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `pointBorderWidth` | `number` | Yes | Yes | `1` |
| `pointHitRadius` | `number` | Yes | Yes | `1` |
| `pointHoverBackgroundColor` | `Color` | Yes | Yes | `undefined` |
| `pointHoverBorderColor` | `Color` | Yes | Yes | `undefined` |
| `pointHoverBorderWidth` | `number` | Yes | Yes | `1` |
| `pointHoverRadius` | `number` | Yes | Yes | `4` |
| `pointRadius` | `number` | Yes | Yes | `3` |
| `pointRotation` | `number` | Yes | Yes | `0` |
| `pointStyle` | `pointStyle` | Yes | Yes | `'circle'` |
| `spanGaps` | `boolean` | - | - | `undefined` |

All these values, if `undefined`, fallback to the scopes described in option resolution.

### General

| Name | Description |
| ---- | ---- |
| `clip` | How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. `0` = clip at chartArea. Clipping can also be configured per side. |
| `label` | The label for the dataset which appears in the legend and tooltips. |
| `order` | The drawing order of dataset. Also affects order for tooltip and legend. |

### Point Styling

The style of each point can be controlled with the following properties:

| Name | Description |
| ---- | ---- |
| `pointBackgroundColor` | The fill color for points. |
| `pointBorderColor` | The border color for points. |
| `pointBorderWidth` | The width of the point border in pixels. |
| `pointHitRadius` | The pixel size of the non-displayed point that reacts to mouse events. |
| `pointRadius` | The radius of the point shape. If set to 0, the point is not rendered. |
| `pointRotation` | The rotation of the point in degrees. |
| `pointStyle` | Style of the point. |

All these values, if `undefined`, fallback first to the dataset options then to the associated elements.point options.

### Line Styling

The style of the line can be controlled with the following properties:

| Name | Description |
| ---- | ---- |
| `backgroundColor` | The line fill color. |
| `borderCapStyle` | Cap style of the line. |
| `borderColor` | The line color. |
| `borderDash` | Length and spacing of dashes. |
| `borderDashOffset` | Offset for line dashes. |
| `borderJoinStyle` | Line joint style. |
| `borderWidth` | The line width (in pixels). |
| `fill` | How to fill the area under the line. |
| `tension` | Bezier curve tension of the line. Set to 0 to draw straight lines. |
| `spanGaps` | If true, lines will be drawn between points with no or null data. If false, points with null data will create a break in the line. |

If the value is `undefined`, the values fallback to the associated elements.line options.

### Interactions

The interaction with each point can be controlled with the following properties:

| Name | Description |
| ---- | ----------- |
| `pointHoverBackgroundColor` | Point background color when hovered. |
| `pointHoverBorderColor` | Point border color when hovered. |
| `pointHoverBorderWidth` | Border width of point when hovered. |
| `pointHoverRadius` | The radius of the point when hovered. |

## Scale Options

The radar chart supports only a single scale. The options for this scale are defined in the `scales.r` property.

```javascript
options = {
    scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 50,
            suggestedMax: 100
        }
    }
};
```

## Default Options

It is common to want to apply a configuration setting to all created radar charts. The global radar chart settings are stored in `Chart.overrides.radar`. Changing the global options only affects charts created after the change. Existing charts are not changed.

## Data Structure

The `data` property of a dataset for a radar chart is specified as an array of numbers. Each point in the data array corresponds to the label at the same index.

```javascript
data: [20, 10]
```

For a radar chart, to provide context of what each point means, we include an array of strings that show around each point in the chart.

```javascript
data: {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
    datasets: [{
        data: [20, 10, 4, 2]
    }]
}
```

## Internal data format

`{x, y}`

# Scatter Chart

Scatter charts are based on basic line charts with the x-axis changed to a linear axis. To use a scatter chart, data must be passed as objects containing X and Y properties. The example below creates a scatter chart with 4 points.

```js
// <block:setup:1>
const data = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [{
      x: -10,
      y: 0
    }, {
      x: 0,
      y: 10
    }, {
      x: 10,
      y: 5
    }, {
      x: 0.5,
      y: 5.5
    }],
    backgroundColor: 'rgb(255, 99, 132)'
  }],
};
// </block:setup>

// <block:config:0>
const config = {
  type: 'scatter',
  data: data,
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    }
  }
};
// </block:config>

module.exports = {
  actions: [],
  config: config,
};
```

## Dataset Properties

Namespaces:

- `data.datasets[index]` - options for this dataset only
- `options.datasets.scatter` - options for all scatter datasets
- `options.elements.line` - options for all line elements
- `options.elements.point` - options for all point elements
- `options` - options for the whole chart

The scatter chart supports all the same properties as the line chart. By default, the scatter chart will override the showLine property of the line chart to `false`.

The index scale is of the type `linear`. This means, if you are using the labels array, the values have to be numbers or parsable to numbers; the same applies to the object format for the keys.

## Data Structure

Unlike the line chart where data can be supplied in two different formats, the scatter chart only accepts data in a point format.

```javascript
data: [{
        x: 10,
        y: 20
    }, {
        x: 15,
        y: 10
    }]
```

## Internal Data Format

`{x, y}`

# Animations

Chart.js animates charts out of the box. A number of options are provided to configure how the animation looks and how long it takes.

## Looping tension [property]

```js
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Looping tension',
    data: [65, 59, 80, 81, 26, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

## Hide and show [mode]

```js
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Try hiding me',
    data: [65, 59, 80, 81, 26, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

## Animation configuration

Animation configuration consists of 3 keys.

| Name | Type | Details |
| ---- | ---- | ------- |
| animation | `object` | animation |
| animations | `object` | animations |
| transitions | `object` | transitions |

These keys can be configured in the following paths:

- `` - chart options
- `datasets[type]` - dataset type options
- `overrides[type]` - chart type options

These paths are valid under `defaults` for global configuration and `options` for instance configuration.

## animation

The default configuration is defined in core.animations.js.

Namespace: `options.animation`

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `duration` | `number` | `1000` | The number of milliseconds an animation takes. |
| `easing` | `string` | `'easeOutQuart'` | Easing function to use. |
| `delay` | `number` | `undefined` | Delay before starting the animations. |
| `loop` | `boolean` | `undefined` | If set to `true`, the animations loop endlessly. |

These defaults can be overridden in `options.animation` or `dataset.animation` and `tooltip.animation`. These keys are also Scriptable.

## animations

Animations options configure which element properties are animated and how.

Namespace: `options.animations[animation]`

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `properties` | `string[]` | `key` | The property names this configuration applies to. |
| `type` | `string` | `typeof property` | Type of property, determines the interpolator used. |
| `from`  | `number`/`Color`/`boolean` | `undefined` | Start value for the animation. |
| `to`  | `number`/`Color`/`boolean` | `undefined` | End value for the animation. |
| `fn` | function | `undefined` | Optional custom interpolator. |

### Default animations

| Name | Option | Value |
| ---- | ------ | ----- |
| `numbers` | `properties` | `['x', 'y', 'borderWidth', 'radius', 'tension']` |
| `numbers` | `type` | `'number'` |
| `colors` | `properties` | `['color', 'borderColor', 'backgroundColor']` |
| `colors` | `type` | `'color'` |

## transitions

The core transitions are `'active'`, `'hide'`, `'reset'`, `'resize'`, `'show'`.

### Default transitions

Namespace: `options.transitions[mode]`

| Mode | Option | Value | Description |
| -----| ------ | ----- | ----------- |
| `'active'` | animation.duration | 400 | Override default duration to 400ms for hover animations. |
| `'resize'` | animation.duration | 0 | Override default duration to 0ms (= no animation) for resize. |
| `'show'` | animations.colors | `{ type: 'color', properties: ['borderColor', 'backgroundColor'], from: 'transparent' }` | Colors are faded in from transparent when dataset is shown. |
| `'show'` | animations.visible | `{ type: 'boolean', duration: 0 }` | Dataset visibility is immediately changed to true. |
| `'hide'` | animations.colors | `{ type: 'color', properties: ['borderColor', 'backgroundColor'], to: 'transparent' }` | Colors are faded to transparent when dataset is hidden. |
| `'hide'` | animations.visible | `{ type: 'boolean', easing: 'easeInExpo' }` | Visibility is changed to false at a very late phase of animation. |

## Disabling animation

To disable an animation configuration, set the animation node to `false`, except for animation modes which can be disabled by setting the `duration` to `0`.

```javascript
chart.options.animation = false; // disables all animations
chart.options.animations.colors = false; // disables animation defined by the collection of 'colors' properties
chart.options.animations.x = false; // disables animation defined by the 'x' property
chart.options.transitions.active.animation.duration = 0; // disables the animation for 'active' mode
```

## Easing

Available options are:

- `'linear'`
- `'easeInQuad'`
- `'easeOutQuad'`
- `'easeInOutQuad'`
- `'easeInCubic'`
- `'easeOutCubic'`
- `'easeInOutCubic'`
- `'easeInQuart'`
- `'easeOutQuart'`
- `'easeInOutQuart'`
- `'easeInQuint'`
- `'easeOutQuint'`
- `'easeInOutQuint'`
- `'easeInSine'`
- `'easeOutSine'`
- `'easeInOutSine'`
- `'easeInExpo'`
- `'easeOutExpo'`
- `'easeInOutExpo'`
- `'easeInCirc'`
- `'easeOutCirc'`
- `'easeInOutCirc'`
- `'easeInElastic'`
- `'easeOutElastic'`
- `'easeInOutElastic'`
- `'easeInBack'`
- `'easeOutBack'`
- `'easeInOutBack'`
- `'easeInBounce'`
- `'easeOutBounce'`
- `'easeInOutBounce'`

## Animation Callbacks

The animation configuration provides callbacks useful for synchronizing an external draw to the chart animation.

Namespace: `options.animation`

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `onProgress` | `function` | `null` | Callback called on each step of an animation. |
| `onComplete` | `function` | `null` | Callback called when all animations are completed. |

The callback is passed an object containing the chart, current step, initial state, and total number of animations.

Example:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        animation: {
            onProgress: function(animation) {
                progress.value = animation.currentStep / animation.numSteps;
            }
        }
    }
});
```

# Canvas background

In some use cases, you may want a background image or color over the entire canvas. There is no built-in support for this; however, you can achieve it by writing a custom plugin.

The following example plugins demonstrate how to draw a color or image as a background on the canvas. This method is necessary if you want to export the chart with that specific background. For normal use, you can set the background more easily with CSS.

## Color Background Example

```js
// <block:setup:1>
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
// </block:setup>

// <block:plugin:2>
const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
// </block:plugin>

// <block:config:0>
const config = {
  type: 'doughnut',
  data: data,
  options: {
    plugins: {
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      }
    }
  },
  plugins: [plugin],
};
// </block:config>

module.exports = {
  actions: [],
  config: config,
};
```

## Image Background Example

```js
// <block:setup:1>
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
// </block:setup>

// <block:plugin:2>
const image = new Image();
image.src = 'chartjs-logo.svg';

const plugin = {
  id: 'customCanvasBackgroundImage',
  beforeDraw: (chart) => {
    if (image.complete) {
      const ctx = chart.ctx;
      const {top, left, width, height} = chart.chartArea;
      const x = left + width / 2 - image.width / 2;
      const y = top + height / 2 - image.height / 2;
      ctx.drawImage(image, x, y);
    } else {
      image.onload = () => chart.draw();
    }
  }
};
// </block:plugin>

// <block:config:0>
const config = {
  type: 'doughnut',
  data: data,
  plugins: [plugin],
};
// </block:config>

module.exports = {
  actions: [],
  config: config,
};
```

# Data Decimation

The decimation plugin can be used with line charts to automatically decimate data at the start of the chart lifecycle. Before enabling this plugin, review the requirements to ensure compatibility with your chart.

## Configuration Options

Namespace: `options.plugins.decimation`, the global options for the plugin are defined in `Chart.defaults.plugins.decimation`.

| Name        | Type     | Default      | Description                                                                 |
|-------------|----------|--------------|-----------------------------------------------------------------------------|
| `enabled`   | `boolean`| `false`      | Is decimation enabled?                                                     |
| `algorithm` | `string` | `'min-max'`  | Decimation algorithm to use. Options: 'lttb', 'min-max'.                  |
| `samples`   | `number` |              | If the 'lttb' algorithm is used, this is the number of samples in the output dataset. Defaults to the canvas width to pick 1 sample per pixel. |
| `threshold` | `number` |              | If the number of samples in the current axis range exceeds this value, decimation will be triggered. Defaults to 4 times the canvas width. The number of points after decimation can exceed the threshold value. |

## Decimation Algorithms

Options for decimation algorithms:

- `'lttb'`
- `'min-max'`

### Largest Triangle Three Bucket (LTTB) Decimation

LTTB decimation reduces the number of data points significantly, making it useful for showing trends in data with fewer data points.

### Min/Max Decimation

Min/max decimation preserves peaks in your data but may require up to 4 points for each pixel. This method is effective for very noisy signals where data peaks need to be visible.

## Requirements

To use the decimation plugin, the following requirements must be met:

1. The dataset must have an `indexAxis` of `'x'`.
2. The dataset must be a line.
3. The X axis for the dataset must be either a `'linear'` or `'time'` type axis.
4. Data must not need parsing; `parsing` must be `false`.
5. The dataset object must be mutable. The plugin stores the original data as `dataset._data` and defines a new `data` property on the dataset.
6. There must be more points on the chart than the threshold value.

## Related Samples

Data Decimation Sample.

# Device Pixel Ratio

By default, the chart's canvas will use a 1:1 pixel ratio, unless the physical display has a higher pixel ratio (e.g. Retina displays).

For applications where a chart will be converted to a bitmap, or printed to a higher DPI medium, it can be desirable to render the chart at a higher resolution than the default.

Setting `devicePixelRatio` to a value other than 1 will force the canvas size to be scaled by that amount, relative to the container size. There should be no visible difference on screen; the difference will only be visible when the image is zoomed or printed.

## Configuration Options

Namespace: `options`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `devicePixelRatio` | `number` | `window.devicePixelRatio` | Override the window's default devicePixelRatio.


# Elements

While chart types provide settings to configure the styling of each dataset, you sometimes want to style **all datasets the same way**. A common example would be to stroke all the bars in a bar chart with the same colour but change the fill per dataset. Options can be configured for four different types of elements: **[arc](#arc-configuration)**, **[lines](#line-configuration)**, **[points](#point-configuration)**, and **[bars](#bar-configuration)**. When set, these options apply to all objects of that type unless specifically overridden by the configuration attached to a dataset.

## Global Configuration

The element options can be specified per chart or globally. The global options for elements are defined in `Chart.defaults.elements`. For example, to set the border width of all bar charts globally, you would do:

```javascript
Chart.defaults.elements.bar.borderWidth = 2;
```

## Point Configuration

Point elements are used to represent the points in a line, radar or bubble chart.

Namespace: `options.elements.point`, global point options: `Chart.defaults.elements.point`.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `radius` | `number` | `3` | Point radius.
| [`pointStyle`](#point-styles) | [`pointStyle`](#types) | `'circle'` | Point style.
| `rotation` | `number` | `0` | Point rotation (in degrees).
| `backgroundColor` | [`Color`](../general/colors.md) | `Chart.defaults.backgroundColor` | Point fill color.
| `borderWidth` | `number` | `1` | Point stroke width.
| `borderColor` | [`Color`](../general/colors.md) | `'Chart.defaults.borderColor` | Point stroke color.
| `hitRadius` | `number` | `1` | Extra radius added to point radius for hit detection.
| `hoverRadius` | `number` | `4` | Point radius when hovered.
| `hoverBorderWidth` | `number` | `1` | Stroke width when hovered.

### Point Styles

#### Types

The `pointStyle` argument accepts the following type of inputs: `string`, `Image` and `HTMLCanvasElement`

#### Info
When a string is provided, the following values are supported:

- `'circle'`
- `'cross'`
- `'crossRot'`
- `'dash'`
- `'line'`
- `'rect'`
- `'rectRounded'`
- `'rectRot'`
- `'star'`
- `'triangle'`
- `false`

If the value is an image or a canvas element, that image or canvas element is drawn on the canvas using [drawImage](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage).

## Line Configuration

Line elements are used to represent the line in a line chart.

Namespace: `options.elements.line`, global line options: `Chart.defaults.elements.line`.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `tension` | `number` | `0` | Bézier curve tension (`0` for no Bézier curves).
| `backgroundColor` | [`Color`](/general/colors.md) | `Chart.defaults.backgroundColor` | Line fill color.
| `borderWidth` | `number` | `3` | Line stroke width.
| `borderColor` | [`Color`](/general/colors.md) | `Chart.defaults.borderColor` | Line stroke color.
| `borderCapStyle` | `string` | `'butt'` | Line cap style. See [MDN](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderDash` | `number[]` | `[]` | Line dash. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | `number` | `0.0` | Line dash offset. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | `'round'`\|`'bevel'`\|`'miter'` | `'miter'` | Line join style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| `capBezierPoints` | `boolean` | `true` | `true` to keep Bézier control inside the chart, `false` for no restriction.
| `cubicInterpolationMode` | `string` | `'default'` |  Interpolation mode to apply. [See more...](/charts/line.md#cubicinterpolationmode)
| `fill` | `boolean`\|`string` | `false` | How to fill the area under the line. See [area charts](/charts/area.md#filling-modes).
| `stepped` | `boolean` | `false` | `true` to show the line as a stepped line (`tension` will be ignored).

## Bar Configuration

Bar elements are used to represent the bars in a bar chart.

Namespace: `options.elements.bar`, global bar options: `Chart.defaults.elements.bar`.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `backgroundColor` | [`Color`](/general/colors.md) | `Chart.defaults.backgroundColor` | Bar fill color.
| `borderWidth` | `number` | `0` | Bar stroke width.
| `borderColor` | [`Color`](/general/colors.md) | `Chart.defaults.borderColor` | Bar stroke color.
| `borderSkipped` | `string` | `'start'` | Skipped (excluded) border: `'start'`, `'end'`, `'middle'`, `'bottom'`, `'left'`, `'top'`, `'right'` or `false`.
| `borderRadius` | `number`\|`object` | `0` | The bar border radius (in pixels).
| `inflateAmount` | `number`\|`'auto'` | `'auto'` | The amount of pixels to inflate the bar rectangle(s) when drawing.
| [`pointStyle`](#point-styles) | `string`\|`Image`\|`HTMLCanvasElement` | `'circle'` | Style of the point for legend.

## Arc Configuration

Arcs are used in the polar area, doughnut and pie charts.

Namespace: `options.elements.arc`, global arc options: `Chart.defaults.elements.arc`.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `angle` - for polar only | `number` | `circumference / (arc count)` | Arc angle to cover.
| `backgroundColor` | [`Color`](/general/colors.md) | `Chart.defaults.backgroundColor` | Arc fill color.
| `borderAlign` | `'center'`\|`'inner'` | `'center'` | Arc stroke alignment.
| `borderColor` | [`Color`](/general/colors.md) | `'#fff'` | Arc stroke color.
| `borderDash` | `number[]` | `[]` | Arc line dash. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | `number` | `0.0` | Arc line dash offset. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | `'round'`\|`'bevel'`\|`'miter'` | `'bevel'`\|`'round'` | Line join style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin). The default is `'round'` when `borderAlign` is `'inner'`
| `borderWidth`| `number` | `2` | Arc stroke width.
| `circular` | `boolean` | `true` | By default the Arc is curved. If `circular: false` the Arc will be flat


# Configuration

The configuration is used to change how the chart behaves. There are properties to control styling, fonts, the legend, etc.

## Configuration object structure

The top level structure of Chart.js configuration:

```javascript
const config = {
  type: 'line',
  data: {},
  options: {},
  plugins: []
}
```

### type

Chart type determines the main type of the chart.

**note** A dataset can override the `type`, this is how mixed charts are constructed.

### data

See [Data Structures](../general/data-structures.md) for details.

### options

Majority of the documentation talks about these options.

### plugins

Inline plugins can be included in this array. It is an alternative way of adding plugins for single chart (vs registering the plugin globally).
More about plugins in the [developers section](../developers/plugins.md).

## Global Configuration

This concept was introduced in Chart.js 1.0 to keep configuration [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), and allow for changing options globally across chart types, avoiding the need to specify options for each instance, or the default for a particular chart type.

Chart.js merges the `options` object passed to the chart with the global configuration using chart type defaults and scales defaults appropriately. This way you can be as specific as you would like in your individual chart configuration, while still changing the defaults for all chart types where applicable. The global general options are defined in `Chart.defaults`. The defaults for each chart type are discussed in the documentation for that chart type.

The following example would set the interaction mode to 'nearest' for all charts where this was not overridden by the chart type defaults or the options passed to the constructor on creation.

```javascript
Chart.defaults.interaction.mode = 'nearest';

// Interaction mode is set to nearest because it was not overridden here
const chartInteractionModeNearest = new Chart(ctx, {
    type: 'line',
    data: data
});

// This chart would have the interaction mode that was passed in
const chartDifferentInteractionMode = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        interaction: {
            // Overrides the global setting
            mode: 'index'
        }
    }
});
```

## Dataset Configuration

Options may be configured directly on the dataset. The dataset options can be changed at multiple different levels. See [options](../general/options.md#dataset-level-options) for details on how the options are resolved.

The following example would set the `showLine` option to 'false' for all line datasets except for those overridden by options passed to the dataset on creation.

```javascript
// Do not show lines for all datasets by default
Chart.defaults.datasets.line.showLine = false;

// This chart would show a line only for the third dataset
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [0, 0],
        }, {
            data: [0, 1]
        }, {
            data: [1, 0],
            showLine: true // overrides the `line` dataset default
        }, {
            type: 'scatter', // 'line' dataset default does not affect this dataset since it's a 'scatter'
            data: [1, 1]
        }]
    }
});
```


# Interactions

Namespace: `options.interaction`, the global interaction configuration is at `Chart.defaults.interaction`. To configure which events trigger chart interactions, see [events](#events).

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `mode` | `string` | `'nearest'` | Sets which elements appear in the interaction. See [Interaction Modes](#modes) for details.
| `intersect` | `boolean` | `true` | if true, the interaction mode only applies when the mouse position intersects an item on the chart.
| `axis` | `string` | `'x'` | Can be set to `'x'`, `'y'`, `'xy'` or `'r'` to define which directions are used in calculating distances. Defaults to `'x'` for `'index'` mode and `'xy'` in `dataset` and `'nearest'` modes.
| `includeInvisible` | `boolean` | `false` | if true, the invisible points that are outside of the chart area will also be included when evaluating interactions.

By default, these options apply to both the hover and tooltip interactions. The same options can be set in the `options.hover` namespace, in which case they will only affect the hover interaction. Similarly, the options can be set in the `options.plugins.tooltip` namespace to independently configure the tooltip interactions.

## Events

The following properties define how the chart interacts with events.
Namespace: `options`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `events` | `string[]` | `['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']` | The `events` option defines the browser events that the chart should listen to for. Each of these events trigger hover and are passed to plugins. [more...](#event-option)
| `onHover` | `function` | `null` | Called when any of the events fire over chartArea. Passed the event, an array of active elements (bars, points, etc), and the chart.
| `onClick` | `function` | `null` | Called if the event is of type `'mouseup'`, `'click'` or '`'contextmenu'` over chartArea. Passed the event, an array of active elements, and the chart.

### Event Option

For example, to have the chart only respond to click events, you could do:

```javascript
const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    // This chart will not respond to mousemove, etc
    events: ['click']
  }
});
```

Events for each plugin can be further limited by defining (allowed) events array in plugin options:

```javascript
const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    // All of these (default) events trigger a hover and are passed to all plugins,
    // unless limited at plugin options
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    plugins: {
      tooltip: {
        // Tooltip will only receive click events
        events: ['click']
      }
    }
  }
});
```

Events that do not fire over chartArea, like `mouseout`, can be captured using a simple plugin:

```javascript
const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    // these are the default events:
    // events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
  },
  plugins: [{
    id: 'myEventCatcher',
    beforeEvent(chart, args, pluginOptions) {
      const event = args.event;
      if (event.type === 'mouseout') {
        // process the event
      }
    }
  }]
});
```

For more information about plugins, see [Plugins](../developers/plugins.md)

### Converting Events to Data Values

A common occurrence is taking an event, such as a click, and finding the data coordinates on the chart where the event occurred. Chart.js provides helpers that make this a straightforward process.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        onClick: (e) => {
            const canvasPosition = Chart.helpers.getRelativePosition(e, chart);

            // Substitute the appropriate scale IDs
            const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
            const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        }
    }
});
```

When using a bundler, the helper functions have to be imported separately, for a full explanation of this please head over to the [integration](../getting-started/integration.md#helper-functions) page

## Modes

When configuring the interaction with the graph via `interaction`, `hover` or `tooltips`, a number of different modes are available.

`options.hover` and `options.plugins.tooltip` extend from `options.interaction`. So if `mode`, `intersect` or any other common settings are configured only in `options.interaction`, both hover and tooltips obey that.

The modes are detailed below and how they behave in conjunction with the `intersect` setting.

See how different modes work with the tooltip in [tooltip interactions sample](../samples/tooltip/interactions.md )

### point

Finds all of the items that intersect the point.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        interaction: {
            mode: 'point'
        }
    }
});
```

### nearest

Gets the items that are at the nearest distance to the point. The nearest item is determined based on the distance to the center of the chart item (point, bar). You can use the `axis` setting to define which coordinates are considered in distance calculation. If `intersect` is true, this is only triggered when the mouse position intersects an item in the graph. This is very useful for combo charts where points are hidden behind bars.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        interaction: {
            mode: 'nearest'
        }
    }
});
```

### index

Finds item at the same index. If the `intersect` setting is true, the first intersecting item is used to determine the index in the data. If `intersect` false the nearest item, in the x direction, is used to determine the index.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        interaction: {
            mode: 'index'
        }
    }
});
```

To use index mode in a chart like the horizontal bar chart, where we search along the y direction, you can use the `axis` setting introduced in v2.7.0. By setting this value to `'y'` on the y direction is used.

```javascript
const chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        interaction: {
            mode: 'index',
            axis: 'y'
        }
    }
});
```

### dataset

Finds items in the same dataset. If the `intersect` setting is true, the first intersecting item is used to determine the index in the data. If `intersect` false the nearest item is used to determine the index.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        interaction: {
            mode: 'dataset'
        }
    }
});
```

### x

Returns all items that would intersect based on the `X` coordinate of the position only. Would be useful for a vertical cursor implementation. Note that this only applies to cartesian charts.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        interaction: {
            mode: 'x'
        }
    }
});
```

### y

Returns all items that would intersect based on the `Y` coordinate of the position. This would be useful for a horizontal cursor implementation. Note that this only applies to cartesian charts.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        interaction: {
            mode: 'y'
        }
    }
});
```

## Custom Interaction Modes

New modes can be defined by adding functions to the `Chart.Interaction.modes` map.  You can use the `Chart.Interaction.evaluateInteractionItems` function to help implement these.

Example:

```javascript
import { Interaction } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';

/**
 * Custom interaction mode
 * @function Interaction.modes.myCustomMode
 * @param {Chart} chart - the chart we are returning items from
 * @param {Event} e - the event we are find things at
 * @param {InteractionOptions} options - options to use
 * @param {boolean} [useFinalPosition] - use final element position (animation target)
 * @return {InteractionItem[]} - items that are found
 */
Interaction.modes.myCustomMode = function(chart, e, options, useFinalPosition) {
  const position = getRelativePosition(e, chart);

  const items = [];
  Interaction.evaluateInteractionItems(chart, 'x', position, (element, datasetIndex, index) => {
    if (element.inXRange(position.x, useFinalPosition) && myCustomLogic(element)) {
      items.push({element, datasetIndex, index});
    }
  });
  return items;
};

// Then, to use it...
new Chart.js(ctx, {
    type: 'line',
    data: data,
    options: {
        interaction: {
            mode: 'myCustomMode'
        }
    }
})
```

If you're using TypeScript, you'll also need to register the new mode:

```typescript
declare module 'chart.js' {
  interface InteractionModeMap {
    myCustomMode: InteractionModeFunction;
  }
}
```


# Layout

Namespace: `options.layout`, the global options for the chart layout is defined in `Chart.defaults.layout`.

| Name | Type | Default | [Scriptable](../general/options.md#scriptable-options) | Description
| ---- | ---- | ------- | :----: | -----------
| `autoPadding` | `boolean` | `true` | No | Apply automatic padding so visible elements are completely drawn.
| `padding` | [`Padding`](../general/padding.md) | `0` | Yes | The padding to add inside the chart.


# Legend

The chart legend displays data about the datasets that are appearing on the chart.

## Configuration options

Namespace: `options.plugins.legend`, the global options for the chart legend is defined in `Chart.defaults.plugins.legend`.

:::warning
The doughnut, pie, and polar area charts override the legend defaults. To change the overrides for those chart types, the options are defined in `Chart.overrides[type].plugins.legend`.
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `display` | `boolean` | `true` | Is the legend shown?
| `position` | `string` | `'top'` | Position of the legend. [more...](#position)
| `align` | `string` | `'center'` | Alignment of the legend. [more...](#align)
| `maxHeight` | `number` | | Maximum height of the legend, in pixels
| `maxWidth` | `number` | | Maximum width of the legend, in pixels
| `fullSize` | `boolean` | `true` | Marks that this box should take the full width/height of the canvas (moving other boxes). This is unlikely to need to be changed in day-to-day use.
| `onClick` | `function` | | A callback that is called when a click event is registered on a label item. Arguments: `[event, legendItem, legend]`.
| `onHover` | `function` | | A callback that is called when a 'mousemove' event is registered on top of a label item. Arguments: `[event, legendItem, legend]`.
| `onLeave` | `function` | | A callback that is called when a 'mousemove' event is registered outside of a previously hovered label item. Arguments: `[event, legendItem, legend]`.
| `reverse` | `boolean` | `false` | Legend will show datasets in reverse order.
| `labels` | `object` | | See the [Legend Label Configuration](#legend-label-configuration) section below.
| `rtl` | `boolean` | | `true` for rendering the legends from right to left.
| `textDirection` | `string` | canvas' default | This will force the text direction `'rtl'` or `'ltr'` on the canvas for rendering the legend, regardless of the css specified on the canvas
| `title` | `object` | | See the [Legend Title Configuration](#legend-title-configuration) section below.

:::tip Note
If you need more visual customizations, please use an [HTML legend](../samples/legend/html.md).
:::

## Position

Position of the legend. Options are:

* `'top'`
* `'left'`
* `'bottom'`
* `'right'`
* `'chartArea'`

When using the `'chartArea'` option the legend position is at the moment not configurable, it will always be on the left side of the chart in the middle.

## Align

Alignment of the legend. Options are:

* `'start'`
* `'center'`
* `'end'`

Defaults to `'center'` for unrecognized values.

## Legend Label Configuration

Namespace: `options.plugins.legend.labels`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `boxWidth` | `number` | `40` | Width of coloured box.
| `boxHeight` | `number` | `font.size` | Height of the coloured box.
| `color` | [`Color`](../general/colors.md) | `Chart.defaults.color` | Color of label and the strikethrough.
| `font` | `Font` | `Chart.defaults.font` | See [Fonts](../general/fonts.md)
| `padding` | `number` | `10` | Padding between rows of colored boxes.
| `generateLabels` | `function` | | Generates legend items for each thing in the legend. Default implementation returns the text + styling for the color box. See [Legend Item](#legend-item-interface) for details.
| `filter` | `function` | `null` | Filters legend items out of the legend. Receives 2 parameters, a [Legend Item](#legend-item-interface) and the chart data.
| `sort` | `function` | `null` | Sorts legend items. Type is : `sort(a: LegendItem, b: LegendItem, data: ChartData): number;`. Receives 3 parameters, two [Legend Items](#legend-item-interface) and the chart data. The return value of the function is a number that indicates the order of the two legend item parameters. The ordering matches the [return value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description) of `Array.prototype.sort()`
| [`pointStyle`](elements.md#point-styles) | [`pointStyle`](elements.md#types) | `'circle'` | If specified, this style of point is used for the legend. Only used if `usePointStyle` is true.
| `textAlign` | `string` | `'center'` | Horizontal alignment of the label text. Options are: `'left'`, `'right'` or `'center'`.
| `usePointStyle` | `boolean` | `false` | Label style will match corresponding point style (size is based on pointStyleWidth or the minimum value between boxWidth and font.size).
| `pointStyleWidth` | `number` | `null` | If `usePointStyle` is true, the width of the point style used for the legend.
| `useBorderRadius` | `boolean` | `false` | Label borderRadius will match corresponding borderRadius.
| `borderRadius` | `number` | `undefined` | Override the borderRadius to use.

## Legend Title Configuration

Namespace: `options.plugins.legend.title`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `color` | [`Color`](../general/colors.md) | `Chart.defaults.color` | Color of text.
| `display` | `boolean` | `false` | Is the legend title displayed.
| `font` | `Font` | `Chart.defaults.font` | See [Fonts](../general/fonts.md)
| `padding` | [`Padding`](../general/padding.md) | `0` | Padding around the title.
| `text` | `string` | | The string title.

## Legend Item Interface

Items passed to the legend `onClick` function are the ones returned from `labels.generateLabels`. These items must implement the following interface.

```javascript
{
    // Label that will be displayed
    text: string,

    // Border radius of the legend item.
    // Introduced in 3.1.0
    borderRadius?: number | BorderRadius,

    // Index of the associated dataset
    datasetIndex: number,

    // Fill style of the legend box
    fillStyle: Color,

    // Text color
    fontColor: Color,

    // If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect
    hidden: boolean,

    // For box border. See https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap
    lineCap: string,

    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    lineDash: number[],

    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
    lineDashOffset: number,

    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
    lineJoin: string,

    // Width of box border
    lineWidth: number,

    // Stroke style of the legend box
    strokeStyle: Color,

    // Point style of the legend box (only used if usePointStyle is true)
    pointStyle: string | Image | HTMLCanvasElement,

    // Rotation of the point in degrees (only used if usePointStyle is true)
    rotation: number
}
```

## Example

The following example will create a chart with the legend enabled and turn all the text red in color.

```javascript
const chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        }
    }
});
```

## Custom On Click Actions

It can be common to want to trigger different behaviour when clicking an item in the legend. This can be easily achieved using a callback in the config object.

The default legend click handler is:

```javascript
function(e, legendItem, legend) {
    const index = legendItem.datasetIndex;
    const ci = legend.chart;
    if (ci.isDatasetVisible(index)) {
        ci.hide(index);
        legendItem.hidden = true;
    } else {
        ci.show(index);
        legendItem.hidden = false;
    }
}
```

Let's say we wanted instead to link the display of the first two datasets. We could change the click handler accordingly.

```javascript
const defaultLegendClickHandler = Chart.defaults.plugins.legend.onClick;
const pieDoughnutLegendClickHandler = Chart.controllers.doughnut.overrides.plugins.legend.onClick;
const newLegendClickHandler = function (e, legendItem, legend) {
    const index = legendItem.datasetIndex;
    const type = legend.chart.config.type;

    if (index > 1) {
        // Do the original logic
        if (type === 'pie' || type === 'doughnut') {
            pieDoughnutLegendClickHandler(e, legendItem, legend)
        } else {
            defaultLegendClickHandler(e, legendItem, legend);
        }

    } else {
        let ci = legend.chart;
        [
            ci.getDatasetMeta(0),
            ci.getDatasetMeta(1)
        ].forEach(function(meta) {
            meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
        });
        ci.update();
    }
};

const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            legend: {
                onClick: newLegendClickHandler
            }
        }
    }
});
```

Now when you click the legend in this chart, the visibility of the first two datasets will be linked together.


# Locale

For applications where the numbers of ticks on scales must be formatted accordingly with a language sensitive number formatting, you can enable this kind of formatting by setting the `locale` option.

The locale is a string that is a [Unicode BCP 47 locale identifier](https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance).

A Unicode BCP 47 locale identifier consists of

  1. a language code,
  2. (optionally) a script code,
  3. (optionally) a region (or country) code,
  4. (optionally) one or more variant codes, and
  5. (optionally) one or more extension sequences,

with all present components separated by hyphens.

By default, the chart is using the default locale of the platform which is running on.

## Configuration Options

Namespace: `options`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `locale` | `string` | `undefined` | a string with a BCP 47 language tag, leveraging on [INTL NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).


# Responsive Charts

When changing the chart size based on the window size, a major limitation is that the canvas render size (`canvas.width` and `.height`) cannot be expressed with relative values, unlike the display size (`canvas.style.width` and `.height`). These sizes are independent, meaning the canvas render size does not adjust automatically based on the display size, leading to inaccurate rendering.

The following examples do not work:

- `<canvas height="40vh" width="80vw">`: invalid values; the canvas doesn't resize.
- `<canvas style="height:40vh; width:80vw">`: invalid behavior; the canvas is resized but becomes blurry.
- `<canvas style="margin: 0 auto;">`: invalid behavior; the canvas continually shrinks. Chart.js requires a dedicated container for each canvas, and this styling should be applied there.

Chart.js provides options to enable responsiveness and control the resize behavior of charts by detecting when the canvas display size changes and updating the render size accordingly.

## Configuration Options

Namespace: `options`

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `responsive` | `boolean` | `true` | Resizes the chart canvas when its container does. |
| `maintainAspectRatio` | `boolean` | `true` | Maintains the original canvas aspect ratio `(width / height)` when resizing. |
| `aspectRatio` | `number` | `1` or `2` | Canvas aspect ratio (i.e., `width / height`). A value of 1 represents a square canvas. This option is ignored if the height is explicitly defined. Default value varies by chart type; radial charts default to `1`, others default to `2`. |
| `onResize` | `function` | `null` | Called when a resize occurs. Receives two arguments: the chart instance and the new size. |
| `resizeDelay` | `number` | `0` | Delay the resize update by the specified milliseconds. This can ease the resize process by debouncing the update of the elements. |

## Important Note

Detecting when the canvas size changes cannot be done directly from the canvas element. Chart.js uses its parent container to update the canvas render and display sizes. This method requires the container to be relatively positioned and dedicated to the chart canvas only. Responsiveness can be achieved by setting relative values for the container size:

```html
<div class="chart-container" style="position: relative; height:40vh; width:80vw">
    <canvas id="chart"></canvas>
</div>
```

The chart can also be programmatically resized by modifying the container size:

```javascript
chart.canvas.parentNode.style.height = '128px';
chart.canvas.parentNode.style.width = '128px';
```

For the above code to correctly resize the chart height, the `maintainAspectRatio` option must be set to `false`.

## Printing Resizable Charts

CSS media queries allow changing styles when printing a page. The CSS applied from these media queries may cause charts to need to resize. However, the resize won't happen automatically. To support resizing charts when printing, hook the `onbeforeprint` event and manually trigger resizing of each chart:

```javascript
function beforePrintHandler () {
    for (let id in Chart.instances) {
        Chart.instances[id].resize();
    }
}
```

Due to complexities in when the browser lays out the document for printing and when resize events are fired, Chart.js may not properly resize for the print layout. To work around this, pass an explicit size to `.resize()` and use an `onafterprint` event to restore the automatic size when done:

```javascript
window.addEventListener('beforeprint', () => {
  myChart.resize(600, 600);
});
window.addEventListener('afterprint', () => {
  myChart.resize();
});
```

# Subtitle

Subtitle is a second title placed under the main title, by default. It has exactly the same configuration options with the main [title](./title.md).

## Subtitle Configuration

Namespace: `options.plugins.subtitle`. The global defaults for subtitle are configured in `Chart.defaults.plugins.subtitle`.

Exactly the same configuration options with [title](./title.md) are available for subtitle, the namespaces only differ.

## Example Usage

The example below would enable a title of 'Custom Chart Subtitle' on the chart that is created.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            subtitle: {
                display: true,
                text: 'Custom Chart Subtitle'
            }
        }
    }
});
```


# Title

The chart title defines text to draw at the top of the chart.

## Title Configuration

Namespace: `options.plugins.title`, the global options for the chart title is defined in `Chart.defaults.plugins.title`.

| Name | Type | Default | [Scriptable](../general/options.md#scriptable-options) | Description
| ---- | ---- | ------- | :----: | -----------
| `align` | `string` | `'center'` | Yes | Alignment of the title. [more...](#align)
| `color` | [`Color`](../general/colors.md) | `Chart.defaults.color` | Yes | Color of text.
| `display` | `boolean` | `false` | Yes | Is the title shown?
| `fullSize` | `boolean` | `true` | Yes | Marks that this box should take the full width/height of the canvas. If `false`, the box is sized and placed above/beside the chart area.
| `position` | `string` | `'top'` | Yes | Position of title. [more...](#position)
| `font` | `Font` | `{weight: 'bold'}` | Yes | See [Fonts](../general/fonts.md)
| `padding` | [`Padding`](../general/padding.md) | `10` | Yes | Padding to apply around the title. Only `top` and `bottom` are implemented.
| `text` | `string`\|`string[]` | `''` | Yes | Title text to display. If specified as an array, text is rendered on multiple lines.

:::tip Note
If you need more visual customizations, you can implement the title with HTML and CSS.
:::

### Position

Possible title position values are:

* `'top'`
* `'left'`
* `'bottom'`
* `'right'`

## Align

Alignment of the title. Options are:

* `'start'`
* `'center'`
* `'end'`

## Example Usage

The example below would enable a title of 'Custom Chart Title' on the chart that is created.

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title'
            }
        }
    }
});
```

This example shows how to specify separate top and bottom title text padding:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    }
});
```


# Tooltip

## Tooltip Configuration

Namespace: `options.plugins.tooltip`, the global options for the chart tooltips is defined in `Chart.defaults.plugins.tooltip`.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `enabled` | `boolean` | `true` | Are on-canvas tooltips enabled? |
| `external` | `function` | `null` | See external tooltip section. |
| `mode` | `string` | `interaction.mode` | Sets which elements appear in the tooltip. |
| `intersect` | `boolean` | `interaction.intersect` | If true, the tooltip mode applies only when the mouse position intersects with an element. |
| `position` | `string` | `'average'` | The mode for positioning the tooltip. |
| `callbacks` | `object` | | See the callbacks section. |
| `itemSort` | `function` | | Sort tooltip items. |
| `filter` | `function` | | Filter tooltip items. |
| `backgroundColor` | `Color` | `'rgba(0, 0, 0, 0.8)'` | Background color of the tooltip. |
| `titleColor` | `Color` | `'#fff'` | Color of title text. |
| `titleFont` | `Font` | `{weight: 'bold'}` | See Fonts. |
| `titleAlign` | `string` | `'left'` | Horizontal alignment of the title text lines. |
| `titleSpacing` | `number` | `2` | Spacing to add to top and bottom of each title line. |
| `titleMarginBottom` | `number` | `6` | Margin to add on bottom of title section. |
| `bodyColor` | `Color` | `'#fff'` | Color of body text. |
| `bodyFont` | `Font` | `{}` | See Fonts. |
| `bodyAlign` | `string` | `'left'` | Horizontal alignment of the body text lines. |
| `bodySpacing` | `number` | `2` | Spacing to add to top and bottom of each tooltip item. |
| `footerColor` | `Color` | `'#fff'` | Color of footer text. |
| `footerFont` | `Font` | `{weight: 'bold'}` | See Fonts. |
| `footerAlign` | `string` | `'left'` | Horizontal alignment of the footer text lines. |
| `footerSpacing` | `number` | `2` | Spacing to add to top and bottom of each footer line. |
| `footerMarginTop` | `number` | `6` | Margin to add before drawing the footer. |
| `padding` | `Padding` | `6` | Padding inside the tooltip. |
| `caretPadding` | `number` | `2` | Extra distance to move the end of the tooltip arrow away from the tooltip point. |
| `caretSize` | `number` | `5` | Size, in px, of the tooltip arrow. |
| `cornerRadius` | `number` | `6` | Radius of tooltip corner curves. |
| `multiKeyBackground` | `Color` | `'#fff'` | Color to draw behind the colored boxes when multiple items are in the tooltip. |
| `displayColors` | `boolean` | `true` | If true, color boxes are shown in the tooltip. |
| `boxWidth` | `number` | `bodyFont.size` | Width of the color box if displayColors is true. |
| `boxHeight` | `number` | `bodyFont.size` | Height of the color box if displayColors is true. |
| `boxPadding` | `number` | `1` | Padding between the color box and the text. |
| `usePointStyle` | `boolean` | `false` | Use the corresponding point style instead of color boxes. |
| `borderColor` | `Color` | `'rgba(0, 0, 0, 0)'` | Color of the border. |
| `borderWidth` | `number` | `0` | Size of the border. |
| `rtl` | `boolean` | | `true` for rendering the tooltip from right to left. |
| `textDirection` | `string` | canvas' default | This will force the text direction on the canvas for rendering the tooltips. |
| `xAlign` | `string` | `undefined` | Position of the tooltip caret in the X direction. |
| `yAlign` | `string` | `undefined` | Position of the tooltip caret in the Y direction. |

Note: If you need more visual customizations, please use an HTML tooltip.

### Position Modes

Possible modes are:

* `'average'`
* `'nearest'`

`'average'` mode will place the tooltip at the average position of the items displayed in the tooltip. `'nearest'` will place the tooltip at the position of the element closest to the event position.

### Tooltip Alignment

The `xAlign` and `yAlign` options define the position of the tooltip caret. If these parameters are unset, the optimal caret position is determined.

Supported values for `xAlign`:

* `'left'`
* `'center'`
* `'right'`

Supported values for `yAlign`:

* `'top'`
* `'center'`
* `'bottom'`

### Text Alignment

The `titleAlign`, `bodyAlign`, and `footerAlign` options define the horizontal position of the text lines with respect to the tooltip box. Supported values:

* `'left'` (default)
* `'right'`
* `'center'`

These options are only applied to text lines. Color boxes are always aligned to the left edge.

### Sort Callback

Allows sorting of tooltip items. Must implement a function that can be passed to Array.prototype.sort. This function can also accept a third parameter that is the data object passed to the chart.

### Filter Callback

Allows filtering of tooltip items. Must implement a function that can be passed to Array.prototype.filter. This function can also accept a fourth parameter that is the data object passed to the chart.

## Tooltip Callbacks

Namespace: `options.plugins.tooltip.callbacks`, the tooltip has the following callbacks for providing text. For all functions, `this` will be the tooltip object created from the `Tooltip` constructor. If the callback returns `undefined`, then the default callback will be used. To remove things from the tooltip, the callback should return an empty string.

Namespace: `data.datasets[].tooltip.callbacks`, items marked with `Yes` in the column `Dataset override` can be overridden per dataset.

A tooltip item context is generated for each item that appears in the tooltip. This is the primary model that the callback methods interact with. For functions that return text, arrays of strings are treated as multiple lines of text.

| Name | Arguments | Return Type | Dataset override | Description |
| ---- | --------- | ----------- | ---------------- | ----------- |
| `beforeTitle` | `TooltipItem[]` | `string | string[] | undefined` | Returns the text to render before the title. |
| `title` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render as the title of the tooltip. |
| `afterTitle` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render after the title. |
| `beforeBody` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render before the body section. |
| `beforeLabel` | `TooltipItem` | `string | string[] | undefined` | Yes | Returns text to render before an individual label. |
| `label` | `TooltipItem` | `string | string[] | undefined` | Yes | Returns text to render for an individual item in the tooltip. |
| `labelColor` | `TooltipItem` | `object | undefined` | Yes | Returns the colors to render for the tooltip item. |
| `labelTextColor` | `TooltipItem` | `Color | undefined` | Yes | Returns the colors for the text of the label for the tooltip item. |
| `labelPointStyle` | `TooltipItem` | `object | undefined` | Yes | Returns the point style to use instead of color boxes if usePointStyle is true. |
| `afterLabel` | `TooltipItem` | `string | string[] | undefined` | Yes | Returns text to render after an individual label. |
| `afterBody` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render after the body section. |
| `beforeFooter` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render before the footer section. |
| `footer` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render as the footer of the tooltip. |
| `afterFooter` | `TooltipItem[]` | `string | string[] | undefined` | Text to render after the footer section. |

### Label Callback

The `label` callback can change the text that displays for a given data point. A common example is to show a unit. 

Example:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        }
    }
});
```

### Label Color Callback

Example to return a red box with a blue dashed border:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    labelColor: function(context) {
                        return {
                            borderColor: 'rgb(0, 0, 255)',
                            backgroundColor: 'rgb(255, 0, 0)',
                            borderWidth: 2,
                            borderDash: [2, 2],
                            borderRadius: 2,
                        };
                    },
                    labelTextColor: function(context) {
                        return '#543453';
                    }
                }
            }
        }
    }
});
```

### Label Point Style Callback

Example to draw triangles instead of the regular color box:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    labelPointStyle: function(context) {
                        return {
                            pointStyle: 'triangle',
                            rotation: 0
                        };
                    }
                }
            }
        }
    }
});
```

### Tooltip Item Context

The tooltip items passed to the tooltip callbacks implement the following interface.

```javascript
{
    chart: Chart,
    label: string,
    parsed: object,
    raw: object,
    formattedValue: string,
    dataset: object,
    datasetIndex: number,
    dataIndex: number,
    element: Element,
}
```

## External (Custom) Tooltips

External tooltips allow you to hook into the tooltip rendering process to render the tooltip in your own custom way. The `external` option takes a function which is passed a context parameter containing the `chart` and `tooltip`. 

Example:

```javascript
const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        plugins: {
            tooltip: {
                enabled: false,
                external: function(context) {
                    let tooltipEl = document.getElementById('chartjs-tooltip');

                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = '<table></table>';
                        document.body.appendChild(tooltipEl);
                    }

                    const tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }

                    if (tooltipModel.body) {
                        const titleLines = tooltipModel.title || [];
                        const bodyLines = tooltipModel.body.map(getBody);

                        let innerHtml = '<thead>';
                        titleLines.forEach(function(title) {
                            innerHtml += '<tr><th>' + title + '</th></tr>';
                        });
                        innerHtml += '</thead><tbody>';

                        bodyLines.forEach(function(body, i) {
                            const colors = tooltipModel.labelColors[i];
                            let style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            const span = '<span style="' + style + '">' + body + '</span>';
                            innerHtml += '<tr><td>' + span + '</td></tr>';
                        });
                        innerHtml += '</tbody>';

                        let tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }

                    const position = context.chart.canvas.getBoundingClientRect();
                    const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.font = bodyFont.string;
                    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                }
            }
        }
    }
});
```

## Tooltip Model

The tooltip model contains parameters that can be used to render the tooltip.

```javascript
{
    chart: Chart,
    dataPoints: TooltipItem[],
    xAlign: string,
    yAlign: string,
    x: number,
    y: number,
    width: number,
    height: number,
    caretX: number,
    caretY: number,
    body: object[],
    beforeBody: string[],
    afterBody: string[],
    title: string[],
    footer: string[],
    labelColors: TooltipLabelStyle[],
    labelTextColors: Color[],
    labelPointStyles: { pointStyle: PointStyle; rotation: number }[],
    opacity: number,
    options: Object
}
```

## Custom Position Modes

New modes can be defined by adding functions to the `Chart.Tooltip.positioners` map.

Example:

```javascript
import { Tooltip } from 'chart.js';

Tooltip.positioners.myCustomPositioner = function(elements, eventPosition) {
    const tooltip = this;

    return {
        x: 0,
        y: 0
    };
};

// Then, to use it...
new Chart.js(ctx, {
    data,
    options: {
        plugins: {
            tooltip: {
                position: 'myCustomPositioner'
            }
        }
    }
});
```

If you're using TypeScript, you'll also need to register the new mode:

```typescript
declare module 'chart.js' {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}
```

# API

For each chart, there are a set of global prototype methods on the shared chart type which you may find useful. These are available on all charts created with Chart.js, but for the examples, let's use a line chart we've made.

```javascript
// For example:
const myLineChart = new Chart(ctx, config);
```

## .destroy()

Use this to destroy any chart instances that are created. This will clean up any references stored to the chart object within Chart.js, along with any associated event listeners attached by Chart.js.
This must be called before the canvas is reused for a new chart.

```javascript
// Destroys a specific chart instance
myLineChart.destroy();
```

## .update(mode?)

Triggers an update of the chart. This can be safely called after updating the data object. This will update all scales, legends, and then re-render the chart.

```javascript
myLineChart.data.datasets[0].data[2] = 50; // Would update the first dataset's value of 'March' to be 50
myLineChart.update(); // Calling update now animates the position of March from 90 to 50.
```

A `mode` string can be provided to indicate transition configuration should be used. Core calls this method using any of `'active'`, `'hide'`, `'reset'`, `'resize'`, `'show'` or `undefined`. `'none'` is also a supported mode for skipping animations for single update. Please see [animations](../configuration/animations.md) docs for more details.

Example:

```javascript
myChart.update('active');
```

See [Updating Charts](updates.md) for more details.

## .reset()

Reset the chart to its state before the initial animation. A new animation can then be triggered using `update`.

```javascript
myLineChart.reset();
```

## .render()

Triggers a redraw of all chart elements. Note, this does not update elements for new data. Use `.update()` in that case.

## .stop()

Use this to stop any current animation. This will pause the chart during any current animation frame. Call `.render()` to re-animate.

```javascript
// Stops the charts animation loop at its current frame
myLineChart.stop();
// => returns 'this' for chainability
```

## .resize(width?, height?)

Use this to manually resize the canvas element. This is run each time the canvas container is resized, but you can call this method manually if you change the size of the canvas nodes container element.

You can call `.resize()` with no parameters to have the chart take the size of its container element, or you can pass explicit dimensions (e.g., for [printing](../configuration/responsive.md#printing-resizable-charts)).

```javascript
// Resizes & redraws to fill its container element
myLineChart.resize();
// => returns 'this' for chainability

// With an explicit size:
myLineChart.resize(width, height);
```

## .clear()

Will clear the chart canvas. Used extensively internally between animation frames, but you might find it useful.

```javascript
// Will clear the canvas that myLineChart is drawn on
myLineChart.clear();
// => returns 'this' for chainability
```

## .toBase64Image(type?, quality?)

This returns a base 64 encoded string of the chart in its current state.

```javascript
myLineChart.toBase64Image();
// => returns png data url of the image on the canvas

myLineChart.toBase64Image('image/jpeg', 1)
// => returns a jpeg data url in the highest quality of the canvas
```

## .getElementsAtEventForMode(e, mode, options, useFinalPosition)

Calling `getElementsAtEventForMode(e, mode, options, useFinalPosition)` on your Chart instance passing an event and a mode will return the elements that are found. The `options` and `useFinalPosition` arguments are passed through to the handlers.

To get an item that was clicked on, `getElementsAtEventForMode` can be used.

```javascript
function clickHandler(evt) {
    const points = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = myChart.data.labels[firstPoint.index];
        const value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
    }
}
```

## .getSortedVisibleDatasetMetas()

Returns an array of all the dataset meta's in the order that they are drawn on the canvas that are not hidden.

```javascript
const visibleMetas = chart.getSortedVisibleDatasetMetas();
```

## .getDatasetMeta(index)

Looks for the dataset that matches the current index and returns that metadata. This returned data has all of the metadata that is used to construct the chart.

The `data` property of the metadata will contain information about each point, bar, etc. depending on the chart type.

Extensive examples of usage are available in the [Chart.js tests](https://github.com/chartjs/Chart.js/tree/master/test).

```javascript
const meta = myChart.getDatasetMeta(0);
const x = meta.data[0].x;
```

## getVisibleDatasetCount

Returns the number of datasets that are currently not hidden.

```javascript
const numberOfVisibleDatasets = chart.getVisibleDatasetCount();
```

## setDatasetVisibility(datasetIndex, visibility)

Sets the visibility for a given dataset. This can be used to build a chart legend in HTML. During click on one of the HTML items, you can call `setDatasetVisibility` to change the appropriate dataset.

```javascript
chart.setDatasetVisibility(1, false); // hides dataset at index 1
chart.update(); // chart now renders with dataset hidden
```

## toggleDataVisibility(index)

Toggles the visibility of an item in all datasets. A dataset needs to explicitly support this feature for it to have an effect. From internal chart types, doughnut / pie, polar area, and bar use this.

```javascript
chart.toggleDataVisibility(2); // toggles the item in all datasets, at index 2
chart.update(); // chart now renders with item hidden
```

## getDataVisibility(index)

Returns the stored visibility state of a data index for all datasets. Set by [toggleDataVisibility](#toggleDataVisibility). A dataset controller should use this method to determine if an item should not be visible.

```javascript
const visible = chart.getDataVisibility(2);
```

## hide(datasetIndex, dataIndex?)

If dataIndex is not specified, sets the visibility for the given dataset to false. Updates the chart and animates the dataset with `'hide'` mode. This animation can be configured under the `hide` key in animation options. Please see [animations](../configuration/animations.md) docs for more details.

If dataIndex is specified, sets the hidden flag of that element to true and updates the chart.

```javascript
chart.hide(1); // hides dataset at index 1 and does 'hide' animation.
chart.hide(0, 2); // hides the data element at index 2 of the first dataset.
```

## show(datasetIndex, dataIndex?)

If dataIndex is not specified, sets the visibility for the given dataset to true. Updates the chart and animates the dataset with `'show'` mode. This animation can be configured under the `show` key in animation options. Please see [animations](../configuration/animations.md) docs for more details.

If dataIndex is specified, sets the hidden flag of that element to false and updates the chart.

```javascript
chart.show(1); // shows dataset at index 1 and does 'show' animation.
chart.show(0, 2); // shows the data element at index 2 of the first dataset.
```

## setActiveElements(activeElements)

Sets the active (hovered) elements for the chart. See the "Programmatic Events" sample file to see this in action.

```javascript
chart.setActiveElements([
    {datasetIndex: 0, index: 1},
]);
```

## isPluginEnabled(pluginId)

Returns a boolean if a plugin with the given ID has been registered to the chart instance.

```javascript
chart.isPluginEnabled('filler');
```

## Static: getChart(key)

Finds the chart instance from the given key. If the key is a `string`, it is interpreted as the ID of the Canvas node for the Chart. The key can also be a `CanvasRenderingContext2D` or an `HTMLDOMElement`. This will return `undefined` if no Chart is found. To be found, the chart must have previously been created.

```javascript
const chart = Chart.getChart("canvas-id");
```

## Static: register(chartComponentLike)

Used to register plugins, axis types or chart types globally to all your charts.

```javascript
import { Chart, Tooltip, LinearScale, PointElement, BubbleController } from 'chart.js';

Chart.register(Tooltip, LinearScale, PointElement, BubbleController);
```

## Static: unregister(chartComponentLike)

Used to unregister plugins, axis types or chart types globally from all your charts.


# New Axes

Axes in Chart.js can be individually extended. Axes should always derive from `Chart.Scale` but this is not a mandatory requirement.

```javascript
class MyScale extends Chart.Scale {
    /* extensions ... */
}
MyScale.id = 'myScale';
MyScale.defaults = defaultConfigObject;

// MyScale is now derived from Chart.Scale
```

Once you have created your scale class, you need to register it with the global chart object so that it can be used.

```javascript
Chart.register(MyScale);

// If the new scale is not extending Chart.Scale, the prototype can not be used to detect what
// you are trying to register - so you need to be explicit:

// Chart.registry.addScales(MyScale);
```

To use the new scale, simply pass in the string key to the config when creating a chart.

```javascript
const lineChart = new Chart(ctx, {
    data: data,
    type: 'line',
    options: {
        scales: {
            y: {
                type: 'myScale' // this is the same id that was set on the scale
            }
        }
    }
});
```

## Scale Properties

Scale instances are given the following properties during the fitting process.

```javascript
{
    left: number, // left edge of the scale bounding box
    right: number, // right edge of the bounding box
    top: number,
    bottom: number,
    width: number, // the same as right - left
    height: number, // the same as bottom - top

    // Margin on each side. Like css, this is outside the bounding box.
    margins: {
        left: number,
        right: number,
        top: number,
        bottom: number
    },

    // Amount of padding on the inside of the bounding box (like CSS)
    paddingLeft: number,
    paddingRight: number,
    paddingTop: number,
    paddingBottom: number
}
```

## Scale Interface

To work with Chart.js, custom scale types must implement the following interface.

```javascript
{
    // Determines the data limits. Should set this.min and this.max to be the data max/min
    determineDataLimits: function() {},

    // Generate tick marks. this.chart is the chart instance. The data object can be accessed as this.chart.data
    // buildTicks() should create a ticks array on the axis instance, if you intend to use any of the implementations from the base class
    buildTicks: function() {},

    // Get the label to show for the given value
    getLabelForValue: function(value) {},

    // Get the pixel (x coordinate for horizontal axis, y coordinate for vertical axis) for a given value
    // @param index: index into the ticks array
    getPixelForTick: function(index) {},

    // Get the pixel (x coordinate for horizontal axis, y coordinate for vertical axis) for a given value
    // @param value : the value to get the pixel for
    // @param [index] : index into the data array of the value
    getPixelForValue: function(value, index) {},

    // Get the value for a given pixel (x coordinate for horizontal axis, y coordinate for vertical axis)
    // @param pixel : pixel value
    getValueForPixel: function(pixel) {}
}
```

Optionally, the following methods may also be overwritten, but an implementation is already provided by the `Chart.Scale` base class.

```javascript
{
    // Adds labels to objects in the ticks array. The default implementation simply calls this.options.ticks.callback(numericalTick, index, ticks);
    generateTickLabels: function() {},

    // Determine how much the labels will rotate by. The default implementation will only rotate labels if the scale is horizontal.
    calculateLabelRotation: function() {},

    // Fits the scale into the canvas.
    // this.maxWidth and this.maxHeight will tell you the maximum dimensions the scale instance can be. Scales should endeavour to be as efficient as possible with canvas space.
    // this.margins is the amount of space you have on either side of your scale that you may expand in to. This is used already for calculating the best label rotation
    // You must set this.minSize to be the size of your scale. It must be an object containing 2 properties: width and height.
    // You must set this.width to be the width and this.height to be the height of the scale
    fit: function() {},

    // Draws the scale onto the canvas. this.(left|right|top|bottom) will have been populated to tell you the area on the canvas to draw in
    // @param chartArea : an object containing four properties: left, right, top, bottom. This is the rectangle that lines, bars, etc will be drawn in. It may be used, for example, to draw grid lines.
    draw: function(chartArea) {}
}
```

The Core.Scale base class also has some utility functions that you may find useful.

```javascript
{
    // Returns true if the scale instance is horizontal
    isHorizontal: function() {},

    // Returns the scale tick objects ({label, major})
    getTicks: function() {}
}
```


# New Charts

Chart.js 2.0 introduced the concept of controllers for each dataset. Like scales, new controllers can be written as needed.

```javascript
class MyType extends Chart.DatasetController {

}

Chart.register(MyType);

// Now we can create a new instance of our chart, using the Chart.js API
new Chart(ctx, {
    // this is the string the constructor was registered at, ie Chart.controllers.MyType
    type: 'MyType',
    data: data,
    options: options
});
```

## Dataset Controller Interface

Dataset controllers must implement the following interface.

```javascript
{
    // Defaults for charts of this type
    defaults: {
        // If set to `false` or `null`, no dataset level element is created.
        // If set to a string, this is the type of element to create for the dataset.
        // For example, a line create needs to create a line element so this is the string 'line'
        datasetElementType: string | null | false,

        // If set to `false` or `null`, no elements are created for each data value.
        // If set to a string, this is the type of element to create for each data value.
        // For example, a line create needs to create a point element so this is the string 'point'
        dataElementType: string | null | false,
    }

    // ID of the controller
    id: string;

    // Update the elements in response to new data
    // @param mode : update mode, core calls this method using any of `'active'`, `'hide'`, `'reset'`, `'resize'`, `'show'` or `undefined`
    update: function(mode) {}
}
```

The following methods may optionally be overridden by derived dataset controllers.

```javascript
{
    // Draw the representation of the dataset. The base implementation works in most cases, and an example of a derived version
    // can be found in the line controller
    draw: function() {},

    // Initializes the controller
    initialize: function() {},

    // Ensures that the dataset represented by this controller is linked to a scale. Overridden to helpers.noop in the polar area and doughnut controllers as these
    // chart types using a single scale
    linkScales: function() {},

    // Parse the data into the controller meta data. The default implementation will work for cartesian parsing, but an example of an overridden
    // version can be found in the doughnut controller
    parse: function(start, count) {},
}
```

## Extending Existing Chart Types

Extending or replacing an existing controller type is easy. Simply replace the constructor for one of the built-in types with your own.

The built-in controller types are:

* `BarController`
* `BubbleController`
* `DoughnutController`
* `LineController`
* `PieController`
* `PolarAreaController`
* `RadarController`
* `ScatterController`

These controllers are also available in the UMD package, directly under `Chart`. Eg: `Chart.BarController`.

For example, to derive a new chart type that extends from a bubble chart, you would do the following.

```javascript
import {BubbleController} from 'chart.js';
class Custom extends BubbleController {
    draw() {
        // Call bubble controller method to draw all the points
        super.draw(arguments);

        // Now we can do some custom drawing for this dataset. Here we'll draw a red box around the first point in each dataset
        const meta = this.getMeta();
        const pt0 = meta.data[0];

        const {x, y} = pt0.getProps(['x', 'y']);
        const {radius} = pt0.options;

        const ctx = this.chart.ctx;
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - radius, y - radius, 2 * radius, 2 * radius);
        ctx.restore();
    }
};
Custom.id = 'derivedBubble';
Custom.defaults = BubbleController.defaults;

// Stores the controller so that the chart initialization routine can look it up
Chart.register(Custom);

// Now we can create and use our new chart type
new Chart(ctx, {
    type: 'derivedBubble',
    data: data,
    options: options
});
```

## TypeScript Typings

If you want your new chart type to be statically typed, you must provide a `.d.ts` TypeScript declaration file. Chart.js provides a way to augment built-in types with user-defined ones, by using the concept of "declaration merging".

When adding a new chart type, `ChartTypeRegistry` must contain the declarations for the new type, either by extending an existing entry in `ChartTypeRegistry` or by creating a new one.

For example, to provide typings for a new chart type that extends from a bubble chart, you would add a `.d.ts` containing:

```typescript
import { ChartTypeRegistry } from 'chart.js';

declare module 'chart.js' {
    interface ChartTypeRegistry {
        derivedBubble: ChartTypeRegistry['bubble']
    }
}
```


# Contributing

New contributions to the library are welcome, but please follow these guidelines:

- Before opening a PR for major additions or changes, discuss the expected API and/or implementation by filing an issue or asking in the Chart.js Discord #dev channel. This will save development time by getting feedback upfront and make reviews faster by providing maintainers with more context and details.
- Consider whether your changes are useful for all users, or if creating a Chart.js plugin would be more appropriate.
- Ensure your code passes tests and adheres to `eslint` code standards. Use `pnpm test` to run both the linter and tests.
- Add unit tests and document new functionality in the `test/` and `docs/` directories respectively.
- Avoid breaking changes unless there is an upcoming major release. We encourage writing plugins for advanced features and prioritize backward compatibility.
- Prefer new methods to be private whenever possible. A method can be made private by defining it as a top-level function or prefixing it with `_` and adding `@private` JSDoc if inside a class. Public APIs take considerable time to review and become locked once implemented, limiting our ability to change them without breaking backward compatibility. Private APIs allow flexibility to address unforeseen cases.

## Joining the project

Active committers and contributors are invited to introduce themselves and request commit access to this project. We have a very active Discord community that you can join. If you think you can help, we'd love to have you!

## Building and Testing

Ensure development dependencies are installed. With Node and pnpm installed, after cloning the Chart.js repo to a local directory and navigating to that directory in the command line, run:

```bash
> pnpm install
```

This installs the local development dependencies for Chart.js.

The following commands are available from the repository root:

```bash
> pnpm run build             // build dist files in ./dist
> pnpm run autobuild         // build and watch for source changes
> pnpm run dev               // run tests and watch for source and test changes
> pnpm run lint              // perform code linting (ESLint, tsc)
> pnpm test                  // perform code linting and run unit tests with coverage
```

`pnpm run dev` and `pnpm test` can be appended with a string to match the spec filenames. For example: `pnpm run dev plugins` will start Karma in watch mode for `test/specs/**/*plugin*.js`.

### Documentation

We use Vuepress to manage the docs, which are contained as Markdown files in the docs directory. You can run the doc server locally using:

```bash
> pnpm run docs:dev
```

### Image-Based Tests

Some display-related functionality is difficult to test via typical Jasmine units. For this reason, we introduced image-based tests to assert that a chart is drawn pixel-for-pixel matching an expected image.

Generated charts in image-based tests should be as minimal as possible and focus only on the tested feature to prevent failure if another feature breaks (e.g., disable the title and legend when testing scales).

To create a new image-based test:

- Create a JS file or JSON file that defines chart config and generation options.
- Add this file in `test/fixtures/{spec.name}/{feature-name}.json`.
- Add a describe line to the beginning of `test/specs/{spec.name}.tests.js` if it doesn't exist yet.
- Run `pnpm run dev`.
- Click the "Debug" button (top/right): a test should fail with the associated canvas visible.
- Right-click on the chart and "Save image as..." `test/fixtures/{spec.name}/{feature-name}.png`, ensuring not to activate the tooltip or any hover functionality.
- Refresh the browser page (`CTRL+R`): the test should now pass.
- Verify test relevancy by changing the feature values slightly in the JSON file.

Tests should pass in both browsers. It is recommended to hide all text in image tests since it's difficult to get them to pass between different browsers. Hide all scales in image-based tests and disable animations. If tests still do not pass, adjust tolerance and/or threshold at the beginning of the JSON file, keeping them as low as possible.

When a test fails, the expected and actual images are shown. To see the images even when tests pass, set `"debug": true` in the JSON file.

## Bugs and Issues

Please report these on the GitHub page at github.com/chartjs/Chart.js. Do not use issues for support requests. For help using Chart.js, refer to the chart.js tag on Stack Overflow.

Well-structured, detailed bug reports are valuable for the project.

Guidelines for reporting bugs:

- Check the issue search to see if it has already been reported.
- Isolate the problem to a simple test case.
- Include a demonstration of the bug on a website such as JS Bin, JS Fiddle, or Codepen. If filing a bug against master, reference the latest code via the appropriate URL. Do not rely on these files for production purposes as they may be removed at any time.

Provide any additional details associated with the bug, including if it's browser or screen density specific, or only happens with a certain configuration or data.

# Developers

Developer features allow extending and enhancing Chart.js in many different ways.

## Latest resources

The latest documentation and samples, including unreleased features, are available at:

- www.chartjs.org/docs/master/
- www.chartjs.org/samples/master/

## Development releases

Latest builds are available for testing at:

- www.chartjs.org/dist/master/chart.js
- www.chartjs.org/dist/master/chart.min.js

**Warning**: Development builds **must not** be used for production purposes or as a replacement for a CDN. See available CDNs in the installation documentation.

## Browser support

All modern and up-to-date browsers are supported, including, but not limited to:

- Chrome
- Edge
- Firefox
- Safari

As of version 3, Internet Explorer 11 support has been dropped.

Browser support for the canvas element is available in all modern & major mobile browsers. Check CanIUse for details.

Run `npx browserslist` at the root of the codebase to get a list of supported browsers.

Thanks to BrowserStack for allowing our team to test on thousands of browsers.

## Previous versions

To migrate from version 2 to version 3, please see the v3 migration guide.

Version 3 has a largely different API than earlier versions. Most earlier version options have current equivalents or are the same.

Documentation for previous versions is available online or in the GitHub repo:

- 2.9.4 Documentation: www.chartjs.org/docs/2.9.4/
- 1.x Documentation: www.github.com/chartjs/Chart.js/tree/v1.1.1/docs

# Plugins

Plugins are the most efficient way to customize or change the default behavior of a chart. They were introduced in version 2.1.0 (global plugins only) and extended in version 2.5.0 (per chart plugins and options).

## Using plugins

Plugins can be shared between chart instances:

```javascript
const plugin = { /* plugin implementation */ };

// chart1 and chart2 use "plugin"
const chart1 = new Chart(ctx, {
    plugins: [plugin]
});

const chart2 = new Chart(ctx, {
    plugins: [plugin]
});

// chart3 doesn't use "plugin"
const chart3 = new Chart(ctx, {});
```

Plugins can also be defined directly in the chart `plugins` config (inline plugins):

*inline* plugins are not registered. Some plugins require registering and can't be used *inline*.

```javascript
const chart = new Chart(ctx, {
    plugins: [{
        beforeInit: function(chart, args, options) {
            //..
        }
    }]
});
```

However, this approach is not ideal when the customization needs to apply to many charts.

## Global plugins

Plugins can be registered globally to be applied on all charts (global plugins):

```javascript
Chart.register({
    // plugin implementation
});
```

*inline* plugins can't be registered globally.

## Configuration

### Plugin ID

Plugins must define a unique id to be configurable. This id should follow the npm package name convention:

- can't start with a dot or an underscore
- can't contain any non-URL-safe characters
- can't contain uppercase letters
- should be something short, but also reasonably descriptive

If a plugin is intended to be released publicly, check the registry to see if there's something by that name already. The package name should be prefixed by `chartjs-plugin-` to appear in Chart.js plugin registry.

### Plugin options

Plugin options are located under the `options.plugins` config and are scoped by the plugin ID: `options.plugins.{plugin-id}`.

```javascript
const chart = new Chart(ctx, {
    options: {
        foo: { ... },           // chart 'foo' option
        plugins: {
            p1: {
                foo: { ... },   // p1 plugin 'foo' option
                bar: { ... }
            },
            p2: {
                foo: { ... },   // p2 plugin 'foo' option
                bla: { ... }
            }
        }
    }
});
```

#### Disable plugins

To disable a global plugin for a specific chart instance, set the plugin options to `false`:

```javascript
Chart.register({
    id: 'p1',
    // ...
});

const chart = new Chart(ctx, {
    options: {
        plugins: {
            p1: false   // disable plugin 'p1' for this instance
        }
    }
});
```

To disable all plugins for a specific chart instance, set `options.plugins` to `false`:

```javascript
const chart = new Chart(ctx, {
    options: {
        plugins: false // all plugins are disabled for this instance
    }
});
```

#### Plugin defaults

You can set default values for your plugin options in the `defaults` entry of your plugin object. In the example below, the canvas will always have a lightgreen backgroundColor unless the user overrides this option in `options.plugins.custom_canvas_background_color.color`.

```javascript
const plugin = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color;
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    },
    defaults: {
        color: 'lightGreen'
    }
}
```

## Plugin Core API

Read more about the existing plugin extension hooks.

### Chart Initialization

Plugins are notified during the initialization process. These hooks can be used to set up data needed for the plugin to operate.

### Chart Update

Plugins are notified throughout the update process.

### Scale Update

Plugins are notified throughout the scale update process.

### Rendering

Plugins can interact with the chart throughout the render process. Each of the green processes is a plugin notification. The red lines indicate how cancelling part of the render process can occur when a plugin returns `false` from a hook. Not all hooks are cancelable, but most `before*` hooks can be cancelled.

### Event Handling

Plugins can interact with the chart during the event handling process. If a plugin makes changes that require a re-render, it can set `args.changed` to `true` to indicate that a render is needed.

### Chart destroy

Plugins are notified during the destroy process. These hooks can be used to destroy things that the plugin made and used during its life. The `destroy` hook has been deprecated since Chart.js version 3.7.0; use the `afterDestroy` hook instead.

## TypeScript Typings

If you want your plugin to be statically typed, you must provide a `.d.ts` TypeScript declaration file. Chart.js provides a way to augment built-in types with user-defined ones, using the concept of "declaration merging".

When adding a plugin, `PluginOptionsByType` must contain the declarations for the plugin.

For example, to provide typings for the canvas backgroundColor plugin, you would add a `.d.ts` containing:

```ts
import {ChartType, Plugin} from 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    customCanvasBackgroundColor?: {
      color?: string
    }
  }
}
```

# Publishing an extension

If you are planning on publishing an extension for Chart.js, here are some pointers.

## Awesome

You'd probably want your extension to be listed in the [awesome](https://github.com/chartjs/awesome).

Note the minimum extension age requirement of 30 days.

## ESM

If you are utilizing ESM, you probably still want to publish a UMD bundle of your extension. Because Chart.js v3 is tree shakeable, the interface is a bit different.
UMD package's global `Chart` includes everything, while ESM package exports all the things separately.
Fortunately, most of the exports can be mapped automatically by the bundlers.

But not the helpers.

In UMD, helpers are available through `Chart.helpers`. In ESM, they are imported from `chart.js/helpers`.

For example `import {isNullOrUndef} from 'chart.js/helpers'` is available at `Chart.helpers.isNullOrUndef` for UMD.

### Rollup

`output.globals` can be used to convert the helpers.

```js
module.exports = {
  // ...
  output: {
    globals: {
      'chart.js': 'Chart',
      'chart.js/helpers': 'Chart.helpers'
    }
  }
};
```


# Updating Charts

It's pretty common to want to update charts after they've been created. When the chart data or options are changed, Chart.js will animate to the new data values and options.

## Adding or Removing Data

Adding and removing data is supported by changing the data array. To add data, just add data into the data array as seen in this example, to remove it you can pop it again.

```javascript
function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
```

## Updating Options

To update the options, mutating the `options` property in place or passing in a new options object are supported.

- If the options are mutated in place, other option properties would be preserved, including those calculated by Chart.js.
- If created as a new object, it would be like creating a new chart with the options - old options would be discarded.

```javascript
function updateConfigByMutating(chart) {
    chart.options.plugins.title.text = 'new title';
    chart.update();
}

function updateConfigAsNewObject(chart) {
    chart.options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js'
            }
        },
        scales: {
            x: {
                display: true
            },
            y: {
                display: true
            }
        }
    };
    chart.update();
}
```

Scales can be updated separately without changing other options.
To update the scales, pass in an object containing all the customization including those unchanged ones.

Variables referencing any one from `chart.scales` would be lost after updating scales with a new `id` or the changed `type`.

```javascript
function updateScales(chart) {
    let xScale = chart.scales.x;
    let yScale = chart.scales.y;
    chart.options.scales = {
        newId: {
            display: true
        },
        y: {
            display: true,
            type: 'logarithmic'
        }
    };
    chart.update();
    // need to update the reference
    xScale = chart.scales.newId;
    yScale = chart.scales.y;
}
```

You can update a specific scale by its id as well.

```javascript
function updateScale(chart) {
    chart.options.scales.y = {
        type: 'logarithmic'
    };
    chart.update();
}
```

Code sample for updating options can be found in [line-datasets.html](https://www.chartjs.org/docs/latest/samples/area/line-datasets.html).

## Preventing Animations

Sometimes when a chart updates, you may not want an animation. To achieve this you can call `update` with `'none'` as mode.

```javascript
myChart.update('none');
```


# Accessibility

Chart.js charts are rendered on user-provided `canvas` elements. It is the user's responsibility to create the `canvas` element in an accessible manner. The `canvas` element is supported in all browsers and will render on screen, but its content is not accessible to screen readers.

Accessibility for `canvas` must be added using ARIA attributes on the `canvas` element or by including internal fallback content within the opening and closing canvas tags. 

For more detailed explanations and examples of `canvas` accessibility, refer to the website: pauljadam.com/demos/canvas.html.

## Examples

### Accessible `canvas` Elements

1. By setting the `role` and `aria-label`, this `canvas` has an accessible name:
   ```html
   <canvas id="goodCanvas1" width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas>
   ```

2. This `canvas` element has a text alternative via fallback content:
   ```html
   <canvas id="okCanvas2" width="400" height="100">
       <p>Hello Fallback World</p>
   </canvas>
   ```

### Inaccessible `canvas` Elements

1. This `canvas` element lacks an accessible name or role:
   ```html
   <canvas id="badCanvas1" width="400" height="100"></canvas>
   ```

2. This `canvas` element has inaccessible fallback content:
   ```html
   <canvas id="badCanvas2" width="400" height="100">Your browser does not support the canvas element.</canvas>
   ```

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

# Data structures

The `data` property of a dataset can be passed in various formats. By default, that `data` is parsed using the associated chart type and scales.

If the `labels` property of the main `data` property is used, it must contain the same number of elements as the dataset with the most values. These labels are used to label the index axis (default x axes). The values for the labels must be provided in an array. The provided labels can be of type string or number. For multiline labels, an array with each line as one entry can be provided.

## Primitive[]

```javascript
const cfg = {
  type: 'bar',
  data: {
    datasets: [{
      data: [20, 10],
    }],
    labels: ['a', 'b']
  }
}
```

When the `data` is an array of numbers, values from the `labels` array at the same index are used for the index axis (`x` for vertical, `y` for horizontal charts).

## Object[]

```javascript
const cfg = {
  type: 'line',
  data: {
    datasets: [{
      data: [{x: 10, y: 20}, {x: 15, y: null}, {x: 20, y: 10}]
    }]
  }
}
```

```javascript
const cfg = {
  type: 'line',
  data: {
    datasets: [{
      data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}]
    }]
  }
}
```

```javascript
const cfg = {
  type: 'bar',
  data: {
    datasets: [{
      data: [{x: 'Sales', y: 20}, {x: 'Revenue', y: 10}]
    }]
  }
}
```

This is also the internal format used for parsed data. In this mode, parsing can be disabled by specifying `parsing: false` at chart options or dataset. If parsing is disabled, data must be sorted and in the formats the associated chart type and scales use internally.

The values provided must be parsable by the associated scales or in the internal format of the associated scales. A common mistake is providing integers for the `category` scale, which uses integers as an internal format, where each integer represents an index in the labels array. `null` can be used for skipped values.

## Object[] using custom properties

```javascript
const cfg = {
  type: 'bar',
  data: {
    datasets: [{
      data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}]
    }]
  },
  options: {
    parsing: {
      xAxisKey: 'id',
      yAxisKey: 'nested.value'
    }
  }
}
```

When using pie/doughnut, radar, or polarArea chart types, the `parsing` object should have a `key` item that points to the value to look at. 

```javascript
const cfg = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}]
    }]
  },
  options: {
    parsing: {
      key: 'nested.value'
    }
  }
}
```

If the key contains a dot, it needs to be escaped with a double slash:

```javascript
const cfg = {
  type: 'line',
  data: {
    datasets: [{
      data: [{'data.key': 'one', 'data.value': 20}, {'data.key': 'two', 'data.value': 30}]
    }]
  },
  options: {
    parsing: {
      xAxisKey: 'data\\.key',
      yAxisKey: 'data\\.value'
    }
  }
}
```

When using object notation in a radar chart, a labels array with labels is still required for the chart to display correctly.

## Object

```javascript
const cfg = {
  type: 'line',
  data: {
    datasets: [{
      data: {
        January: 10,
        February: 20
      }
    }]
  }
}
```

In this mode, the property name is used for the `index` scale and the value for the `value` scale. For vertical charts, the index scale is `x` and the value scale is `y`.

## Dataset Configuration

- `label`: string - The label for the dataset which appears in the legend and tooltips.
- `clip`: number|object - How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. 0 = clip at chartArea. Clipping can also be configured per side.
- `order`: number - The drawing order of the dataset. Also affects order for stacking, tooltip, and legend.
- `stack`: string - The ID of the group to which this dataset belongs (when stacked, each group will be a separate stack). Defaults to dataset type.
- `parsing`: boolean|object - How to parse the dataset. Parsing can be disabled by specifying parsing: false at chart options or dataset. If parsing is disabled, data must be sorted and in the formats the associated chart type and scales use internally.
- `hidden`: boolean - Configure the visibility of the dataset. Using `hidden: true` will hide the dataset from being rendered in the Chart.

### parsing

```javascript
const data = [{x: 'Jan', net: 100, cogs: 50, gm: 50}, {x: 'Feb', net: 120, cogs: 55, gm: 75}];
const cfg = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb'],
    datasets: [{
      label: 'Net sales',
      data: data,
      parsing: {
        yAxisKey: 'net'
      }
    }, {
      label: 'Cost of goods sold',
      data: data,
      parsing: {
        yAxisKey: 'cogs'
      }
    }, {
      label: 'Gross margin',
      data: data,
      parsing: {
        yAxisKey: 'gm'
      }
    }]
  },
};
```

## Typescript

When using TypeScript, if you want to use a data structure that is not the default data structure, you will need to pass it to the type interface when instantiating the data variable.

```ts
import {ChartData} from 'chart.js';

const datasets: ChartData<'bar', {key: string, value: number}[]> = {
  datasets: [{
    data: [{key: 'Sales', value: 20}, {key: 'Revenue', value: 10}],
    parsing: {
      xAxisKey: 'key',
      yAxisKey: 'value'
    }
  }],
};
```

# Fonts

There are special global settings that can change all the fonts on the chart. These options are in `Chart.defaults.font`. The global font settings only apply when more specific options are not included in the config.

For example, in this chart, the text will have a font size of 16px except for the labels in the legend.

```javascript
Chart.defaults.font.size = 16;
let chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14
                    }
                }
            }
        }
    }
});
```

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `family` | `string` | `"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"` | Default font family for all text, follows CSS font-family options.
| `size` | `number` | `12` | Default font size (in px) for text. Does not apply to radialLinear scale point labels.
| `style` | `string` | `'normal'` | Default font style. Does not apply to tooltip title or footer. Does not apply to chart title. Follows CSS font-style options (i.e. normal, italic, oblique, initial, inherit).
| `weight` | `normal` \| `bold` \| `lighter` \| `bolder` \| `number` | `undefined` | Default font weight (boldness). (see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)).
| `lineHeight` | `number`\|`string` | `1.2` | Height of an individual line of text (see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)).

## Missing Fonts

If a font is specified for a chart that does exist on the system, the browser will not apply the font when it is set. If you notice odd fonts appearing in your charts, check that the font you are applying exists on your system. See [issue 3318](https://github.com/chartjs/Chart.js/issues/3318) for more details.

## Loading Fonts

If a font is not cached and needs to be loaded, charts that use the font will need to be updated once the font is loaded. This can be accomplished using the [Font Loading APIs](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API). See [issue 8020](https://github.com/chartjs/Chart.js/issues/8020) for more details.


# Options

## Option resolution

Options are resolved from top to bottom, using a context-dependent route.

### Chart level options

- options
- overrides[`config.type`]
- defaults

### Dataset level options

`dataset.type` defaults to `config.type` if not specified.

- dataset
- options.datasets[`dataset.type`]
- options
- overrides[`config.type`].datasets[`dataset.type`]
- defaults.datasets[`dataset.type`]
- defaults

### Dataset animation options

- dataset.animation
- options.datasets[`dataset.type`].animation
- options.animation
- overrides[`config.type`].datasets[`dataset.type`].animation
- defaults.datasets[`dataset.type`].animation
- defaults.animation

### Dataset element level options

Each scope is looked up with `elementType` prefix in the option name first, then without the prefix. For example, `radius` for `point` element is looked up using `pointRadius` and if that does not hit, then `radius`.

- dataset
- options.datasets[`dataset.type`]
- options.datasets[`dataset.type`].elements[`elementType`]
- options.elements[`elementType`]
- options
- overrides[`config.type`].datasets[`dataset.type`]
- overrides[`config.type`].datasets[`dataset.type`].elements[`elementType`]
- defaults.datasets[`dataset.type`]
- defaults.datasets[`dataset.type`].elements[`elementType`]
- defaults.elements[`elementType`]
- defaults

### Scale options

- options.scales
- overrides[`config.type`].scales
- defaults.scales
- defaults.scale

### Plugin options

A plugin can provide `additionalOptionScopes` array of paths to additionally look for its options in. For root scope, use empty string: `''`. Most core plugins also take options from root scope.

- options.plugins[`plugin.id`]
- (options.[`...plugin.additionalOptionScopes`])
- overrides[`config.type`].plugins[`plugin.id`]
- defaults.plugins[`plugin.id`]
- (defaults.[`...plugin.additionalOptionScopes`])

## Scriptable Options

Scriptable options accept a function called for each underlying data value, taking the unique argument `context` representing contextual information. A resolver is passed as a second parameter to access other options in the same context.

Note: The `context` argument should be validated in the scriptable function, as it can be invoked in different contexts. The `type` field is a good candidate for this validation.

Example:

```javascript
color: function(context) {
    const index = context.dataIndex;
    const value = context.dataset.data[index];
    return value < 0 ? 'red' :
        index % 2 ? 'blue' :
        'green';
},
borderColor: function(context, options) {
    const color = options.color;
    return Chart.helpers.color(color).lighten(0.2);
}
```

## Indexable Options

Indexable options accept an array where each item corresponds to the element at the same index. If there are fewer items than data, the items are looped over. Using a function is often more appropriate if supported.

Example:

```javascript
color: [
    'red',
    'blue',
    'green',
    'black',
    //...
]
```

## Option Context

The option context provides contextual information when resolving options and currently applies only to scriptable options. The object is preserved for storing and passing information between calls.

Context objects include:

- `chart`
  - `dataset`
    - `data`
  - `scale`
    - `tick`
    - `pointLabel` (only in radial linear scale)
  - `tooltip`

Each level inherits its parent(s), making contextual information available through the child.

### chart

- `chart`: the associated chart
- `type`: `'chart'`

### dataset

In addition to chart:

- `active`: true if an element is active (hovered)
- `dataset`: dataset at index `datasetIndex`
- `datasetIndex`: index of the current dataset
- `index`: same as `datasetIndex`
- `mode`: the update mode
- `type`: `'dataset'`

### data

In addition to dataset:

- `active`: true if an element is active (hovered)
- `dataIndex`: index of the current data
- `parsed`: parsed data values for the given `dataIndex` and `datasetIndex`
- `raw`: raw data values for the given `dataIndex` and `datasetIndex`
- `element`: the element (point, arc, bar, etc.) for this data
- `index`: same as `dataIndex`
- `type`: `'data'`

### scale

In addition to chart:

- `scale`: the associated scale
- `type`: `'scale'`

### tick

In addition to scale:

- `tick`: the associated tick object
- `index`: tick index
- `type`: `'tick'`

### pointLabel

In addition to scale:

- `label`: the associated label value
- `index`: label index
- `type`: `'pointLabel'`

### tooltip

In addition to chart:

- `tooltip`: the tooltip object
- `tooltipItems`: the items the tooltip is displaying

# Padding

Padding values in Chart options can be supplied in a couple of different formats.

## Number

If this value is a number, it is applied to all sides (left, top, right, bottom).

For example, defining a 20px padding to all sides of the chart:

```javascript
let chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        layout: {
            padding: 20
        }
    }
});
```

## {top, left, bottom, right} object

If this value is an object, the `left` property defines the left padding. Similarly, the `right`, `top` and `bottom` properties can also be specified.
Omitted properties default to `0`.

Let's say you wanted to add 50px of padding to the left side of the chart canvas, you would do:

```javascript
let chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        layout: {
            padding: {
                left: 50
            }
        }
    }
});
```

## {x, y} object

This is a shorthand for defining left/right and top/bottom to the same values.

For example, 10px left / right and 4px top / bottom padding on a Radial Linear Axis [tick backdropPadding](../axes/radial/linear.md#linear-radial-axis-specific-tick-options):

```javascript
let chart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: {
        scales: {
          r: {
            ticks: {
              backdropPadding: {
                  x: 10,
                  y: 4
              }
            }
        }
    }
});
```


# Performance

Chart.js charts are rendered on `canvas` elements, which makes rendering quite fast. For large datasets or performance sensitive applications, you may wish to consider the tips below.

## Data structure and format

### Parsing

Provide prepared data in the internal format accepted by the dataset and scales, and set `parsing: false`. See [Data structures](data-structures.md) for more information.

### Data normalization

Chart.js is fastest if you provide data with indices that are unique, sorted, and consistent across datasets and provide the `normalized: true` option to let Chart.js know that you have done so. Even without this option, it can sometimes still be faster to provide sorted data.

### Decimation

Decimating your data will achieve the best results. When there is a lot of data to display on the graph, it doesn't make sense to show tens of thousands of data points on a graph that is only a few hundred pixels wide.

The [decimation plugin](../configuration/decimation.md) can be used with line charts to decimate data before the chart is rendered. This will provide the best performance since it will reduce the memory needed to render the chart.

Line charts are able to do [automatic data decimation during draw](#automatic-data-decimation-during-draw), when certain conditions are met. You should still consider decimating data yourself before passing it in for maximum performance since the automatic decimation occurs late in the chart life cycle.

## Tick Calculation

### Rotation

[Specify a rotation value](../axes/cartesian/index.md#tick-configuration) by setting `minRotation` and `maxRotation` to the same value, which avoids the chart from having to automatically determine a value to use.

### Sampling

Set the [`ticks.sampleSize`](../axes/cartesian/index.md#tick-configuration) option. This will determine how large your labels are by looking at only a subset of them in order to render axes more quickly. This works best if there is not a large variance in the size of your labels.

## Disable Animations

If your charts have long render times, it is a good idea to disable animations. Doing so will mean that the chart needs to only be rendered once during an update instead of multiple times. This will have the effect of reducing CPU usage and improving general page performance.
Line charts use Path2D caching when animations are disabled and Path2D is available.

To disable animations

```javascript
new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        animation: false
    }
});
```

## Specify `min` and `max` for scales

If you specify the `min` and `max`, the scale does not have to compute the range from the data.

```javascript
new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'time',
                min: new Date('2019-01-01').valueOf(),
                max: new Date('2019-12-31').valueOf()
            },
            y: {
                type: 'linear',
                min: 0,
                max: 100
            }
        }
    }
});
```

## Parallel rendering with web workers

As of 2023, modern browser have the ability to [transfer rendering control of a canvas](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen) to a web worker. Web workers can use the [OffscreenCanvas API](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) to render from a web worker onto canvases in the DOM. Chart.js is a canvas-based library and supports rendering in a web worker - just pass an OffscreenCanvas into the Chart constructor instead of a Canvas element.

By moving all Chart.js calculations onto a separate thread, the main thread can be freed up for other uses. Some tips and tricks when using Chart.js in a web worker:

* Transferring data between threads can be expensive, so ensure that your config and data objects are as small as possible. Try generating them on the worker side if you can (workers can make HTTP requests!) or passing them to your worker as ArrayBuffers, which can be transferred quickly from one thread to another.
* You can't transfer functions between threads, so if your config object includes functions you'll have to strip them out before transferring and then add them back later.
* You can't access the DOM from worker threads, so Chart.js plugins that use the DOM (including any mouse interactions) will likely not work.
* Ensure that you have a fallback if you support older browsers.
* Resizing the chart must be done manually. See an example in the worker code below.

Example main thread code:

```javascript
const config = {};
const canvas = new HTMLCanvasElement();
const offscreenCanvas = canvas.transferControlToOffscreen();

const worker = new Worker('worker.js');
worker.postMessage({canvas: offscreenCanvas, config}, [offscreenCanvas]);
```

Example worker code, in `worker.js`:

```javascript
onmessage = function(event) {
    const {canvas, config} = event.data;
    const chart = new Chart(canvas, config);

    // Resizing the chart must be done manually, since OffscreenCanvas does not include event listeners.
    canvas.width = 100;
    canvas.height = 100;
    chart.resize();
};
```

## Line Charts

### Leave Bézier curves disabled

If you are drawing lines on your chart, disabling Bézier curves will improve render times since drawing a straight line is more performant than a Bézier curve. Bézier curves are disabled by default.

### Automatic data decimation during draw

Line element will automatically decimate data, when `tension`, `stepped`, and `borderDash` are left set to their default values (`false`, `0`, and `[]` respectively). This improves rendering speed by skipping drawing of invisible line segments.

### Enable spanGaps

If you have a lot of data points, it can be more performant to enable `spanGaps`. This disables segmentation of the line, which can be an unneeded step.

To enable `spanGaps`:

```javascript
new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            spanGaps: true // enable for a single dataset
        }]
    },
    options: {
        spanGaps: true // enable for all datasets
    }
});
```

### Disable Line Drawing

If you have a lot of data points, it can be more performant to disable rendering of the line for a dataset and only draw points. Doing this means that there is less to draw on the canvas which will improve render performance.

To disable lines:

```javascript
new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            showLine: false // disable for a single dataset
        }]
    },
    options: {
        showLine: false // disable for all datasets
    }
});
```

### Disable Point Drawing

If you have a lot of data points, it can be more performant to disable rendering of the points for a dataset and only draw line. Doing this means that there is less to draw on the canvas which will improve render performance.

To disable point drawing:

```javascript
new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            pointRadius: 0 // disable for a single dataset
        }]
    },
    options: {
        datasets: {
            line: {
                pointRadius: 0 // disable for all `'line'` datasets
            }
        },
        elements: {
            point: {
                radius: 0 // default to disabled in all datasets
            }
        }
    }
});
```

## When transpiling with Babel, consider using `loose` mode

Babel 7.9 changed the way classes are constructed. It is slow, unless used with `loose` mode.
[More information](https://github.com/babel/babel/issues/11356)


# Getting Started

Let's get started with Chart.js!

* Follow a step-by-step guide to get up to speed with Chart.js
* Install Chart.js from npm or a CDN 
* Integrate Chart.js with bundlers, loaders, and front-end frameworks

Alternatively, see the example below or check samples.

## Create a Chart

In this example, we create a bar chart for a single dataset and render it on an HTML page. Add this code snippet to your page:

```html
<div>
  <canvas id="myChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
</script>
```

You should get a chart like this:

![demo](./preview.png)

Let's break this code down.

First, we need to have a canvas in our page. It's recommended to give the chart its own container for responsiveness.

```html
<div>
  <canvas id="myChart"></canvas>
</div>
```

Now that we have a canvas, we can include Chart.js from a CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Finally, we can create a chart. We add a script that acquires the `myChart` canvas element and instantiates `new Chart` with desired configuration: `bar` chart type, labels, data points, and options. 

```html
<script>
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
</script>
```

You can see all the ways to use Chart.js in the step-by-step guide.

# Installation

## npm

npm install chart.js

## CDN

### CDNJS

Chart.js built files are available on CDNJS:

cdnjs.com/libraries/Chart.js

### jsDelivr

Chart.js built files are also available through jsDelivr:

jsdelivr.com/package/npm/chart.js?path=dist

## GitHub

You can download the latest version of Chart.js on GitHub:

github.com/chartjs/Chart.js/releases/latest

If you download or clone the repository, you must build Chart.js to generate the dist files. Chart.js no longer comes with prebuilt release versions, so an alternative option to downloading the repo is strongly advised.

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