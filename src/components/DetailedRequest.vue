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
    <p><strong>Epost:</strong><a class="link" :href="getEmailLink">{{ request.email }}</a></p>
    <p><strong>Telefon:</strong><a class="link" :href="getPhoneLink">{{ request.phoneNumber }}</a></p>
    <p><strong>Betalingsmåte:</strong> {{ request.paymentSolution }}</p>

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

export default {
  name: "DetailedRequest",
  components: {
    Map
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

.link {
  color: #038df0;
}

.link:hover {
  text-decoration: underline;
}

.link:active {
  color: #004bac;
}

hr {
  margin: 0;
}

@media #{$tabletAndUp} {
  hr {
    display: none;
  }
}
</style>
