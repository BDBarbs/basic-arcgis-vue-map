<template>
  <v-container fluid class="fill-height pa-1">
    <v-card flat rounded-lg class="fill-height w-100">
      <div id="viewDiv"></div>
      <v-btn
        id="button"
        width="200"
        prepend-icon="mdi-map"
        class="mt-2 mb-3 justify-center"
        size="small"
        @click="toggleFLayer"
      >
        Get FeatureLayer
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
/*
  Imports
 */
import { onMounted } from "vue";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

let featureLayer;

const geoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-96.7969, 32.7767],
      },
      properties: {
        CITY: "Dallas",
        PROGRAM: "Big D Belly Laughs",
        SBPRGRM: "Subprogram Snickers",
        IN_PROGRAM_NETWORK: 1,
        NAME: "Chuckles",
        ID: 2345678,
        SUPERTYPE: "Type LOL",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-96.7969, 32.7767],
      },
      properties: {
        CITY: "Dallas 2",
        PROGRAM: "Big D Belly Laughs 2",
        SBPRGRM: "Subprogram Snickers 2",
        IN_PROGRAM_NETWORK: 1,
        NAME: "Chuckles 2",
        ID: 2345679,
        SUPERTYPE: "Type LOL 2",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-97.0586, 33.2148],
      },
      properties: {
        CITY: "Denton",
        PROGRAM: "North Texas Nonsense",
        SBPRGRM: "Subprogram Snickers",
        IN_PROGRAM_NETWORK: 1,
        NAME: "Grins",
        ID: 8901234,
        SUPERTYPE: "Type ROFL",
      },
    },
  ],
};

const popupTemplate = {
  title: "Location",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "CITY",
          label: "City",
        },
        {
          fieldName: "PROGRAM",
          label: "Program",
        },
        {
          fieldName: "SBPRGRM",
          label: "Subprogram",
        },
        {
          fieldName: "NAME",
          label: "Name",
        },
      ],
    },
  ],
};

const map = new Map({
  basemap: "gray-vector",
});

// create a new blob from geojson featurecollection
const blob = new Blob([JSON.stringify(geoJSON)], {
  type: "application/json",
});

// URL reference to the blob
const url = URL.createObjectURL(blob);

// create new geojson layer using the blob url
const geoJsonLayer = new GeoJSONLayer({
  url,
  title: "In-Network Provider",
  outFields: ["*"],
  popupTemplate: popupTemplate,
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-marker",
      color: "#00897B",
      size: 12,
    },
  },
});

function toggleFLayer() {
  if (featureLayer === undefined) {
    const fLayerPopup = {
      title: "Counties",
      content: [
        {
          // Pass in the fields to display
          type: "fields",
          fieldInfos: [
            {
              fieldName: "NAME",
            },
            {
              fieldName: "STATE_NAME",
            },
          ],
        },
      ],
    };

    featureLayer = new FeatureLayer({
      url:
        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/AGP/Census/MapServer/2",
      popupTemplate: fLayerPopup,
      renderer: {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [255, 128, 0, 0.2],
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: "black",
          },
        },
      },
    });
    map.add(featureLayer);
    map.reorder(featureLayer, 0);
  } else {
    map.remove(featureLayer);
    featureLayer = undefined;
  }
}

onMounted(() => {
  const view = new MapView({
    container: "viewDiv",
    center: [-97, 33],
    zoom: 8,
    map: map,
  });
  map.add(geoJsonLayer);

  view.ui.add(document.getElementById("button"), "top-left");
});
</script>

<style scoped>
#viewDiv {
  height: 99vh;
  width: 100%;
}

</style>
