<template>
    <div class="all-container">
        <div>all-container</div>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
  export default {
    name: 'allcontainer',
    components: {
        // 'temp': () => import('@components/temp')
    },
    data() {
      return {}
    },
    computed: {},
    created() {
      console.log("allcontainer created")
    },
    mounted() {
      
    },
    methods: {}
  }
</script>

<style lang="css" scoped>
  .all-container {
    position: relative;
  }
</style>