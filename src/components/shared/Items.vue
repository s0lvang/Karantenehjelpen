<template>
  <div class="grid">
    <hr />
    <h3>Handleliste</h3>
    <div class="item" v-for="(item, index) in nrOfItems" :key="index">
      <div class="split-row" v-if="item.added">
        <div>
          <strong>Vare:</strong>
          <p>{{ nrOfItems[index].itemName }}</p>
        </div>
        <div>
          <strong>Antall:</strong>
          <p>
            {{ nrOfItems[index].count }}
          </p>
        </div>
        <Button
          btnText="Slett"
          @btnClicked="deleteItem(index)"
          :btnDisabled="false"
          isDanger="true"
        />
      </div>

      <div class="split-row" v-if="!item.added">
        <TextInput
          v-if="!item.added"
          labelText="Vare"
          placeholderText="Varenavn.."
          @emitInputText="emitInputText"
          :localIndex="index"
        />
        <div>
          <strong>Antall</strong>
          <div class="split-row-amount">
            <Button
              btnText="-1"
              @btnClicked="decrementCount(index)"
              :btnDisabled="false"
            />
            <p class="amount">{{ nrOfItems[index].count }}</p>
            <Button
              btnText="+1"
              @btnClicked="incrementCount(index)"
              :btnDisabled="false"
            />
          </div>
        </div>
        <Button
          btnText="Legg til"
          @btnClicked="addItem(index)"
          :btnDisabled="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/shared/TextInput.vue";
import Button from "@/components/shared/Button.vue";

export default {
  name: "Items",
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
.item:not(:first-child) {
  margin-top: 1rem;
}

.split-row {
  display: grid;
  align-items: flex-end;
  grid-template-columns: 33% 33% auto;
}

.split-row-amount {
  display: flex;
  align-items: center;
}

.amount {
  font-size: 2rem;
  margin: 0 1rem;
}

button {
  width: fit-content;
  justify-self: flex-end;
}

strong {
  line-height: 1.5;
  margin-bottom: 0.25rem;
}
</style>
