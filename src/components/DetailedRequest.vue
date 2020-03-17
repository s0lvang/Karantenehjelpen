<template>
  <section>
    <Map
      :address="request.address.place_name_no"
      :locationCenter="request.address.center"
    />
    <hr />
    <h3>
      Kontaktinformasjon
    </h3>
    <p>
      <icon name="email" />
      <a :href="getEmailLink">{{ request.email }}</a>
    </p>
    <p>
      <icon name="phone" />
      <a :href="getPhoneLink">{{ request.phoneNumber }}</a>
    </p>
    <p><icon name="credit_card" /> {{ request.paymentSolution }}</p>

    <h3>Handleliste</h3>
    <ul>
      <li v-for="(item, index) in request.items" :key="index">
        <strong>{{ item.count }}x</strong>
        {{ item.itemName.charAt(0).toUpperCase() + item.itemName.substring(1) }}
      </li>
    </ul>

    <h3>Ankomstbeskrivelse</h3>
    <p>{{ request.arrivalDescription }}</p>
  </section>
</template>

<script>
import Map from "@/components/Map.vue";
import Icon from "@/components/shared/Icon.vue";

export default {
  name: "DetailedRequest",
  components: {
    Map,
    Icon
  },
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  methods: {},
  computed: {
    getPhoneLink() {
      return `tel:${this.request.phoneNumber}`;
    },
    getEmailLink() {
      return `mailto:${this.request.email}`;
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
