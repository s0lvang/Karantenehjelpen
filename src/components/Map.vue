<template>
  <div id="map">
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  name: 'Map',
  data() {
    return {
      map: undefined,
      adressMarker: undefined,
      key: 'pk.eyJ1IjoiYWRyaWFuaHQiLCJhIjoiY2s3c3dpeWtrMHR6cTNobXZxZDNjc2l4biJ9.zNJjCC7o0UmLMKv9mx93FQ',
      selectedAddress: [10.43917, 59.83306],
      markerTest: [10.000, 59.800],
    };
  },

  methods: {
    drawMap() {
      Mapbox.accessToken = this.key;
      this.map = new Mapbox.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        maxZoom: 22,
        minZoom: 0,
        zoom: 7,
        center: this.selectedAddress,
      });
    },

    drawMarker() {
      this.adressMarker = document.createElement('div');
      this.adressMarker.className = 'marker addressmarker';

      new Mapbox.Marker(this.adressMarker)
        .setLngLat(this.markerTest)
        .addTo(this.map);
    },
  },
  mounted() {
    this.drawMap();
    this.drawMarker();
  },
};
</script>

<style>
@import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css");
@import url("https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css");
#map {
    margin-right: auto;
    margin-left: auto;
    height: 300px !important;
}
#map.mapboxgl-map {
  width: 400px;
  height: 300px !important;
  margin-top: 0 !important;
}
.mapboxgl-canvas {
  width: 400px !important;
  height: 300px;
  margin-top: 0 !important;
}
canvas.mapboxgl-canvas {
  height: 300px !important;
  margin-top: 0 !important;
}

.marker {
  background-size: cover;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.storemarker {
  background-color: red;
}

.addressmarker {
  background-color: blue;
}
</style>
