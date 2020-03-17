<template>
  <div id="map">
    <a
      target="_blank"
      class="address"
      :href="
        `https://www.google.com/maps/dir/?api=1&destination=${address.replace(
          / /g,
          '+'
        )}&travelmode=driving`
      "
    >
      <icon name="directions" />
      <p>{{ address }}</p>
    </a>
  </div>
</template>

<script>
import Icon from "@/components/shared/Icon.vue";

import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  name: "Map",
  data() {
    return {
      map: undefined,
      adressMarker: undefined,
      key:
        "pk.eyJ1IjoiZnJlZHJpa21hbG1vIiwiYSI6ImNrN3VubHNtbTBrcTAza28zMDFibGUyZ3kifQ.7VE04Fs4XRbwIBoFwDVe0w",
      selectedAddress: this.locationCenter,
      markerPlace: this.locationCenter
    };
  },
  props: {
    locationCenter: {
      type: Array,
      required: true
    },
    address: String
  },
  components: {
    Icon
  },
  methods: {
    drawMap() {
      Mapbox.accessToken = this.key;
      this.map = new Mapbox.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        maxZoom: 22,
        minZoom: 0,
        zoom: 12,
        center: this.selectedAddress
      });
    },

    drawMarker() {
      new Mapbox.Marker().setLngLat(this.markerPlace).addTo(this.map);
    }
  },
  mounted() {
    this.drawMap();
    this.drawMarker();
  }
};
</script>

<style lang="scss" scoped>
@import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css");
@import url("https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css");
#map {
  margin-top: -1 * $vertical-space;
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  height: 20rem !important;

  a {
    display: flex;
    position: absolute;
    background: white;
    width: 100%;
    margin: 0;
    bottom: 0;
    padding: 1rem 2rem;
    z-index: 10;

    i {
      margin-right: 0.25rem;
    }
  }
}

.mapboxgl-marker.mapboxgl-marker-anchor-center svg g {
  fill: $color-primary;
}

@media #{$tabletAndUp} {
  #map {
    margin-top: -1 * $vertical-space-large;

    a {
      width: auto;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.25rem;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  }
}
</style>
