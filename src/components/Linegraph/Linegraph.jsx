import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Linegraph = ({ dataProp }) => {
  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    responsive: true,
    pointRadius: 0,
  };

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    datasets: [
      {
        label: "Dataset 1",
        data: dataProp,
        borderColor: "#00b4ff",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div
      style={{
        marginLeft: "auto",
      }}
    >
      <Line
        style={{
          width: "150px",
          height: "50px",
        }}
        options={options}
        data={data}
      />
    </div>
  );
};

export default Linegraph;
