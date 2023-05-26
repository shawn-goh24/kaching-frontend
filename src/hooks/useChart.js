import { useState } from "react";

const defaults = {
  series: [],
  options: {
    labels: [],
    colors: [],

    legend: {
      position: "bottom",
    },
    chart: {
      width: 380,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              formatter: function (value) {
                const totalValue = value.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return totalValue.toFixed(2);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
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
};

export default function useChart() {
  // const [amounts, setAmounts] = useState([]);
  // const [labels, setLabels] = useState([]);
  // const [colors, setColors] = useState([]);
  const [object, setObject] = useState(defaults);

  function changeValue(value, colorMap) {
    let amount = [];
    let label = [];
    let color = [];
    for (const i of value.values()) {
      amount.push(i);
    }
    for (const i of value.keys()) {
      label.push(i);
    }
    for (const i of colorMap.values()) {
      color.push(i);
    }
    // setAmounts(amount);
    // setLabels(label);
    // setColors(color);

    setObject((prevState) => ({
      ...prevState,
      series: amount,
      options: {
        ...prevState.options,
        labels: label,
        colors: color,
      },
    }));

    // setObject(
    //   typeof value === "object"
    //     ? {
    //         series: amount,
    //         options: {
    //           labels: label,
    //           colors: color,
    //           chart: {
    //             width: 380,
    //             type: "donut",
    //           },
    //           plotOptions: {
    //             pie: {
    //               startAngle: -90,
    //               endAngle: 270,
    //               donut: {
    //                 labels: {
    //                   show: true,
    //                   total: {
    //                     show: true,
    //                     showAlways: true,
    //                     formatter: function (value) {
    //                       const totalValue = value.globals.seriesTotals.reduce(
    //                         (a, b) => {
    //                           return a + b;
    //                         },
    //                         0
    //                       );
    //                       return totalValue.toFixed(2);
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //           dataLabels: {
    //             enabled: false,
    //           },
    //           fill: {
    //             type: "gradient",
    //           },
    //           responsive: [
    //             {
    //               breakpoint: 1200,
    //               options: {
    //                 chart: {
    //                   width: 350,
    //                 },
    //                 legend: {
    //                   position: "bottom",
    //                 },
    //               },
    //             },
    //           ],
    //         },
    //       }
    //     : null
    // );
  }

  return [object, changeValue];
}
