import React from "react";
import ReactApexChart from "react-apexcharts";

export default function Top10Expenses({ topExpensesByCat }) {
  let options = {
    series: [
      {
        data: topExpensesByCat,
      },
    ],
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      type: "treemap",
    },
    title: {
      text: "Top expenses (Categories)",
      align: "center",
    },
    colors: [
      "#3B93A5",
      "#F7B844",
      "#ADD8C7",
      "#EC3C65",
      "#CDD7B6",
      "#C1F666",
      "#D43F97",
      "#1E5D8C",
      "#421243",
      "#7F94B0",
      "#EF6537",
      "#C0ADDB",
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#00FFFF",
      "#800080",
      "#FFA500",
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        options={options}
        series={options.series}
        type="treemap"
        width="95%"
      />
    </div>
  );
}
