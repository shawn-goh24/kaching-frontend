import { useEffect, useState } from "react";

export default function useChart(mappedCategoriesAmount) {
  const [value, setValue] = useState(mappedCategoriesAmount);
  const [amounts, setAmounts] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);
  const [object, setObject] = useState({
    series: amounts,
    options: {
      labels: labels,
      colors: colors,

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
  });

  function changeValue(value, colorMap) {
    setValue(value);

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
    setAmounts(amount);
    setLabels(label);
    setColors(color);
    // console.log(amount, label);

    setObject(
      typeof value === "object"
        ? {
            series: amount,
            options: {
              labels: label,
              colors: color,
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
          }
        : null
    );
  }

  return [object, changeValue];
}
