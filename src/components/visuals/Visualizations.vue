<template>
    <div class="page">
        <h1> Kenya Population Projection</h1>

    <div class="chart">
      <canvas ref="myChartCanvas"></canvas>
    </div>

    <!-- population -->
    <div><PopulationBasedOnAge/></div>
    <!-- employment state -->
    <div><UnemployedPopulation/></div>
    <div><EmployedPopulation/></div>
    <!-- inactive -->
    <div><InactivePopulationBasedOnGender/></div>
    <div><LabourForceBasedOnGender/></div>
    <!-- economic activity -->
    <div><EconomicActivity/></div>
    <!-- transport ans storage sector -->
    <div><TransportAndStorage/></div>

    <!-- growth rate -->
   <div><GrowthRate/></div>

   <div><EducatedEmployed/></div>

</div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import Papa from 'papaparse';
  import Chart from 'chart.js/auto';
  import PopulationBasedOnAge from "./PopulationBasedOnAge.vue"
  import PopulationBetween2015To2024 from './PopulationBetween2015To2024.vue';
  import InactivePopulationBasedOnGender from './InactivePopulationBasedOnGender.vue';
  import LabourForce from "./LabourForce.vue";
  import LabourForceBasedOnGender from "./LabourForceBasedOnGender.vue"
  import UnemployedPopulation from './UnemployedPopulation.vue'
  import EmployedPopulation from './EmployedPopulation.vue'
  import EconomicActivity from './EconomicActivity.vue'
  import TransportAndStorage from './TransportAndStorage.vue'
  import GrowthRate from './GrowthRate.vue'
  import EducatedEmployed from "./EducatedEmployed.vue"
  export default {
     components:{
        PopulationBasedOnAge,
        PopulationBetween2015To2024,
        InactivePopulationBasedOnGender,
        LabourForce,
        LabourForceBasedOnGender,
        UnemployedPopulation,
        EmployedPopulation,
        EconomicActivity,
        TransportAndStorage,
        GrowthRate,
        EducatedEmployed

      },
    setup() {
      const myChartCanvas = ref(null);
     
  
      onMounted(() => {
        loadCSVAndCreateChart();
      });
  
      async function loadCSVAndCreateChart() {
        const response = await fetch('/visuals/Kenya.csv'); // Use the correct path to Kenya.csv
        const text = await response.text();
  
        const data = Papa.parse(text, { header: true }).data;
  
        const years = [...new Set(data.map(row => row.year))];
        const datasets = years.map(year => {
          return {
            label: year,
            data: data
              .filter(row => row.year === year)
              .map(row => parseFloat(row.population)),
            fill: false,
            borderColor: getRandomColor(),
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
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Population',
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
  /* Add your styles here */
  .chart{
    height: 80vh;
  }

  .page{
    height: 100vh;
    margin-left: 100px;
    margin-right: 100px;
  }
  </style>
  