<template>
    <div>
      <h1>Employment Growth Rate by Sex and Economic Activity</h1>
      <div class="chart">
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
        createChart();
      });
  
      async function createChart() {
        const response = await fetch('visuals/growth_rate.csv'); // Use the correct path to your CSV file
        const text = await response.text();
  
        const data = Papa.parse(text, { header: true }).data;
  
  
        const years = [...new Set(data.map(row => row.time))];
        const sexes = ['male', 'female']; // Add more genders if necessary
  
        const datasets = sexes.map(sex => {
          const label = sex === 'male' ? 'Male' : 'Female';
          const growthRates = years.map((year, index) => {
            if (index === 0) return 0; // Growth rate not applicable for the first year
            const currentRow = data.find(item => item.time === year && item.sex === sex);
            const prevRow = data.find(item => item.time === years[index - 1] && item.sex === sex);
            if (currentRow && prevRow) {
              const growthRate = ((currentRow.obs_value - prevRow.obs_value) / prevRow.obs_value) * 100;
              return growthRate;
            } else {
              return 0;
            }
          });
  
          return {
            label: label,
            data: growthRates,
            borderColor: getRandomColor(),
            fill: false,
          };
        });
  
        new Chart(myChartCanvas.value, {
          type: 'line',
          data: {
            labels: years,
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Growth Rate (%)',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Year',
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
  }
  </style>
  