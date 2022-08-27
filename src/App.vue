<script>
import MarsHeader from './components/MarsHeader.vue'
import MarsMain from './components/MarsMain.vue'
import MarsFooter from './components/MarsFooter.vue'
import Loading from './components/Loading.vue'
export default {
  components:{
    MarsHeader,
    MarsMain,
    MarsFooter,
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
  <footer>
     <MarsFooter/>
  </footer>
</template>

<style scoped>
header{
  position:absolute;
  height:8%;
  top:0;
  left:0;
  right:0;
  bottom:0;
  border-bottom: 1px solid rgb(122,149,138);
  color:rgba(0,0,0,.7);
}
main{
  position:absolute;
  height:84%;
  top:8vh;
  left:0;
  right:0;
  bottom:0;
  overflow-y:hidden;
}
footer{
  width:100%;
  height:8%;
  position: absolute;
  bottom:0;
  left:0;
}
</style>
