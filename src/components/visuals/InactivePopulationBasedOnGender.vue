<template>
    <div>
      <h1>Inactive Population based on Age & Gender during 2015-2024 </h1>
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
        const response = await fetch('/visuals/inactive_population.csv'); // Use the correct path to your CSV file
        const text = await response.text();
   const data = Papa.parse(text, { header: true }).data;
  
        const years = [...new Set(data.map(row => row.year))];
        const ageGroups = [...new Set(data.map(row => row.age_group))];
        const genders = [...new Set(data.map(row => row.sex))];
  
        const datasets = [];
        genders.forEach(gender => {
      const genderDatasets = ageGroups.map(ageGroup => {
        const label = `${ageGroup} - ${gender}`;
        const dataPoints = years.map(year => {
          const row = data.find(item => item.year === year && item.age_group === ageGroup && item.sex === gender);
          return row ? parseFloat(row.total_inactive_population) : 0;
        });
  
        // Check if any data point exists for the dataset
        if (dataPoints.some(total_inactive_population => total_inactive_population !== 0)) {
          return {
            label: label,
            data: dataPoints,
            backgroundColor: getRandomColor(),
          };
        }
      }).filter(dataset => dataset !== undefined); // Remove undefined datasets
  
      datasets.push(...genderDatasets);
    });
  
        new Chart(myChartCanvas.value, {
          type: 'bar', // Use a grouped bar chart
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
                stacked: true, // Enable stacking for grouped bars
                title: {
                  display: true,
                  text: 'Population',
                },
              },
              x: {
                stacked: true, // Enable stacking for grouped bars
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