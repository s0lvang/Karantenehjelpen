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
      <Button
        btnText="Endre"
        :btnDisabled="false"
        v-if="resolvedValue"
        @btnClicked="goToEdit"
      />
    </div>
  </div>
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
      return x.email === this.$store.getters.email;
    }
  }
};
</script>
