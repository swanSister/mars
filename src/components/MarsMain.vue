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
      dateTo:'',
      dateFrom:'',
      cameraExceptions:['EDL_RUCAM','EDL_DDCAM','EDL_PUCAM1','EDL_PUCAM2','MCZ_RIGHT','MCZ_LEFT','SHERLOC_WATSON','EDL_RDCAM'],
      cameraArray:[],
      camera:'',
      cameraInfo:'',
      sol:null,
      roverArray:['perseverance','curiosity','spirit','opportunity'],
      roverIndex:0,
    }
  },
  methods: {

    getRoverUrl(){
      return 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + this.roverArray[this.roverIndex] + '?api_key=0wBaZcU48NCSsfz6V6MoixgbE2pVHNtnJhqCgH5o'
    },
    getPhotoUrl(){
      var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + this.roverArray[this.roverIndex] + '/photos?api_key=0wBaZcU48NCSsfz6V6MoixgbE2pVHNtnJhqCgH5o'
      var date = this.getDateFormat(this.date)
      return url+'&earth_date='+date + '&camera='+this.camera
    },
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
      if(this.marsDataCopy.length > 0) this.emitter.emit('showLoading')
      this.marsArray = this.marsArray.concat(this.marsDataCopy.splice(0,this.countDiff))
      this.$forceUpdate()

      var that = this
      setTimeout(() => {
         that.emitter.emit('hideLoading')
      },1000)
     
    },
    selectCamera(c){
      this.cameraInfo = c.full_name
      this.camera=c.name
      this.getImage()
    },
    handlOnBlur(){
      this.getImage()
    },
    roverChange(idx){
      this.roverIndex = idx
      this.getRoverInfo()
      this.getImage()
    },
    getImage(){
      this.emitter.emit('showLoading')
      this.marsDataCopy = []
        
      console.log(this.getPhotoUrl())
      axios
      .get(this.getPhotoUrl())
      .then(response => {
        this.marsDataCopy = response.data.photos
        this.marsArray = this.marsDataCopy.splice(0,this.count)
        this.sol = this.marsArray[0] ? this.marsArray[0].sol : null
        this.$forceUpdate()
        this.emitter.emit('hideLoading')
        }   
      )
    },
    getRoverInfo(){
      this.emitter.emit('showLoading')
      this.cameraArray = []
      this.camera = ''
      this.cameraInfo = ''
      axios
      .get(this.getRoverUrl())
      .then(response => {
        this.cameraArray = response.data.rover.cameras
        this.dateTo = new Date(response.data.rover.max_date)
        this.dateFrom = new Date(response.data.rover.landing_date)
        this.date = this.dateTo
        console.log(response.data.rover)
        for(var i in this.cameraExceptions){
            for(var j =this.cameraArray.length - 1; j>=0; j--){
              if(this.cameraExceptions[i] == this.cameraArray[j].name){
                this.cameraArray.splice(j,1)
              }
          }
        }
        if(this.cameraArray[0]){
          this.camera = this.cameraArray[0].name
          this.cameraInfo = this.cameraArray[0].full_name
          }
          this.$forceUpdate()
        }   
      )
    }
  },
  mounted() {
  this.getRoverInfo()
   this.getImage()
   this.emitter.on('roverChange',this.roverChange)
     
  }
}
</script>


<template>
  
  <div class="camera-selector">
    날짜선택 : <Datepicker :upperLimit="dateTo" :lowerLimit="dateFrom" class="date-picker" v-model="date" @update:modelValue="handlOnBlur"/>
    <div class="camera-info">*{{cameraInfo}}</div>
   
    <span v-for="(c,i) in cameraArray"  v-bind:key="c.name + i" :class="{'selected':c.name==camera}" @click="selectCamera(c)">
      {{c.name}}
    </span>
    
  </div>
  <ul ref="marsList" v-on:scroll="handleScroll" >
    
    <li v-for="(mars,i) in marsArray"  v-bind:key="mars + i" >
      <span class="idx">{{i+1}}/{{marsArray.length}}</span>
      <span class="name">{{mars.id}}</span>
      <div>
        <img class="image" style="width:50vh; height:50vh" :src="mars.img_src">
      </div>
    </li>
    
 </ul>
</template>

<style scoped>

.camera-selector{
  font-size: 2vh;
  padding:1vh 2vh;
}
.camera-info{
  margin-top:1vh;
  color:red;
}
.v3dp__datepicker{
  display: inline-block;
}
.camera-selector > span{
  display: inline-block;
  margin-top:1vh;
  margin-right: 1vh;
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
  padding:0 2vh;
  height:4vh;
  line-height: 4vh;
  font-size: 2vh;
  color:white;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border-radius: 5%;
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
