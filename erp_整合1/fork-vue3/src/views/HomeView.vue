<template>
  <div class="home">
    <el-row style="margin-top: 50px">
      <el-col :span="8" style="margin-left: 100px">
        <el-row>
        <span style="font-weight: bolder;font-size: 50px">Welcome to </span></el-row>
        <el-row><span style="font-weight: bolder;font-size: 73px;color: #213959">ERP_sd</span></el-row>
        <el-row><span style="font-weight: bolder;font-size: 26px;color:darkgray;margin-top: 20px">
          This is a streamlined ERP sales and distribution module system that manages customers, orders, and delivery.</span></el-row>
      </el-col>
      <el-col :span="8">
        <img src="../components/homeview.png" style="width: 150%">
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px">
      <el-col :span="6" style="margin-left: 100px" >
          <el-card style="text-align: -webkit-center;width: 300px">
            <el-button class="main_button" text style="font-size: larger;">Customer Management</el-button>
            <el-icon class="icon_style" :size="80" color=" #545c64" ><User/></el-icon>
          </el-card>
      </el-col>
<!--      这部分是客户管理-->
      <el-col :span="6" style="margin-left: 80px">
        <el-card style="text-align: -webkit-center;width: 300px">
          <el-button class="main_button" text style="font-size: larger;" @click="isCollape1===false?isCollape1=true:isCollape1=false">Order Management</el-button>
          <el-icon class="icon_style" :size="80" color=" #545c64" ><Document/></el-icon>
          <el-menu v-if="isCollape1===false">
            <el-sub-menu><template #title>Inquiry</template>
              <el-menu-item ><router-link to="/inquiry_create" style="text-decoration: none;color: black">Create</router-link></el-menu-item>
              <el-menu-item ><router-link to="/inquiry_manage" style="text-decoration: none;color: black">Display</router-link></el-menu-item>
            </el-sub-menu>
            <el-sub-menu><template #title>Quotation</template>
              <el-menu-item><router-link to="/quotation/type" style="text-decoration: none;color: black">Create</router-link></el-menu-item>
              <el-menu-item ><router-link to="/quotation_manage" style="text-decoration: none;color: black">Display</router-link></el-menu-item>
            </el-sub-menu>
            <el-sub-menu><template #title>Sales Order</template>
              <el-menu-item ><router-link to="/order_type" style="text-decoration: none;color: black">Create</router-link></el-menu-item>
              <el-menu-item ><router-link to="/order_manage" style="text-decoration: none;color: black">Display</router-link></el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-card>
<!--        发货管理-->
      </el-col>
      <el-col :span="6" style="margin-left: 80px">
        <el-card style="text-align: -webkit-center;width: 300px">
          <el-button class="main_button" text style="font-size: larger;">Delivery Management</el-button>
          <el-icon class="icon_style" :size="80" color=" #545c64" ><Van/></el-icon>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>


export default {
  name: 'HomeView',
  components: {
  },
  data(){
  return{
    isCollape1:true
  }}
}
</script>
<style>
.main_button{
  width: 200px;
  height: 200px;
  font-size: 30px;
}
.icon_style{

}
</style>
