<template>
  <div>
    <h3>
      {{ request.address.place_name_no }}
    </h3>
    <p>
      Handleliste:
    </p>
    <div>
      {{ getItemNames }}
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
    }
  }
};
</script>
