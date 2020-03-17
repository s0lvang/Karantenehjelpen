<template>
  <div class="request">
    <div class="heading">
      <h3>
        {{ request.address.place_name_no }}
      </h3>
      <p>{{ distance.toFixed(2) }} km unna deg</p>
      <span v-if="userIsAssigned" class="badge">
        <img src="@/assets/groceries.svg" />
      </span>
    </div>
    <strong>
      Handleliste:
    </strong>
    <div>
      {{ getItems }}
    </div>
    <Button
      btnText="Se forespørsel"
      @btnClicked="seeMore"
      :btnDisabled="false"
    />
  </div>
</template>

<script>
import Button from "@/components/shared/Button.vue";
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
    Button
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

.heading {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  p {
    display: block;
    width: 100%;
    margin-bottom: 1em;
  }
}

.badge {
  background: $color-primary;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 50%;

  img {
    width: 2rem;
    height: 2rem;
  }
}

button {
  margin: 2rem auto 1rem;
}

@media #{$tabletAndUp} {
  .badge {
    width: 5rem;
    height: 5rem;

    img {
      width: 3rem;
      height: 3rem;
    }
  }
}
</style>
