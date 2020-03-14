<template>
  <div>
    <h2>Oppsummering</h2>
    <p><b>Adresse: </b>{{getAddress}}</p>
    <p><b>Ankomstbeskrivelse: </b>{{getArrivalDesc}}</p>
    <ul>
      <li v-for="(item, index) in getItems" :key="index">
        <b>Varenavn: </b>{{item.itemName}} - <b>Antall: </b> {{item.count}}
      </li>
    </ul>
    <Button btnText="Send Forespørsel" :btnDisabled="false" @btnClicked="createRequest"/>
    <Button btnText="Gå tilbake" :btnDisabled="false" @btnClicked="goBack"/>
  </div>
</template>

<script>
import Button from '@/components/shared/Button.vue';

export default {
  name: 'RequestSummary',
  components: {
    Button,
  },
  methods: {
    goBack() {
      this.$emit('goBack');
    },
    createRequest() {
      this.$emit('createRequest');
    },
  },
  computed: {
    getAddress() {
      return this.$store.getters.address;
    },
    getArrivalDesc() {
      return this.$store.getters.arrivalDescription;
    },
    getItems() {
      return this.$store.getters.items;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
