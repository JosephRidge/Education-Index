<template>
    <div>
      <h1>Employment by Sex, Age Group, and Economic Activity (Radar Chart)</h1>
      <div class="chart" id="radar">
        <canvas ref="myChartCanvas"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import Papa from 'papaparse';
  import Chart from 'chart.js/auto';
  
  export default {
    setup() {
      const myChartCanvas = ref(null);
  
      onMounted(() => {
        loadCSVAndCreateChart();
      });
  
      async function loadCSVAndCreateChart() {
        const response = await fetch('/visuals/economic_activity.csv'); // Updated path
        const text = await response.text();
  
        const data = Papa.parse(text, { header: true }).data;
  
        const ageGroups = [...new Set(data.map(row => row.age_group))];
        const economicActivities = [...new Set(data.map(row => row.economic_activity))];
  
        const datasets = ageGroups.map(ageGroup => {
          return {
            label: ageGroup,
            data: economicActivities.map(activity => {
              const row = data.find(item => item.age_group === ageGroup && item.economic_activity === activity);
              return row ? parseFloat(row.obs_value) : 0;
            }),
            borderColor: getRandomColor(),
            borderWidth: 1,
            fill: true,
          };
        });
  
        new Chart(myChartCanvas.value, {
          type: 'radar',
          elements: {
      line: {
        borderWidth: 6, // Increase line width
      },
      point: {
        radius: 17, // Increase point size
        borderWidth: 7,
      },
    },
          data: {
            labels: economicActivities,
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                ticks: {
          stepSize: 10,
        },

                title: {
                  display: true,
                  text: 'Employment (thousands)',
                },
              },
            },
          },
        });
      }
  
      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
  
      return {
        myChartCanvas,
      };
    },
  };
  </script>
  
  <style>
  .chart {
    height: 80vh;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  #radar{
    background-color:rgb(158, 196, 234) ;
    border-radius: 50px;

  }
  </style>
  