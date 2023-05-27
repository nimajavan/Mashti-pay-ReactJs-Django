import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

function LineChart() {

    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };

  return (
    <div className='w-100'>
        <Line 
          data={data}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'center'
            }
          }}
        />
      </div>
  )
}

export default LineChart