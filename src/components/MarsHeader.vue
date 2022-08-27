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
      <span class="left-triangle" @click="goLeft"></span> 
        {{roverList[roverIndex]+" "}}
      <span class="right-triangle" @click="goRight"></span>
    </div>
    
  </div>
</template>

<style scoped>
.green{
  font-weight:bold;
  font-size: 4vh;
  line-height: 8vh;
  margin: auto auto;
  text-align: center;
  color:rgb(122,149,138);
}
.left-triangle{
  width: 0;
  height: 0;
  border-bottom: 2vh solid transparent;
  border-top: 2vh solid transparent;
  border-left: 2vh solid transparent;
  border-right: 2vh solid rgb(122,149,138);
  font-size: 0;
  vertical-align: middle;
  margin-right: 2vh;
}
.right-triangle{
  width: 0;
  height: 0;
  border-bottom: 2vh solid transparent;
  border-top: 2vh solid transparent;
  border-left: 2vh solid rgb(122,149,138);
  border-right: 2vh solid transparent;
  font-size: 0;
  vertical-align: middle;
  margin-left: 2vh;
}
</style>
