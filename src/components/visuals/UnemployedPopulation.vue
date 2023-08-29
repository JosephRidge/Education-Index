<template>
    <div>
      <h1>Kenya Total Unemployed Population by Sex and Age Group between 2015-2024</h1>
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
        const response = await fetch('/visuals/total_unemployed_population.csv'); // Use the correct path to your CSV file
        const text = await response.text();
  
        const data = Papa.parse(text, { header: true }).data;
  
        const ageGroups = [...new Set(data.map(row => row.age_group))];
        const genders = [...new Set(data.map(row => row.sex))];
  
        const datasets = ageGroups.map(ageGroup => {
          return {
            label: ageGroup,
            data: genders.map(gender => {
              const row = data.find(item => item.age_group === ageGroup && item.sex === gender);
              return row ? parseFloat(row.total_unemployed_population) : 0;
            }),
            backgroundColor: getRandomColor(),
          };
        });
  
        new Chart(myChartCanvas.value, {
          type: 'bar',
          data: {
            labels: genders,
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
                  text: 'Total Unemployed Population',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Sex',
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
  