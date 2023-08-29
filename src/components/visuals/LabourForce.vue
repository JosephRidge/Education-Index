<template>
    <div>
      <h1>Kenya Population Labor Force and Inactive Population</h1>
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
        const ageGroups = [...new Set(data.map(row => row.age_group))];
  
        const datasets = [];
  
        ageGroups.forEach(ageGroup => {
          const labourForceData = years.map(year => {
            const row = data.find(item => item.time === year && item.age_group === ageGroup && item.sex === 'male');
            return row ? parseFloat(row.labour_force) : 0;
          });
  
          const inactivePopulationData = years.map(year => {
            const row = data.find(item => item.time === year && item.age_group === ageGroup && item.sex === 'female');
            return row ? parseFloat(row.inactive_population) : 0;
          });
  
          datasets.push({
            label: `${ageGroup} - Labour Force`,
            data: labourForceData,
            backgroundColor: getRandomColor(),
          });
  
          datasets.push({
            label: `${ageGroup} - Inactive Population`,
            data: inactivePopulationData,
            backgroundColor: getRandomColor(),
          });
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
                stacked: true,
                title: {
                  display: true,
                  text: 'Population',
                },
              },
              x: {
                stacked: true,
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
  