<template>
  <div>
    <input v-model="locationInput" type="text">
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
    {{locations}} <br/>
    {{locationInput}} <br/>
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
      locationInput: '',
    };
  },
  watch: {
    locationInput(newVal) {
      if (newVal === '') {
        return;
      }

      this.debounce(this.getLocations);
    },
  },
  methods: {
    // debounce(time = 1000) {
    //   setTimeout(this.getLocations, time);
    // },
    async getLocations() {
      const response = await fetchLocation(this.locationInput);
      if (response !== undefined && response !== null) {
        if (response.length === 0) {
          console.log('lengde 0');
        } else if (response.length === undefined) {
          console.log('lengde undefined');
        } else {
          this.locations = response;
        }
      }
    },
    debounce(functionName, time = 1000) {
      const functionCall = () => functionName.apply(this, arguments);
      setTimeout(functionCall, time);
    },
  },
  mounted() {
    // this.locations = fetchLocation('Tordenskiolds gate 17');
  },
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
