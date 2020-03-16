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
      key: 'pk.eyJ1IjoiZnJlZHJpa21hbG1vIiwiYSI6ImNrN3VubHNtbTBrcTAza28zMDFibGUyZ3kifQ.7VE04Fs4XRbwIBoFwDVe0w',
      selectedAddress: this.locationCenter,
      markerPlace: this.locationCenter,
    };
  },
  props: {
    locationCenter: {
      type: Array,
      required: true,
    },
  },

  methods: {
    drawMap() {
      Mapbox.accessToken = this.key;
      this.map = new Mapbox.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        maxZoom: 22,
        minZoom: 0,
        zoom: 12,
        center: this.selectedAddress,
      });
    },

    drawMarker() {
      new Mapbox.Marker()
        .setLngLat(this.markerPlace)
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
    height: 300px !important;
}

.mapboxgl-marker.mapboxgl-marker-anchor-center svg g{
  fill: rgb(0, 96, 163);
}
</style>
