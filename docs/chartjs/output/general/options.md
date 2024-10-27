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