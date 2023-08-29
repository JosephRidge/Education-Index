<template>
    <div>
      <l-map
      use-global-leaflet
        style="height:100vh; width:100vw; "
        class="relative"
        :zoom="zoom"  
        :options="{ zoomControl: true }"
        bounds="bounds"
      @ready="onLeafletReady"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
  
        <l-polygon
        :lat-lngs="Rwanda"
        color="#0ffffff"
        :fill="true"
        :fillOpacity="0.5"
        fillColor="#FF9F1C"
        class="rounded"
      ></l-polygon>
      </l-map> 
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { 
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPopup,
  LPolygon, 
} from "@vue-leaflet/vue-leaflet"; 
  import {KenyaGeoFence, GhanaGeoFence, RwandaGeoFence} from "./locations"

  export default {
    props: ["data"],
    components: {
      LMap, 
      LTileLayer,
      LMarker,
      LTooltip,
    },
    data() {
      return {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        markerLatLng: [51.504, -0.159],
        iconWidth: 45,
        iconHeight: 40,
        zoom:10,
        iconSize: 64,
        Kenya: KenyaGeoFence,
        Rwanda: RwandaGeoFence,
        Ghana: GhanaGeoFence,
        center: [-0.023559, 37.906193],
        centerboundsOfKenya: [-0.023559, 37.906193],
        southWestKenya: [-4.8995204, 33.9098987],
        northEastKenya: [4.62, 41.899578],
        bounds: [
          [-4.8995204, 33.9098987],
          [4.62, 41.899578],
        ],
        numberOfPeopleInNeed: 100,
        responses: 80,
      };
    },
    methods: { 
    },
    async beforeMount() {
      this.mapIsReady = true;
    },
  
    mounted() {
      // this.getData()
    },
  };
  </script>
  
  <style></style>