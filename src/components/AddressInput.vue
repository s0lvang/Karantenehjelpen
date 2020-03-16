<template>
  <div
    class="container mx-auto flex flex-col
          pr-5 text-sm md:text-base lg:text-lg
    "
  >
    <label for="address_input">Addresse</label>
    <input
      v-model="locationInput"
      type="text"
      name="address_input"
      class="address_input"
      placeholder="Kongens slott"
    />
    <div>
      <Spinner :showSpinner="showSpinner" />
      <ul v-if="showList && locations.length > 1">
        <li
          class="autocomplete-element"
          v-for="location in locations"
          :key="location.id"
          @click="selectedLocation(location)"
        >
          {{ location.place_name_no }}
        </li>
      </ul>
    </div>
    <p v-if="showError">Noe gikk galt under henting av addresser</p>
  </div>
</template>

<script>
/* eslint-disable prefer-rest-params */
/* eslint-disable import/extensions */
import fetchLocation from "@/services/fetchLocations.js";
import Spinner from "@/components/shared/Spinner.vue";

export default {
  name: "AddressInput",
  components: {
    Spinner
  },
  data() {
    return {
      locations: [],
      input: "",
      locationInput: "",
      locationInput2: "",
      showList: true,
      showError: false,
      showSpinner: false
    };
  },
  watch: {
    locationInput(newVal) {
      if (newVal === "") {
        return;
      }
      this.showError = false;
      const locMap = this.locations.map(x => x.place_name_no);
      if (!locMap.includes(this.locationInput)) {
        this.showSpinner = true;
        this.debounce(this.getLocations);
      }
    }
  },
  methods: {
    async getLocations() {
      this.showList = true;
      this.showSpinner = false;
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
    },
    debounce(functionName, time = 1000) {
      const functionCall = () => functionName.apply(this, arguments);
      setTimeout(functionCall, time);
    },
    selectedLocation(location) {
      this.locationInput = location.place_name_no;
      this.showList = false;
      this.$store.dispatch("SET_ADDRESS", location);
    }
  }
};
</script>

<style lang="scss" scoped>
.input_label {
  align-self: flex-start;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  color: rgb(0, 96, 163);
}
.address_input {
  &[type="text"] {
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
    padding: 0.625em 1em;
    font-size: 1em;
    color: rgb(42, 39, 34);
    border: 1px solid rgb(241, 241, 241);
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
  color: rgb(0, 96, 163);
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
