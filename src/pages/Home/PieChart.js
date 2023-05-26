import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useChart from "../../hooks/useChart";
import {
  combineExpenseCategoryAmounts,
  combineIncomeCategoryAmounts,
  getExpenseCategoryColor,
  getIncomeCategoryColor,
} from "../../utils/utils";

export default function PieChart({ transactions, isExpense }) {
  const [chart, setChart] = useChart();

  useEffect(() => {
    if (transactions) {
      if (isExpense) {
        setChart(
          combineExpenseCategoryAmounts(transactions),
          getExpenseCategoryColor(transactions)
        );
      } else {
        setChart(
          combineIncomeCategoryAmounts(transactions),
          getIncomeCategoryColor(transactions)
        );
      }
    }
  }, [transactions]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chart ? chart.options : ""}
        series={chart ? chart.series : ""}
        type="donut"
        width={380}
      />
    </div>
  );
}
