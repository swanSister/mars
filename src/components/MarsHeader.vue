<script>
export default {
  components:{
   
  },
  data(){
      return{
          roverList:['perseverance','curiosity','spirit','opportunity'],
          roverIndex:0,
      }
  },
  methods: {
    goLeft(){
      this.roverIndex > 0 ? this.roverIndex-- : this.roverIndex = this.roverList.length-1 
      this.emitter.emit('roverChange',this.roverIndex)
    },
    goRight(){
      this.roverIndex < this.roverList.length-1 ? this.roverIndex ++ : this.roverIndex = 0
      this.emitter.emit('roverChange',this.roverIndex)
    }
  },
  mounted(){

  }
  
}
</script>

<template>
  <div>
    
    <div class="green">
      <span class="left icon-left-open" @click="goLeft"></span> 
      <span class="title">{{roverList[roverIndex]+" "}}</span>
      <span class="right icon-right-open" @click="goRight"></span>
    </div>
    
  </div>
</template>

<style scoped>
.green{
  font-size: 4vh;
  line-height: 7vh;
  margin: auto auto;
  text-align: center;
  color:rgb(122,149,138);
}
.green .title{
  font-weight:bold;
  min-width:60vw;
  display: inline-block;
}
.left, .right{
  font-size: 3vh;
  font-weight: normal;
}

@media (min-width: 1024px) {
  .green .title{
  font-weight:bold;
  min-width:60vh;
  display: inline-block;
  }
}

</style>
