<template>
  
  <div class="loading">
        <div class="circle"></div>
  </div>
</template>

<style scoped>
.loading{
  background: rgba(0,0,0,.7);
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  overflow: hidden;
  z-index: 10;
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
</style>