<script>
import Loading from './components/Loading.vue'
export default {
  components:{
    Loading
  },
  data(){
      return{
          isLoadingShow:false
      }
  },
  methods: {
    showLoading(){
      this.isLoadingShow = true
      
    },
    hideLoading(){
      this.isLoadingShow = false
    }
  },
  mounted(){
      this.emitter.on('showLoading',this.showLoading)
      this.emitter.on('hideLoading',this.hideLoading)
  }
}

</script>

<template>
  <Loading v-if="isLoadingShow"></Loading>

    <router-view></router-view>

</template>

<style scoped>

</style>
