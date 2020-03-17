<template>
  <div>
    <label for="address_input">Addresse</label>
    <div class="spinnerWrapper">
      <input
        v-model="locationInput"
        type="text"
        name="address_input"
        :placeholder="this.checkAddress"
        :class="inEdit"
      />
      <Spinner :showSpinner="showSpinner" />
    </div>
    <ul class="suggestions" v-if="showList && locations.length > 1">
      <li
        class="suggestion"
        v-for="location in locations"
        :key="location.id"
        @click="selectedLocation(location)"
      >
        {{ location.place_name_no }}
      </li>
    </ul>
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
  props: {
    existing: String,
    inEdit: String
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
  },
  computed: {
    checkAddress() {
      return this.existing || "Kongens slott";
    }
  }
};
</script>

<style lang="scss" scoped>
.spinnerWrapper {
  position: relative;
}
input[type="text"] {
  max-width: none;
  &.true {
    opacity: 1;
  }
}
.suggestions {
  border: 1px solid $color-background-contrast;
  background: white;
  padding: 0.5rem 1rem;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  & > * + * {
    margin-top: 0.5rem;
    border-top: 1px solid $color-background-contrast;
  }
}
.suggestion {
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.1s;

  &:hover {
    color: $color-primary;
  }
}

.spinner {
  position: absolute;
  top: 50%;
  right: 0;
  width: 2rem;
  height: 2rem;
  transform: translate(-50%, -50%);

  &::before {
    width: 2rem;
    height: 2rem;
  }
}
</style>
