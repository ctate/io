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