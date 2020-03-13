<template>
  <div class="req_container">
    <section>
      <LogoutButton />
    </section>
    <template v-if="step === 1">
      <CreateRequest @toSummary="toSummary"/>
    </template>
    <template v-if="step === 2">
      <RequestSummary @goBack="goBack"/>
    </template>
  </div>
</template>

<script>
import CreateRequest from '@/components/CreateRequest.vue';
import RequestSummary from '@/components/RequestSummary.vue';
import LogoutButton from '@/components/LogoutButton.vue';


export default {
  name: 'CreateRequestView',
  components: {
    CreateRequest,
    RequestSummary,
    LogoutButton,
  },
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    toSummary() {
      this.step += 1;
    },
    goBack() {
      this.step -= 1;
    },
  },
};
</script>

<style lang="scss" scoped>

@media (min-width: 768px) and (max-width: 1025px){
  .req_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: auto;
  }
}


@media (max-width: 767px){
  .req_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}


@media (min-width: 1026px){
  .req_container{
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }
}

</style>
