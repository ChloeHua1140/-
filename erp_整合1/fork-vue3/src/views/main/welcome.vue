<template  >
  <div>
    <div :style="background" class="bgBackground" style="overflow: hidden;" >
      <div style="height: 50px;line-height:50px; display: flex;">
        <div style="border-radius: 4px;padding-left: 1%; " id="building">
<!--          <img src="../../../assets/logo.png" width="100%">-->
        </div>
        <div style="flex:1;"></div>
        <div style="margin-right: 3%">
          <el-button style="background-color: transparent;border: 0px;font-weight: bold;font-size: 20px" @click="gotoLogin()">登录</el-button>
          <el-button style="background-color: black;border: 0px;color: white;font-size: 20px" @click="gotoRegister()">注册</el-button>
        </div>
      </div>
      <!--div style="z-index: -1">
        <el-main class="front" >
          <div style="border-radius: 4px;padding-left: 10%;padding-top: 8%; font-weight: bold;color: black;font-size: 90px" >J·Infinity</div>
          <div style="border-radius: 4px;padding-left: 10%;padding-top: 2%; font-weight: bold;color: darkgray;font-size: 30px" >无止境的Java学习平台</div>
          <div style="border-radius: 4px;padding-left: 10%;padding-top: 1%; font-weight: bold;color: darkgray;font-size: 30px" >打造个性化Java习题库和知识库</div>
          <div style="padding-left: 10%;padding-top: 2%; display:flex" >
            <el-form :model="form" >
              <el-form-item >
                <div style="padding-left: 270%">
                  <el-button style="width: 180px;border:0px;background-color: black;color: white;font-size: 20px" @click="gotoLogin()" >Begin Journey</el-button></div>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
      </div-->
      <div style="margin-top: 10%">
        <el-carousel :interval="4000" type="card" height="350px">
          <el-carousel-item v-for="item in dataimg" :key="item.value" >
            <div class="img">
              <img  :src="item.src">
            </div>
              <div class="italictext">
                <p text="2xl" justify="center">{{item.txt}}</p>
              </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

<!--    下面似乎是鼠标跟随特效-->
    <div style="z-index: 200;margin-top: -50%;width: 90%;height: 90%">
      <vue-particles
          color="#3A6BAD"
          :particleOpacity="0.7"
          :particlesNumber="80"
          shapeType="circle"
          :particleSize="4"
          linesColor="#3A6BAD"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="80"
          :moveSpeed="2"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="false"
          clickMode="bubble"
      >
      </vue-particles></div>
  </div>
</template>

<script>
//import {Message } from '@element-plus/icons-vue'

export default {
  name:"welcome",
  data() {
    return{
      dataimg:[
        {txt:'tianlalu',src:require("../../assets/background/welcome_bg.png")},
        {txt:'tianlalu'},
        {txt:'tianlalu'},
        {txt:'tianlalu'},{txt:'tianlalu'},{txt:'tianlalu'},

      ],
      background:{
        backgroundImage: 'url('+require('../../assets/background/welcome_bg.png')+')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      form: {
      },
    }
  },
  // methods: {
  //   gotoLogin()
  //   {this.$router.push("/login")}
  //   ,
  //   gotoRegister()
  //   {this.$router.push("/registered")}
  // }
}
</script>

<style>
.bgBackground {
  margin-top: -20px;
  width: 100%;
  height: 100vh
}
.front{
  z-index:-1;
  margin-left: 30px;
}
#building {
  /*设置透明度，0为完全透明，1为不透明*/
  opacity: 0.75;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.img{
  height: 300px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>