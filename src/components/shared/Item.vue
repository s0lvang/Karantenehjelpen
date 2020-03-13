<template>
  <div class="main_container">
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
        <div class="item_counter" v-if="!item.added">
          <Button btnText="-1"
                  @btnClicked="decrementCount(index)"
                  :btnDisabled="false"
          />
          <h3>
            {{nrOfItems[index].count}}
          </h3>
          <Button btnText="+1"
                  @btnClicked="incrementCount(index)"
                  :btnDisabled="false"
          />
        </div>
        <p v-if="item.added">
          <b>Antall: </b> {{nrOfItems[index].count}}
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

<script>
import TextInput from '@/components/shared/TextInput.vue';
import Button from '@/components/shared/Button.vue';

export default {
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
    addItem(index) {
      this.$emit('addItem', index);
    },
    deleteItem(index) {
      this.$emit('deleteItem', index);
    },
    incrementCount(index) {
      this.$emit('incrementCount', index);
    },
    decrementCount(index) {
      this.$emit('decrementCount', index);
    },
    emitInputText(event, index) {
      const input = event.target.value;
      this.$emit('updateName', input, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.main_container{
  width: 100%
}
.item_container{
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
  align-items: center;
}
.item_counter{
  display: flex;
}
</style>
