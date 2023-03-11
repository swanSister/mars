<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    return {
     
    }
  },
  components:{
   
  },
  methods: {
   goToShop(){
    window.location.href = 'https://smartstore.naver.com/swan_charles'
   }
  },
  mounted() {
   
  }
}
</script>
<template>
<button @click="goToShop">스완이네 스토어</button>
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
button{
  width:100%;
  background-color:white;
  border:1px solid;
  font-size: 3vh;
  color:black;
}

@media (min-width: 1200px) {
  ul{
    display: flex;
    flex-wrap: wrap;
  }
  ul li{
    width:33%;
  }
}
</style>
