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