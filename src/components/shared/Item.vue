<template>
  <div class="container mx-auto p-3">
    <div v-for="(item, index) in nrOfItems" :key="index"
      class="flex flex-wrap mb-4 border rounded-lg"
    >
      <!-- <h4 class="self-center pl-8">Vare:</h4> -->
      <template v-if="!item.added">
        <TextInput
          labelText="Vare"
          placeholderText="Varenavn.."
          @emitInputText="emitInputText"
          :localIndex="index"
          class="w-2/3 pl-3 self-center"
        />
      </template>
      <section v-if="item.added" class="w-1/2 pl-3">
        <b>Vare:</b>
        <p class="break-words">
          {{nrOfItems[index].itemName}}
        </p>
      </section>
      <p v-if="item.added" class="w-1/2 text-center">
          <b>Antall:</b>
          {{nrOfItems[index].count}}
        </p>
      <div class="flex-end w-1/3 ">
        <p v-if="!item.added" class="text-center">Antall</p>
        <div class="flex" v-if="!item.added">
          <Button btnText="-1"
                  @btnClicked="decrementCount(index)"
                  :btnDisabled="false"
                  class="flex-1"
          />
          <h3 class="flex-1 text-center self-center">
            <b>{{nrOfItems[index].count}}</b>
          </h3>
          <Button btnText="+1"
                  @btnClicked="incrementCount(index)"
                  :btnDisabled="false"
                  class="flex-1"
          />
        </div>
      </div>
      <template v-if="!item.added">
        <Button btnText="Legg til"
                @btnClicked="addItem(index)"
                :btnDisabled="false"
                class="w-1/2"
        />
      </template>
      <Button btnText="Slett"
            @btnClicked="deleteItem(index)"
            :btnDisabled="false"
            class="w-auto pl-3"
            isDanger="true"
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
