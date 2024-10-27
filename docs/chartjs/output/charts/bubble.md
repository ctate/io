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