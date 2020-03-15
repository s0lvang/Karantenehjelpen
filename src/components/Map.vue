<template>
  <div id="map" >
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
      selectedAddress: this.locationCenter,
      markerTest: this.locationCenter,
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
    height: 300px !important;
}
.marker {
  background-size: cover;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.addressmarker {
  background-color: blue;
}
</style>
