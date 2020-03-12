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

<script>
import Button from '@/components/shared/Button.vue';

export default {
  name: 'Request',
  components: {
    Button,
  },
  methods: {
    seeMore() {
      console.log('yee');
    },
  },
};
</script>

<style lang="scss" scoped>

.container{
  border: 1px solid black;
  display: flex;
  justify-content: space-evenly;
}

</style>
