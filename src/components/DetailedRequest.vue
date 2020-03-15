<template>
  <div class="container mx-auto mt-3">
    <div class="flex flex-col items-center">
        <div>
          <p class="text-2xl p-2">
            {{request.address}}
          </p>

          <ul class="p-2">
            <li v-for="(item, index) in request.items" :key="index" class="break-words">
              - {{item.count}}x {{item.itemName}}
            </li>
          </ul>


          <div class="p-2">
            <h1 class="font-bold text-lg">
              Kontaktinformasjon
            </h1>
            <div class="flex">
              <p class="font-bold">
                Epost:
              </p>
              <div class="ml-2">
                {{request.email}}
              </div>
            </div>
            <div class="flex">
              <p class="font-bold">
                Telefon:
              </p>
              <div class="ml-2">
                {{"12345678"}}
              </div>
            </div>
            <div class="flex">
              <p class="font-bold">
                Betalingsmåte:
              </p>
              <div class="ml-2">
                {{request.paymentSolution}}
              </div>
            </div>
          </div>

          <p class="text-lg font-bold p-2">
            Ankomstbeskrivelse:
          </p>
          <div class="p-2 break-words">
            {{request.arrivalDescription}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'DetailedRequest',
  components: {
  },
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  methods: {
  },
  computed: {
  },
};
</script>
