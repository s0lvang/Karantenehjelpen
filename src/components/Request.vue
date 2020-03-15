<template>
  <div class="container mx-auto border rounded-lg mt-3">
    <h3 class="text-2xl p-2">
      {{request.address}}
    </h3>
    <p class="text-xl underline p-2">
      Handleliste:
    </p>
    <div class="p-2 truncate">
    {{getItemNames}}
    </div>
    <Button
      btnText="Se forespørsel"
      @btnClicked="seeMore"
      :btnDisabled="false"
    />
  </div>
</template>

<script>
import Button from '@/components/shared/Button.vue';

export default {
  name: 'Request',
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  components: {
    Button,
  },
  methods: {
    seeMore() {
      this.$router.push(`/request/${this.request.id}`);
    },
  },
  computed: {
    getItemNames() {
      return this.request.items.map((item) => item.itemName).join(', ');
    },
  },
};
</script>
