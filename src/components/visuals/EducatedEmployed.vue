<template>
    <div>
      <h1>Employment Trends by Education Level</h1>
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
        loadCSVAndCreateChart();
      });
  
      async function loadCSVAndCreateChart() {
        const response = await fetch('visuals/emp_edu_data.csv'); // Use the correct path to your CSV file
        const text = await response.text();
  
        const data = Papa.parse(text, { header: true }).data;
  
        const educationLevels = [...new Set(data.map(row => row.classif2))];
        const years = [...new Set(data.map(row => row.time))];
  
        const datasets = educationLevels.map(educationLevel => {
          const label = educationLevel;
          const dataPoints = years.map(year => {
            const row = data.find(item => item.time === year && item.classif2 === educationLevel);
            return row ? parseFloat(row.obs_value) : 0;
          });
  
          return {
            label: label,
            data: dataPoints,
            borderColor:['rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(201, 203, 207, 0.6)'],
            backgroundColor: [
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(201, 203, 207, 0.6)'
    ],
            fill: false,
          };
        });
  
        new Chart(myChartCanvas.value, {
          type: 'bar',
          data: {
            labels: years,
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Employment',
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
        const letters = '123456789ABCDEF';
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
  