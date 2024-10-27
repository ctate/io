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