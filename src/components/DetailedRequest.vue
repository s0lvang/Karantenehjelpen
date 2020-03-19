<template>
  <section>
    <Map
      :address="request.address.place_name_no"
      :locationCenter="request.address.center"
    />
    <hr />
    <h3>Kontaktinformasjon</h3>
    <p v-if="isMyRequest">
      <icon name="email" />
      <a :href="getEmailLink">{{ request.email }}</a>
    </p>
    <p v-if="isMyRequest">
      <icon name="phone" />
      <a :href="getPhoneLink">{{ request.phoneNumber }}</a>
      <span v-if="isMe">
        Du kan endre ditt telefonnummer på
        <a href="/my-page">Min side</a>
      </span>
    </p>
    <p>
      <icon name="credit_card" />
      {{ request.paymentSolution }}
    </p>
    <p v-if="request.createdOn">
      <icon name="schedule" />
      {{ getFormattedCreatedOn }}
    </p>
    <p v-if="request.arrivalDescription">
      <icon name="directions_walk" />
      {{ request.arrivalDescription }}
    </p>

    <h3 v-if="request.items.length">Handleliste</h3>
    <ul v-if="request.items.length">
      <li v-for="(item, index) in request.items" :key="index">
        <strong>{{ item.count }}x</strong>
        {{ item.itemName.charAt(0).toUpperCase() + item.itemName.substring(1) }}
      </li>
    </ul>

    <h3 v-if="request.otherNeed">Annen henvendelse</h3>
    <p v-if="request.otherNeed">{{ request.otherNeed }}</p>
  </section>
</template>

<script>
import Map from "@/components/Map.vue";
import Icon from "@/components/shared/Icon.vue";

import formatDateTime from "@/helpers/datetime";

export default {
  name: "DetailedRequest",
  components: {
    Map,
    Icon
  },
  data() {
    return {
      localRequest: {}
    };
  },
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  methods: {
    getRequest() {
      const y = this.$store.getters.requests;
      const o = this.$route.params.id;
      this.localRequest = y.find(request => request.id === o);
    }
  },
  computed: {
    checkConnected() {
      return this.localRequest.email === this.$store.getters.email;
    },
    getPhoneLink() {
      return `tel:${this.request.phoneNumber}`;
    },
    getEmailLink() {
      return `mailto:${this.request.email}`;
    },
    getFormattedCreatedOn() {
      const { createdOn } = this.request;
      return createdOn && formatDateTime(createdOn.toDate());
    },
    isMyRequest() {
      if (!this.request.connectedUser) {
        return false;
      }

      return this.request.connectedUser.email === this.$store.getters.email;
    },
    isMe() {
      return this.request.email === this.$store.getters.email;
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  line-height: 1.5rem;

  & > strong {
    line-height: inherit;
    display: inline-block;
    width: 2rem;
  }
}

hr {
  margin: 0;
}

p > i {
  width: 2rem;
}

@media #{$tabletAndUp} {
  hr {
    display: none;
  }
}
</style>
