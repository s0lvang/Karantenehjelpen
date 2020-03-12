<template>
  <div class="item_container">
    <h4>Vare</h4>
    <TextInput labelText="" placeholderText="Varenavn.."/>
    <div class="item_counter">
      <h4>Antall</h4>
      -1 x +1
    </div>
    <Button btnText="Slett"
            @btnClicked="deleteItem"
            :btnDisabled="false"/>
  </div>
</template>

<script lang="ts">
import TextInput from '@/components/shared/TextInput.vue';
import Button from '@/components/shared/Button.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'Item',
  components: {
    TextInput,
    Button,
  },
  methods: {
    deleteItem() {
      this.$emit('deleteItem');
    },
  },
});
</script>

<style lang="scss" scoped>
.item_container{
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
