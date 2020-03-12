<template>
  <div>
    <div v-for="(item, index) in nrOfItems" :key="index" class="item_container">
      <h4>Vare:</h4>
      <template v-if="!item.added">
        <TextInput
          labelText=""
          placeholderText="Varenavn.."
          @emitInputText="emitInputText"
          :localIndex="index"
        />
      </template>
      <p v-if="item.added">
        {{nrOfItems[index].itemName}}
      </p>
      <div >
        <h4>Antall</h4>
        <div class="item_counter" v-if="!item.added">
          <Button btnText="-1"
                  @btnClicked="decrementCount(index)"
                  :btnDisabled="false"
          />
          <p>
            {{nrOfItems[index].count}}
          </p>
          <Button btnText="+1"
                  @btnClicked="incrementCount(index)"
                  :btnDisabled="false"
          />
        </div>
        <p v-if="item.added">
          {{nrOfItems[index].count}}
        </p>
      </div>
      <template v-if="!item.added">
        <Button btnText="Legg til"
                @btnClicked="addItem(index)"
                :btnDisabled="false"
        />
      </template>
      <Button btnText="Slett"
            @btnClicked="deleteItem(index)"
            :btnDisabled="false"
      />
    </div>
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
  data() {
    return {
      enableNew: false,
      count: 1,
      itemName: '',
    };
  },
  props: {
    nrOfItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addItem(index: number) {
      this.$emit('addItem', index);
    },
    deleteItem(index: number) {
      this.$emit('deleteItem', index);
    },
    incrementCount(index: number) {
      this.$emit('incrementCount', index);
    },
    decrementCount(index: number) {
      this.$emit('decrementCount', index);
    },
    emitInputText(event: HTMLFormElement, index: number) {
      const input = event.target.value;
      this.$emit('updateName', input, index);
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
.item_counter{
  display: flex;
}
</style>
