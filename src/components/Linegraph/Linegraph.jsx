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


function createDataArray(length) {
  var data = [];
  
  // Generate JSON objects with random price and date
  for (var i = 0; i < length; i++) {
    var price = Math.random() * (100 - 1) + 1; // Random price between 1 and 100 USD
    var date = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)); // Random date within the last 10000 days

    data.push({
      "priceUsd": price.toFixed(2),
      "date": date.toISOString().split('T')[0]
    });
  }
  
  // Sort the array by date in ascending order
  data.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  
  return data;
}

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

  if(!dataProp){
    dataProp = createDataArray(12)
  }
  const data = {
    labels: dataProp.map((obj) => obj.date),

    datasets: [
      {
        label: "Dataset 1",
        data: dataProp.map((obj) => obj.priceUsd),
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
