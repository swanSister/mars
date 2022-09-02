<script>
export default {
  props : {
    src : String,
    length : Number,
    idx : Number
  } 
}
</script>
<template>
  <div class="loading">
    <div class="circle"></div>
    <img :src="src"/>
    {{idx}},{{length}}
    <span v-if="idx > 0" @click="$emit('showLeft')" class="arrow-left icon-left-open"></span>
    <span v-if="idx < length-1" @click="$emit('showRight')" class="arrow-right icon-right-open"></span>
    <span @click="$emit('closePopup')" class="close-btn icon-cancel"></span>
  </div>
</template>

<style scoped>
.loading{
  background: rgba(0,0,0);
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  overflow: hidden;
  z-index: 10;
}
.close-btn{
  font-size: 4vh;
  color:white;
  position:fixed;
  right:2vh;
  top:1vh;
}
img{
  position: fixed;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%) rotate(0);
  width:100%;
  height:auto;
}

@keyframes spinCircle {
    from {
        transform:translate(-50%, -50%) rotate(0);
        transition-timing-function: linear;
    }
    to {
        transform:translate(-50%, -50%) rotate(360deg);
        transition-timing-function: linear;
    }
}
.loading .circle {
  position:fixed; left:50%; top:50%; 
  transform:translate(-50%, -50%); 
  width:8vh; height:8vh; 
  border:1.5vh solid #fff; 
  border-top:1.5vh solid rgb(122,149,138); 
  border-radius:50%;
  animation-name:spinCircle;
  animation-timing-function: linear;
  animation-duration:.8s;
  animation-iteration-count:infinite;
}
.arrow-left{
  position:fixed;
  left:2vh;
  top:50%;
  font-size: 3vh;
  color:white;
  transform:translate(-50%, -50%);
}
.arrow-right{
  position:fixed;
  right:2vh;
  font-size: 3vh;
  top:50%;
  color:white;
  transform:translate(50%, -50%);
}
</style>