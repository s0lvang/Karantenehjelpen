<template>
  <div class="container">
    <div v-for="(item, index) in nrOfItems" :key="index">
      <template v-if="!item.added">
        <TextInput
          labelText="Vare"
          placeholderText="Varenavn.."
          @emitInputText="emitInputText"
          :localIndex="index"
        />
      </template>
      <section v-if="item.added">
        <b>Vare:</b>
        <p>
          {{ nrOfItems[index].itemName }}
        </p>
      </section>
      <p v-if="item.added">
        <b>Antall:</b>
        {{ nrOfItems[index].count }}
      </p>
      <div>
        <p v-if="!item.added">Antall</p>
        <div v-if="!item.added">
          <Button
            btnText="-1"
            @btnClicked="decrementCount(index)"
            :btnDisabled="false"
          />
          <h3>
            <b>{{ nrOfItems[index].count }}</b>
          </h3>
          <Button
            btnText="+1"
            @btnClicked="incrementCount(index)"
            :btnDisabled="false"
          />
        </div>
      </div>
      <template v-if="!item.added">
        <Button
          btnText="Legg til"
          @btnClicked="addItem(index)"
          :btnDisabled="false"
        />
      </template>
      <Button
        btnText="Slett"
        @btnClicked="deleteItem(index)"
        :btnDisabled="false"
        isDanger="true"
      />
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/shared/TextInput.vue";
import Button from "@/components/shared/Button.vue";

export default {
  name: "Item",
  components: {
    TextInput,
    Button
  },
  data() {
    return {
      enableNew: false,
      count: 1,
      itemName: ""
    };
  },
  props: {
    nrOfItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    addItem(index) {
      this.$emit("addItem", index);
    },
    deleteItem(index) {
      this.$emit("deleteItem", index);
    },
    incrementCount(index) {
      this.$emit("incrementCount", index);
    },
    decrementCount(index) {
      this.$emit("decrementCount", index);
    },
    emitInputText(event, index) {
      const input = event.target.value;
      this.$emit("updateName", input, index);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  @include card;
}
</style>
