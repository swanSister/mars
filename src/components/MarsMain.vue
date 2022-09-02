<script>
import { ref } from 'vue'
import axios from 'axios'
import imagePopup from './imagePopup.vue'
export default {
  setup() {
    return {
      count:12,
      countDiff:12,
      cameraListShow:true,
      marsArray:[],
      marsDataCopy:[],
      date:new Date(),
      dateTo:'',
      dateFrom:'',
      cameraList:[],
      camera:'',
      cameraInfo:'',
      sol:null,
      roverList:['perseverance','curiosity','spirit','opportunity'],
      roverIndex:0,
      cameraSelectorHeight:0,
      imagePopupSrc:'',
      imagePopupIndex:0,
      isImagePopupShow:false,
    }
  },
  components:{
   imagePopup
  },
  methods: {
    getRoverUrl(){
      return 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + this.roverList[this.roverIndex] + '?api_key=0wBaZcU48NCSsfz6V6MoixgbE2pVHNtnJhqCgH5o'
    },
    getPhotoUrl(){
      var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + this.roverList[this.roverIndex] + '/photos?api_key=0wBaZcU48NCSsfz6V6MoixgbE2pVHNtnJhqCgH5o'
      var date = this.getDateFormat(this.date)
      if(this.isSearchAll){
         return url+'&camera='+this.camera
      }else{
         return url+'&earth_date='+date + '&camera='+this.camera
      }
     
    },
    getDateFormat(dt){
      var year = dt.getFullYear();
      var month = ("0" + (1 + dt.getMonth())).slice(-2);
      var day = ("0" + dt.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    },
    handleScroll(e){
      var scrollHeight= this.$refs.marsList.scrollHeight
      var scrollPostion = e.target.scrollTop + this.$refs.marsList.offsetHeight
      
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
      this.marsArray = []
      console.log(this.getPhotoUrl())
      axios
        .get(this.getPhotoUrl())
        .then(response => {
          this.marsDataCopy = response.data.photos
          this.marsArray = this.marsDataCopy.splice(0,this.count)
          this.sol = this.marsArray[0] ? this.marsArray[0].sol : null
          this.$forceUpdate()
          this.emitter.emit('hideLoading')

          let that = this
          setTimeout(() => {
          if(that.cameraListShow){
            console.log("##############")
            that.cameraSelectorHeight = that.$refs.cameraSelector.offsetHeight
            that.$refs.marsList.setAttribute(`style`,`height:calc(100% - 5vh - ${that.cameraSelectorHeight}px)`)
           }
          },300)
        }   
      )
    },
    getRoverInfo(){
      this.emitter.emit('showLoading')
      this.cameraList = []
      this.camera = ''
      this.cameraInfo = ''
      axios
      .get(this.getRoverUrl())
      .then(response => {
        this.cameraList = response.data.rover.cameras
        this.dateTo = new Date(response.data.rover.max_date)
        this.dateFrom = new Date(response.data.rover.landing_date)
        this.date = this.dateTo
        console.log(response.data.rover)
        if(this.cameraList[0]){
          this.camera = this.cameraList[0].name
          this.cameraInfo = this.cameraList[0].full_name
        }
        this.$forceUpdate()

        }   
      )
    },
    marsListHeightUpdate(){
      if(this.cameraListShow){
        this.cameraSelectorHeight = this.$refs.cameraSelector.offsetHeight
        this.$refs.marsList.setAttribute(`style`,`height:calc(100% - 5vh)`)
        this.cameraListShow = false
        this.$forceUpdate()
      }else{
        this.cameraListShow = true
        this.$forceUpdate()
        let that = this
        setTimeout(() => {
          if(that.cameraListShow){
            that.cameraSelectorHeight = this.$refs.cameraSelector.offsetHeight
            that.cameraSelectorHeight = that.$refs.cameraSelector.offsetHeight
            this.$refs.marsList.setAttribute(`style`,`height:calc(100% - 5vh - ${this.cameraSelectorHeight}px)`)
           }
          },300)
      }
    
    },
    showImagePopup(src,i){
      this.imagePopupIndex = i
      this.imagePopupSrc = src
      console.log(this.imagePopupSrc)
      this.isImagePopupShow = true
      this.$forceUpdate()
    },
    closeImagePopup(){
      this.imagePopupSrc = ''
      this.isImagePopupShow = false
      this.$forceUpdate()
    },
    showLeft(){
      if(this.imagePopupIndex > 0){
        this.imagePopupIndex --
      }
      this.imagePopupSrc = this.marsArray[this.imagePopupIndex].img_src
      this.$forceUpdate()
    },
    showRight(){
      if(this.imagePopupIndex < this.marsArray.length-1){
        this.imagePopupIndex ++
      }
      this.imagePopupSrc = this.marsArray[this.imagePopupIndex].img_src
      this.$forceUpdate()
    },
    selectDay(dir){
      if(dir=='right'){
        this.date = new Date(this.date.setDate(this.date.getDate()+1))
      }else{
        this.date = new Date(this.date.setDate(this.date.getDate()-1))
      }
      this.getImage()
      this.$forceUpdate()
    }
  },
  mounted() {
    this.emitter.emit('showLoading')
    this.getRoverInfo()
    this.getImage()
    this.emitter.on('roverChange',this.roverChange)
     console.log("########",this.cameraListShow)
  }
}
</script>
<template>
  <div class="date-selector">
    <span @click="selectDay('left')" v-if="dateFrom<date" class="select-date-icon icon-left-open"></span> 
    <Datepicker 
    :style="{'height': '4vh','padding':'1vh','border':'1px solid rgb(122,149,138)','margin':'0 1vh'}"
    :upperLimit="dateTo" :lowerLimit="dateFrom" class="date-picker" v-model="date" @update:modelValue="handlOnBlur"/>
    <span @click="selectDay('right')" v-if="date<dateTo" class="select-date-icon icon-right-open"></span>
    <span :class="{'arrow arrow-up':cameraListShow,'arrow arrow-down':!cameraListShow, }" @click="marsListHeightUpdate"></span>
  </div>
  <div v-if="cameraListShow" class="camera-selector" ref="cameraSelector">
    <div class="camera-info"><span class="icon-camera"></span>{{cameraInfo}}</div>
    <span v-for="(c,i) in cameraList"  v-bind:key="c.name + i" :class="{'selected':c.name==camera}" @click="selectCamera(c)">
      {{c.name}}
    </span>
  </div>
  <ul ref="marsList" v-on:scroll="handleScroll" >
    <div v-if="!marsArray.length" class="no-data">
      <span class="icon-cancel"></span> 촬영 사진이 없습니다. </div>
    <li v-for="(mars,i) in marsArray"  v-bind:key="mars + i" >
      <span class="idx">{{i+1}}/{{marsArray.length + marsDataCopy.length}}</span>
      <span class="name">{{mars.id}}</span>
      <div>
        <img class="image" :src="mars.img_src" @click="showImagePopup(mars.img_src,i)">
      </div>
    </li>
 </ul>
 <imagePopup v-if="isImagePopupShow"  :src="imagePopupSrc" :length="marsArray.length" :idx="imagePopupIndex"
 @closePopup="closeImagePopup" @showLeft="showLeft" @showRight="showRight"/>
</template>

<style scoped>

.date-selector, .date-selector > div{
  height:5vh;
  line-height:5vh;
  text-align: center;
}
.camera-selector{
  z-index: 2;
  font-size: 2vh;
  padding:0 2vh 1vh 2vh;
  border-bottom:1px solid rgb(122,149,138);
  height:auto;
  overflow: scroll;
}
.camera-info{
  
  color:rgb(122,149,138);
  font-weight: bold;
}
.select-all-period{
  color:rgb(122,149,138);
  font-weight: bold;
  margin-left: 2vh;
}
.camera-info > span{
  margin-right:1vh;
  color:rgb(122,149,138);
  
}
.v3dp__datepicker{
  display: inline-block;
}
.v3dp__datepicker input:read-only{
  border:none;
}
.no-data{
  font-size: 2vh;
  font-weight: bold;
  color:rgb(195, 77, 77);
}
.camera-selector > span{
  display: inline-block;
  margin-right: 1vh;
  border: 1px solid rgba(0,0,0,0.2);
  color:rgb(122,149,138);
  padding: 0 0.8vh;
  margin: 0.5vh;
}
.camera-selector > span.selected{
  font-weight: bold;
  border-color: rgb(122,149,138);
  background-color:rgb(122,149,138);
  color:white;
}
.select-date-icon{
  color:rgb(122,149,138);
  font-size:2vh;
}
ul{
  display: flex;
  flex-wrap: wrap;
  width:100%;
  overflow-y:scroll;
  padding:3vh;
  margin:0;
}
ul li{
  width:50%;
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
  font-size: 2vh;
  height:4vh;
  line-height:4vh;
  margin-left: 1vh;
}
ul li .image{
 margin-top: 2vh;
 width:100%;
 height:auto;
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
  top: 2vh;
  right: 2vh;
  display: block;
  width: 0;
  height: 0;
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
