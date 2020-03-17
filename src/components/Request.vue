<template>
  <div class="request">
    <h3>
      {{ request.address.place_name_no }}
    </h3>
    <strong>
      Handleliste:
    </strong>
    <div>
      {{ getItemNames }}
    </div>
    <Button
      btnText="Se forespørsel"
      @btnClicked="seeMore"
      :btnDisabled="false"
    />
    <span v-if="userIsAssigned" class="badge">
      <img src="@/assets/groceries.svg" />
    </span>
  </div>
</template>

<script>
import Button from "@/components/shared/Button.vue";

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
    getItemNames() {
      return this.request.items.map(item => item.itemName).join(", ");
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
  margin-bottom: 1rem;
}

.badge {
  position: absolute;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: $color-primary;
  width: 5rem;
  height: 5rem;
  padding: 1rem;
  border-radius: 50%;

  img {
    width: 3rem;
  }
}

button {
  margin: 2rem auto 1rem;
}
</style>
