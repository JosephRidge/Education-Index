
<template>
    <div>
      <h1>Kenya Population Labor Force by Gender between 2015-2024</h1>
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
        const response = await fetch('visuals/labour_force.csv'); // Use the correct path to your CSV file
        const text = await response.text();
  
        const data = Papa.parse(text, { header: true }).data;
  
        const years = [...new Set(data.map(row => row.time))];
        const genders = ['male', 'female']; // Add more genders if necessary
  
        const datasets = genders.map(gender => {
          const label = gender === 'male' ? 'Male Labour Force' : 'Female Labour Force';
          const dataPoints = years.map(year => {
            const row = data.find(item => item.time === year && item.sex === gender);
            return row ? parseFloat(row.labour_force) : 0;
          });
  
          return {
            label: label,
            data: dataPoints,
            backgroundColor: getRandomColor(),
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
                  text: 'Labour Force',
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
  