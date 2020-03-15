<template>
  <div>
    <input v-model="input" type="text" @change="searchAddress">
    <div>
      <ul>
        <li
          v-for="location in locations"
          :key="location.id"
        >
          {{location.place_name_no}}
        </li>
      </ul>
    </div>
    {{locations}}
  </div>
</template>

<script>
/* eslint-disable prefer-rest-params */
/* eslint-disable import/extensions */
import fetchLocation from '@/services/fetchLocations.js';

export default {
  name: 'AddressInput',
  data() {
    return {
      locations: [],
      input: '',
    };
  },
  methods: {
    debounce(time = 1000) {
      setTimeout(this.getLocations, time);
    },
    async getLocations() {
      this.locations = await fetchLocation(this.input);
    },
    searchAddress() {
      this.getLocations();
    },
  },
  // watch: {
  //   input() {
  //     this.getLocations();
  //   },
  // },
};
</script>

<style lang="scss" scoped>
input {
    &[type=text],
    &[type=email],
    &[type=number],
    &[type=tel] {
      width: 90%;
      height: 5vh;
      border-radius: 0.3rem;
      border: 0.05rem solid black;
      margin-top: 0.3rem;
      font-size: 1rem;
      padding: 0 0 0 .5rem;
      display: flex;
    }
  }
</style>
