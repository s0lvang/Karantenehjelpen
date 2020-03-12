<template>
  <div class="container">
    <p>
      kart
    </p>
    <p>
      info
    </p>
    <Button
            btnText="Se forespørsel"
            @btnClicked="seeMore"
            :btnDisabled="false"
          />
  </div>
</template>

<script lang="ts">
import Button from '@/components/shared/Button.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'Request',
  components: {
    Button,
  },
  methods: {
    seeMore() {
      console.log('yee');
    },
  },
});
</script>

<style lang="scss" scoped>

.container{
  border: 1px solid black;
  display: flex;
  justify-content: space-evenly;
}

</style>
