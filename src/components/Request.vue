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
    <img v-if="userIsAssigned" src="@/assets/groceries.svg" />
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
  @include card;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}

h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

button {
  margin: 2rem auto 1rem;
}
</style>
