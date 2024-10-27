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