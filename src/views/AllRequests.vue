<template>
  <section>
    <h2>Tilgjengelige oppdrag</h2>
    <Request
      v-for="request in getRequests"
      :key="request.id"
      :request="request"
    />
  </section>
</template>

<script>
import Request from "@/components/Request.vue";
import coordinateDistance from "@/helpers/coord";

export default {
  name: "MyRequests",
  components: {
    Request
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
