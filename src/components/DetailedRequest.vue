<template>
  <div>
    <p><b>Adresse: </b>{{request.address}}</p>
    <p><b>Ankomstbeskrivelse: </b>{{request.arrivalDescription}}</p>
    <ul>
      <li v-for="(item, index) in request.items" :key="index">
        <b>Varenavn: </b>{{item.itemName}} - <b>Antall: </b> {{item.count}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DetailedRequest',
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  components: {
  },
  methods: {
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
