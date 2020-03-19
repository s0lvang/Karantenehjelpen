<template>
  <section>
    <h2>Tilgjengelige oppdrag</h2>
    <button
      @click="mapEnabled = !mapEnabled"
      class="toggle-map"
      :data-enabled="mapEnabled"
    >
      <icon name="map" />
      {{ mapEnabled ? "Skjul" : "Vis" }} kart
    </button>
    <section v-if="getRequests.length && this.mapEnabled">
      <AllRequestsMap
        :requests="getRequests"
        :locationCenter="[
          this.$store.getters.location.longitude || 10.395053, // Trondheim as fallback
          this.$store.getters.location.latitude || 63.41002
        ]"
      />
    </section>
    <section v-if="getRequests.length">
      <Request
        v-for="request in getRequests"
        :key="request.id"
        :request="request"
      />
    </section>
    <p v-if="!getRequests.length">
      Ingen tilgjengelige oppdrag akkurat nå…
    </p>
  </section>
</template>

<script>
import Request from "@/components/Request.vue";
import AllRequestsMap from "@/components/AllRequestsMap.vue";
import coordinateDistance from "@/helpers/coord";
import Icon from "@/components/shared/Icon.vue";

export default {
  name: "MyRequests",
  components: {
    Request,
    AllRequestsMap,
    Icon
  },
  data() {
    return {
      mapEnabled: false
    };
  },
  computed: {
    getRequests() {
      // All requests that are available or the ones owned by yourself.
      return (
        this.$store.getters.requests
          .filter(request => !request.delivered)
          .filter(
            request =>
              request.connectedUser === null ||
              this.$store.getters.email === request.connectedUser.email
          )
          // Here we want to sort by distance to ourselves.
          .sort(
            (
              {
                // destructure object into latitudes and longitudes
                address: {
                  center: [lng1, lat1] // what kind of sicko uses [lng, lat]
                }
              },
              {
                address: {
                  center: [lng2, lat2]
                }
              }
            ) => {
              const { latitude, longitude } = this.$store.getters.location;
              return (
                // distance from you to loc1 - distance from you to loc2 results in sorting based on distance from you (ASCending)
                coordinateDistance(latitude, longitude, lat1, lng1) -
                coordinateDistance(latitude, longitude, lat2, lng2)
              );
            }
          )
      );
    }
  }
};
</script>

<style lang="scss" scoped>
button.toggle-map {
  --blue: #0061a8;
  --light-blue: #007ed6;

  -webkit-appearance: none;

  background: none;
  color: #273e52;

  border-radius: 4px;
  border: 3px solid var(--blue);

  cursor: pointer;

  font-size: 1rem;

  margin-bottom: 1em;
  padding: 0.2rem 1rem;

  transition: background 0.2s, opacity 0.2s, border-color 0.2s;

  & * {
    vertical-align: center;
  }

  &:hover,
  &[data-enabled="true"] {
    background: var(--blue);
    color: white;
  }

  &[data-enabled="true"]:hover {
    background: var(--light-blue);
    border-color: var(--light-blue);
  }
}

section + section {
  margin-top: 1em;
}
</style>
