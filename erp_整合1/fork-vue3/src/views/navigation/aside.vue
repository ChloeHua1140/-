<template>
  <div class="aside-main">
    <el-col :span="12" style="height:100%">
      <el-aside width="200px;" style="height:100%;">
        <el-menu :collapse="isCollapse" default-active="1" class="el-menu-vertical-demo"
          style="height: 100%;background-color: #19325433">
          <el-sub-menu index="1">
            <template #title>
              <el-icon :size="30" style="color: white">
                <Service />
              </el-icon><span class="-sub-menu__title">Customer Management</span>
            </template>
            <el-sub-menu index="1-1">
              <template #title>Create</template>
              <el-menu-item index="1-1-1">
                <router-link to="/add" style="text-decoration: none;color: black">Business Partner</router-link>
              </el-menu-item>
              <el-menu-item index="1-1-2">
                <router-link to="/relation" style="text-decoration: none;color: black">BP Relationship</router-link>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="1-2">
              <template #title>Display</template>
              <el-menu-item index="1-2-1">
                <router-link to="/display?type=1" style="text-decoration: none;color: black">Customer</router-link>
              </el-menu-item>
              <el-menu-item index="1-2-2">
                <router-link to="/display?type=2" style="text-decoration: none;color: black">Contact Person</router-link>
              </el-menu-item>
              <el-menu-item index="1-2-2">
                <router-link to="/display?type=3" style="text-decoration: none;color: black">BP RelationShip</router-link>
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon :size="30" style="color: white">
                <Document />
              </el-icon>
              <span class="-sub-menu__title">Order Management</span></template>
            <el-sub-menu index="2-1"><template #title>Inquiry</template>
              <el-menu-item index="2-1-1"><router-link to="/inquiry_create#reloaded"
                  style="text-decoration: none;color: black">Create</router-link></el-menu-item>
              <el-menu-item index="2-1-2"><router-link to="/inquiry_manage"
                  style="text-decoration: none;color: black">Display</router-link></el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2-2"><template #title>Quotation</template>
              <el-menu-item index="2-2-1"><router-link to="/quotation/type"
                  style="text-decoration: none;color: black">Create</router-link></el-menu-item>
              <el-menu-item index="2-2-2"><router-link to="/quotation_manage"
                  style="text-decoration: none;color: black">Display</router-link></el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2-3"><template #title>Sales order</template>
              <el-menu-item index="2-3-1"><router-link to="/order_type"
                  style="text-decoration: none;color: black">Create</router-link></el-menu-item>
              <el-menu-item index="2-3-2"><router-link to="/order_manage"
                  style="text-decoration: none;color: black">Display</router-link></el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon :size="30" style="color: white;">
                <Van />
              </el-icon>
              <span style="color: white;font-size: larger;font-weight: bold;">Delivery Management</span>
            </template>
            <el-menu-item index="DisplayInventory">
              <router-link to="/DisplayInventory" style="text-decoration: none;color: black"> Display Inventory</router-link>
            </el-menu-item>
            <el-menu-item index="DeliveryGoods">
              <router-link to="/DeliveryGoods" style="text-decoration: none;color: black"> Delivery Goods</router-link>
            </el-menu-item>
            <el-menu-item index="DeliveryPicking">
              <router-link to="/DeliveryPicking" style="text-decoration: none;color: black">  Delivery Picking</router-link>
            </el-menu-item>
            <el-menu-item index="MaintainBillingDueList">
              <router-link to="/MaintainBillingDueList" style="text-decoration: none;color: black">  Maintain Billing Due List</router-link>
            </el-menu-item>
            <el-menu-item index="DisplayInvoice">
              <router-link to="/DisplayInvoice" style="text-decoration: none;color: black">  Display Invoice</router-link>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: {
      type: Boolean,
      default: () => false
    }
  }
}

</script>

<style scoped>
.-sub-menu__title {
  color: white;
  font-size: larger;
  font-weight: bold;
}

.aside-main {
  height: calc(100% - 56px);
}
</style>