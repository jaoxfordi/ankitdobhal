const Plotly = require("plotly.js-dist");

const chartEl = document.getElementById("chart");

var layout = {
  // showlegend: false,
  width: window.innerWidth - 20,
  margin: {
    l: 40,
    r: 0,
    t: 40,
    b: 40,
  },
  xaxis: {
    rangeslider: {},
  },
  dragmode: "pan",
};

var config = {
  responsive: true,
  displayModeBar: true,
  scrollZoom: true,
  displaylogo: false,
};

function rand() {
  let x = Math.random();
  if (x < 0.9) {
    return x * 10;
  }

  return x * 1000;
}

Plotly.newPlot(
  chartEl,
  [
    {
      y: [1, 2, 3].map(rand),
      mode: "lines",
    },
    {
      y: [1, 2].map(rand),
      mode: "lines",
    },
  ],
  layout,
  config
);

var cnt = 0;
var interval = setInterval(function () {
  Plotly.extendTraces(
    "chart",
    {
      y: [[rand()], [rand()]],
    },
    [0, 1]
  );

  cnt = cnt + 1;
  if (cnt > 100) {
    Plotly.relayout("chart", {
      xaxis: {
        range: [cnt - 100, cnt],
        rangeslider: {},
      },
    });
  }
  if (cnt === 1000) clearInterval(interval);
}, 100);
