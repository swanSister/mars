<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    return {
      count:10,
      countDiff:10,
      marsArray:[],
      date:new Date(),
      camera:'FHAZ',
      sol:null,
      
      cameraArray:[],
      cameraInfoArray:[],
      marsUrl:'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?api_key=0wBaZcU48NCSsfz6V6MoixgbE2pVHNtnJhqCgH5o'
    }
  },
  methods: {
    getDateFormat(dt){
      var year = dt.getFullYear();
      var month = ("0" + (1 + dt.getMonth())).slice(-2);
      var day = ("0" + dt.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    },
    handleScroll(e){
      var scrollHeight= this.$refs.marsList.scrollHeight
      var scrollPostion = e.target.scrollTop + this.$refs.marsList.clientHeight
      
      if(Math.abs(scrollPostion-scrollHeight)<1){
        this.listUpdate()
      }
    },
    listUpdate(){
      this.emitter.emit('showLoading')
      console.log(this.count, this.marsDataCopy.length)
      this.marsArray = this.marsArray.concat(this.marsDataCopy.splice(0,this.countDiff))
      this.$forceUpdate()

      var that = this
      setTimeout(() => {
         that.emitter.emit('hideLoading')
      },1000)
     
    },
    selectCamera(name){
      this.camera=name
      this.getMarsImage()
    },
    handlOnBlur(){
      this.camera = 'FHAZ'
      console.log("SSsblur")
      
      this.getMarsImage()
      
    },
    getMarsImage(){
      this.emitter.emit('showLoading')
      this.marsDataCopy = []
      var date = this.getDateFormat(this.date)
      //+'&camera='+this.camera
      axios
      .get(this.marsUrl+'&earth_date='+date)
      .then(response => {
        console.log(response)
        
        this.marsDataCopy = response.data.photos
       
        this.marsArray = this.marsDataCopy.splice(0,this.count)
        this.sol = this.marsArray[0] ? this.marsArray[0].sol : null
        this.$forceUpdate()
        this.emitter.emit('hideLoading')
        }   
      )
    }
  },
  mounted() {
   this.getMarsImage()
  }
}
</script>


<template>
  
  <div class="camera-selector">
    <Datepicker v-model="date" @update:modelValue="handlOnBlur"/>
    <div v-if="sol">{{sol}}솔!</div>
    <span v-for="(name,i) in cameraArray"  v-bind:key="camera + i" :class="{'selected':name==camera}" @click="selectCamera(name)">
      {{name}}
    </span>
  </div>
  <ul ref="marsList" v-on:scroll="handleScroll" >
    <li v-for="(mars,i) in marsArray"  v-bind:key="mars + i" >
      <span class="idx">{{i+1}}</span>
      <span class="name">{{mars.id}}</span>
      <div>
        <img class="image" style="width:50vh; height:50vh" :src="mars.img_src">
      </div>
    </li>
    
 </ul>
</template>

<style scoped>
.camera-selector{
  font-size: 3vh;
  padding:.5vh 2vh;
}
.camera-selector > span{
  display: inline-block;
  margin-left: 2vh;
}
.camera-selector > span.selected{
  font-weight: bold;
}
ul {
  display:block;
  width:100%;
  height:70vh;
  overflow-y:scroll;
  padding:3vh;
  margin:0;
}
ul li{
  padding:2vh 2vh 2vh 0;
  font-size: 3vh;
  border-bottom:1px solid rgba(0,0,0,0.5);
  list-style-type: none;
  padding:2vw;
}
ul li .idx{
  display: inline-block;
  width:4vh;
  height:4vh;
  line-height: 4vh;
  font-size: 2vh;
  color:white;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  background-color: rgb(122,149,138);
  
}
ul li .name{
 margin-left: 1vh;
}
ul li .image{
 margin-top: 2vh;
 width:50vh;
}
.detail{
  font-size:2vh;
  margin-top: 2vh;
}
.detail .row{
  padding:1vw 2vh;
  border-top: 1px solid rgba(0,0,0,0.2);
}
.detail span{
  display: inline-block;
}
.detail .more-btn{
  font-weight: bold;
  border:none;
  background: none;
  color:rgb(122,149,138);
  text-align: right;
}
.detail .title{
font-weight: bold;
width:20%;
vertical-align: top;
}
.detail .info{
width:80%;
}
.arrow{
  position: absolute;
  top: 1vh;
  right: 2vh;
  display: block;
  width: 0;
  height: 0;
  margin-top: 2vh;
}
.arrow-down {
  border-left:1.5vh solid transparent;
  border-right:1.5vh solid transparent;
  border-top:2vh solid rgb(122,149,138);
}
.arrow-up {
  border-left:1.5vh solid transparent;
  border-right:1.5vh solid transparent;
  border-bottom:2vh solid rgb(122,149,138);
}
</style>
