<script>
import MarsHeader from './components/MarsHeader.vue'
import MarsMain from './components/MarsMain.vue'
import Loading from './components/Loading.vue'
export default {
  components:{
    MarsHeader,
    MarsMain,
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
  <header>
   
    <MarsHeader/>
  </header>

  <main>
    <MarsMain />
  </main>
</template>

<style scoped>
header{
  position:absolute;
  height:10vh;
  top:0;
  left:0;
  right:0;
  bottom:0;
  border-bottom: 1px solid rgb(122,149,138);
  color:rgba(0,0,0,.7);
}
main{
  position:absolute;
  height:90vh;
  top:10vh;
  left:0;
  right:0;
  bottom:0;
  overflow-y:hidden;
}
</style>
