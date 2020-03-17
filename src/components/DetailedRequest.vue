<template>
  <div class="container mx-auto mt-3">
    <div class="flex flex-col items-center">
      <div>
        <Map :locationCenter="request.address.center" class />
        <a
          target="_blank"
          class="address"
          :href="
            `https://www.google.com/maps/dir/?api=1&destination=${request.address.place_name_no.replace(
              / /g,
              '+'
            )}&travelmode=driving`
          "
        >
          <p class="text-2xl p-2">{{ request.address.place_name_no }}</p>
        </a>

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
            <div class="ml-2">{{ request.email }}</div>
          </div>
          <div class="flex">
            <p class="font-bold">Telefon:</p>
            <div class="ml-2">{{ request.phoneNumber }}</div>
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
  computed: {}
};
</script>

<style lang="scss" scoped>
.address {
  color: #0060a3;
}
</style>
