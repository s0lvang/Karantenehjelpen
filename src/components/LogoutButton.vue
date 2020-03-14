<template>
  <Button @btnClicked="logout" btnText="Logg ut" :btnDisabled="false" />
</template>

<script>
import Button from '@/components/shared/Button.vue';
import fb from 'firebase';

export default {
  name: 'Logout',
  components: {
    Button,
  },
  methods: {
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('SET_CURRENT_USER', null);
          this.$router.push('/login');
        })
        .catch((error) => {
          console.log(`something went wrong ${error.message}`);
        });
    },
  },
};
</script>

<style></style>
