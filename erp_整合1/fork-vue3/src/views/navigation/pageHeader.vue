<template>
  <div  >
    <el-row class="el-row">
      <!--<el-col :span="2" class="el-col">这里是logo
      <div style="z-index: 2;background: -webkit-linear-gradient(left,transparent,transparent,#7186A2,#7186A2)">
         <img src="../../assets/logo.png" width=56px>
       </div
      </el-col>-->
      <el-col :span="24">
        <el-menu :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
          <el-menu-item index="1"
          ><router-link to="/home">HOME</router-link></el-menu-item
          >
        </el-menu>
      </el-col>
    </el-row>
  </div>

</template>

<script>
// import { get } from '@/plugins/axios'
// import Vue from "vue";
// import store from "@/store";

export default {
  name: "pageHeader",
  data(){
    return{
      activeIndex2:"1",
    }
  }
}
</script>

<style >
  el-row {
    margin-bottom: 20px;
    }
  el-col {
    border-radius: 4px;
    }

</style>