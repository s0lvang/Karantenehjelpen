<template>
  <div class="container">
    <h3>
      {{request.address}}
    </h3>
    <p><b> Handleliste: </b>
    {{getItemNames}}
    </p>
    <Button
      btnText="Se forespørsel"
      @btnClicked="seeMore"
      :btnDisabled="false"
    />
  </div>
</template>

<script>
import Button from '@/components/shared/Button.vue';

export default {
  name: 'Request',
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  components: {
    Button,
  },
  methods: {
    seeMore() {
      this.$router.push(`/request/${this.request.id}`);
    },
  },
  computed: {
    getItemNames() {
      return this.request.items.map((item) => item.itemName).join(', ');
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid black;
  display: flex;
  justify-content: space-evenly;
}
</style>
