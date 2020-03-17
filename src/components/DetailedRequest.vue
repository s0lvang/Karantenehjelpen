<template>
  <div class="container mx-auto mt-3">
    <div class="flex flex-col items-center">
      <div>
        <Map :locationCenter="request.address.center" class />
        <p class="text-2xl p-2">{{ request.address.place_name_no }}</p>

        <ul class="p-2">
          <li
            v-for="(item, index) in request.items"
            :key="index"
            class="break-words list-disc ml-4"
          >
            <span class="font-bold">{{ item.count }}x</span>
            {{
              item.itemName.charAt(0).toUpperCase() + item.itemName.substring(1)
            }}
          </li>
        </ul>

        <div class="p-2">
          <h1 class="font-bold text-lg">Kontaktinformasjon</h1>
          <div class="flex">
            <p class="font-bold">Epost:</p>
            <div class="ml-2">
              <a class="link" :href="getEmailLink">{{ request.email }}</a>
            </div>
          </div>
          <div class="flex">
            <p class="font-bold">Telefon:</p>
            <div class="ml-2">
              <a class="link" :href="getPhoneLink">{{ request.phoneNumber }}</a>
            </div>
          </div>
          <div class="flex">
            <p class="font-bold">Betalingsmåte:</p>
            <div class="ml-2">{{ request.paymentSolution }}</div>
          </div>
        </div>

        <p class="text-lg font-bold p-2">Ankomstbeskrivelse:</p>
        <div class="p-2 break-words">{{ request.arrivalDescription }}</div>
      </div>
    </div>
  </div>
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

<style scoped>
.link {
  color: #038df0;
}

.link:hover {
  text-decoration: underline;
}

.link:active {
  color: #004bac;
}
</style>
