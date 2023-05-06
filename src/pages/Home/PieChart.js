import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function PieChart() {
  const [chart, setChart] = useState({
    series: [60, 55, 41, 17],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      // legend: {
      //   formatter: function (val, opts) {
      //     return val + " - " + opts.w.globals.series[opts.seriesIndex];
      //   },
      // },
      // title: {
      //   text: "Gradient Donut with custom Start-anglesss",
      // },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        type="donut"
        width={380}
      />
    </div>
  );
}
