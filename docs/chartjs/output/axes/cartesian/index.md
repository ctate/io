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