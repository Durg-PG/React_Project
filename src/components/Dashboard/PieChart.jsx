import React from "react";
import ReactECharts from "echarts-for-react";

const PieChart = (props) => {
  const option = {
    title: {
      text: props.text,
      left: "center",
    },
    color: props.colors,
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        stillShowZeroSum: false,
        radius: "80%",
        data: [
          { value: props.element1.value1, name: props.element1.name1 },
          { value: props.element2.value2, name: props.element2.name2 },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "70vh", left: 130, top: 20, width: "55%" }}
    />
  );
};

export default PieChart;
