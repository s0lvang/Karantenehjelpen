<template>
  <div class="req_container">
    <CreateRequest />
  </div>
</template>

<script>
import CreateRequest from '@/components/CreateRequest.vue';

export default {
  name: 'CreateRequestView',
  components: {
    CreateRequest,
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
