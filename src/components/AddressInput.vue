<template>
  <div>
    <label for="address_input">Addresse</label>
    <input v-model="locationInput" type="text" name="address_input">
    <div>
      <ul class='field-autocomplete' v-if="showList && locations.length > 1">
        <li
          class="autocomplete-element"
          v-for="location in locations"
          :key="location.id"
          @click="selectedLocation(location)"
        >
          {{location.place_name_no}}
        </li>
      </ul>
    </div>
    <p v-if="showError">Noe gikk galt under henting av addresser</p>
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
      locationInput2: '',
      showList: true,
      showError: false,
    };
  },
  watch: {
    locationInput(newVal) {
      if (newVal === '') {
        return;
      }
      this.showList = true;
      this.showError = false;
      this.debounce(this.getLocations);
    },
  },
  methods: {
    async getLocations() {
      if (this.locationInput !== this.locationInput2) {
        const response = await fetchLocation(this.locationInput);
        if (response !== undefined && response !== null) {
          if (response.length === 0) {
            this.showError = true;
          } else if (response.length === undefined) {
            this.showError = true;
          } else {
            this.showError = false;
            this.locations = response;
          }
        }
      }
    },
    debounce(functionName, time = 1000) {
      const functionCall = () => functionName.apply(this, arguments);
      setTimeout(functionCall, time);
    },
    selectedLocation(location) {
      this.showList = false;
      this.locationInput = location.place_name_no;
      this.locationInput2 = location.place_name_no;
      this.showList = false;
      this.$store.dispatch('SET_ADDRESS', location);
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
.field-autocomplete {
    border: 0.06rem solid grey;
    border-radius: 0.3rem;
    list-style-type: none;
    padding: 0 1rem 0 1rem;
  }
  .autocomplete-element {
    text-align: left;
    margin-top: 0.4rem;
    border-bottom: 0.08rem solid lightslategrey;
    overflow: hidden;
    white-space: nowrap;
  }
  .autocomplete-element:hover {
    color: blue;
    cursor: pointer;
  }
  .autocomplete-element:last-child {
    border: 0;
    margin-bottom: 0.4rem;
  }
  .autocomplete-container {
    margin-left: 1rem/2;
    width: 100%;
    margin-top: -1rem;
}
</style>
