<template>
  <div>
    <div>
      <div>
        <Map :locationCenter="request.address.center" />
        <p>
          {{ request.address.place_name_no }}
        </p>

        <ul>
          <li v-for="(item, index) in request.items" :key="index">
            <span>{{ item.count }}x</span>
            {{
              item.itemName.charAt(0).toUpperCase() + item.itemName.substring(1)
            }}
          </li>
        </ul>

        <div>
          <h1>
            Kontaktinformasjon
          </h1>
          <div>
            <p>
              Epost:
            </p>
            <div>
              {{ request.email }}
            </div>
          </div>
          <div>
            <p>
              Telefon:
            </p>
            <div>
              {{ "12345678" }}
            </div>
          </div>
          <div>
            <p>
              Betalingsmåte:
            </p>
            <div>
              {{ request.paymentSolution }}
            </div>
          </div>
        </div>

        <p>
          Ankomstbeskrivelse:
        </p>
        <div>
          {{ request.arrivalDescription }}
        </div>
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
