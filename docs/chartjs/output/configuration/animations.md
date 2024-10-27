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