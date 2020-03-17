<template>
  <div class="container mx-auto border rounded-lg mt-3">
    <h3 class="text-2xl p-2">
      {{ request.address.place_name_no }}
    </h3>
    <p class="text-xl underline p-2">
      Handleliste:
    </p>
    <div class="p-2 truncate" v-html="getItems" />
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
    getItems() {
      return this.request.items
        .map(item => `<b>${item.count}x</b> ${item.itemName}`)
        .join(", ");
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
img {
  height: auto;
  width: 50px; // TODO: The placement of the icon should be fixed.
}
</style>
