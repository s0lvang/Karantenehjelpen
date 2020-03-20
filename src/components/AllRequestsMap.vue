<template>
  <div id="all-requests-map"></div>
</template>

<script>
import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
function escapeHtml(unsafe) {
  if (typeof unsafe !== "string") {
    return unsafe;
  }

  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default {
  name: "AllRequestsMap",
  data() {
    return {
      map: undefined,
      key:
        "pk.eyJ1IjoiZnJlZHJpa21hbG1vIiwiYSI6ImNrN3VubHNtbTBrcTAza28zMDFibGUyZ3kifQ.7VE04Fs4XRbwIBoFwDVe0w",
      markers: []
    };
  },
  props: {
    locationCenter: {
      type: Array,
      required: true
    },
    /**
     * [ request ]
     */
    requests: Array
  },
  watch: {
    requests(props) {
      this.drawMarkers(props);
    }
  },
  methods: {
    drawMap() {
      Mapbox.accessToken = this.key;
      this.map = new Mapbox.Map({
        container: "all-requests-map",
        style: "mapbox://styles/mapbox/streets-v11",
        maxZoom: 22,
        minZoom: 0,
        zoom: 10,
        center: this.locationCenter
      });
    },
    drawMarkers(locs) {
      this.markers.forEach(m => m.remove());
      this.markers = locs.map(c => {
        const m = new Mapbox.Marker();
        // Create a popup and attach
        m.setLngLat(c.address.center);
        m.addTo(this.map);

        const popup = new Mapbox.Popup();
        popup.setHTML(`
        <strong>Handleliste</strong>
        <ul>
            ${c.items
              .map(
                i =>
                  `<li>${escapeHtml(i.count)}x ${escapeHtml(i.itemName)}</li>`
              )
              .join("")}
        </ul>
        <br>
        <a href="/request/${c.id}">Gå til annonse</a>
        `);

        m.setPopup(popup);

        return m;
      });
    }
  },
  mounted() {
    this.drawMap();
    this.drawMarkers(this.requests);
  }
};
</script>

<style lang="scss" scoped>
@import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css");
@import url("https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css");

.mapboxgl-marker.mapboxgl-marker-anchor-center svg g {
  fill: $color-primary;
}

#all-requests-map {
  margin: 1em auto 2em;
  position: relative;
  height: 65vh;
  z-index: 199;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
}

@media #{$tabletAndUp} {
  #all-requests-map {
    position: relative;
    margin-left: 0;
    left: unset;
    width: 100%;
  }
}

path,
.mapboxgl-marker {
  cursor: pointer !important;
}
</style>
