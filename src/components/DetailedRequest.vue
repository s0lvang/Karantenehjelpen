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
      <strong>Epost: </strong>
      <a :href="getEmailLink">{{ request.email }}</a>
    </p>
    <p>
      <strong>Telefon: </strong>
      <a :href="getPhoneLink">{{ request.phoneNumber }}</a>
    </p>
    <p><strong>Betalingsmåte: </strong>{{ request.paymentSolution }}</p>

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
import Button from "@/components/shared/Button.vue";

export default {
  name: "DetailedRequest",
  components: {
    Map,
    Button
  },
  data() {
    return {
      connectedUser: false
    };
  },
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToEdit() {
      this.$router.push(`/edit/${this.request.id}`);
    },
    getRequest() {
      return new Promise(resolve => {
        resolve(
          this.$store.getters.requests.find(
            request => request.id === this.$route.params.id
          )
        );
      });
    }
  },
  asyncComputed: {
    async resolvedValue() {
      const x = await this.getRequest();
      if (x.connectedUser) {
        this.connectedUser = true;
      }
      return x.email === this.$store.getters.email;
    }
  },
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

@media #{$tabletAndUp} {
  hr {
    display: none;
  }
}
</style>
