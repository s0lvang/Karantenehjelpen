<template>
  <div class="request">
    <h3>
      {{ request.address.place_name_no }}
    </h3>
    <p v-if="showDistance">{{ distance.toFixed(2) }} km unna deg</p>
    <strong>
      Handleliste:
    </strong>
    <div>
      {{ getItems }}
    </div>
    <info v-if="userIsAssigned">Du har tatt dette oppdraget. Løp og kjøp!</info>
    <Button
      btnText="Se forespørsel"
      @btnClicked="seeMore"
      :btnDisabled="false"
    />
  </div>
</template>

<script>
import Button from "@/components/shared/Button.vue";
import Info from "@/components/shared/Info.vue";

import coordinateDistance from "@/helpers/coord";

export default {
  name: "Request",
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  components: {
    Button,
    Info
  },
  methods: {
    seeMore() {
      this.$router.push(`/request/${this.request.id}`);
    }
  },
  computed: {
    getItems() {
      return this.request.items
        .map(item => `${item.count}x ${item.itemName}`)
        .join(", ");
    },
    showDistance() {
      return this.$store.getters.showDistance;
    },
    distance() {
      return coordinateDistance(
        this.$store.getters.location.latitude,
        this.$store.getters.location.longitude,
        this.request.address.center[1],
        this.request.address.center[0],
        "K"
      );
    },
    userIsAssigned() {
      return (
        this.request.connectedUser &&
        this.request.connectedUser.email === this.$store.getters.email
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.request {
  position: relative;
  overflow: hidden;
  @include card;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}

h3 {
  font-size: 2rem;
  margin-bottom: 0;
}

button {
  margin: 1rem auto;
}
</style>
