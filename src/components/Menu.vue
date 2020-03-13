<template>
  <div class="menu_container">
    <template >
      <a class="burger-container" @click="menuClick">
        <span class="burger-bun-top"></span>
        <span class="burger-filling"></span>
        <span class="burger-bun-bot"></span>
      </a>
    </template>
    <template v-if="showMenu">
      <h2>Tilgjengelige oppdrag</h2>
      <section>
        <h3>Frisk hjelper:</h3>
        <Button
          btnText="Oppdragslisten"
          :btnDisabled="false"
          @btnClicked="toAllRequests"
        />
        <!-- <Button
          btnText="Mine Oppdrag"
          :btnDisabled="false"
          @btnClicked="toMyRequests"
        /> -->
      </section>
      <section>
        <h3>I karantene:</h3>
        <!-- <Button
          btnText="Mine bestillinger"
          :btnDisabled="false"
        /> -->
        <Button
          btnText="Ny bestilling"
          :btnDisabled="false"
          @btnClicked="newRequest"
        />
      </section>
      <section>
        <Button
          btnText="Min Bruker"
          :btnDisabled="false"
          @btnClicked="goToUser"
        />
      </section>
      <section>
        <LogoutButton />
      </section>
    </template>
  </div>
</template>

<script>
import Button from '@/components/shared/Button.vue';
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  name: 'Menu',
  components: {
    Button,
    LogoutButton,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toAllRequests() {
      this.$router.push('all-requests');
    },
    newRequest() {
      this.$router.push('create-request');
    },
    goToUser() {
      console.log('implement this');
    },
    menuClick() {
      if (this.showMenu) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    },
  },

};
</script>
<style lang="scss" scoped>
.menu_container{
  position: absolute;
  float: left;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 20%;
  float: left;
}

.burger-bun-top,
.burger-bun-bot,
.burger-filling {
  display: block;
  height: 4px;
  width: 36px;
  border-radius: 2px;
  background: rgb(0, 96, 163);;
  margin-bottom: 4px;
}
</style>
