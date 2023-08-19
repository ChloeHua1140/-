<template>
  <div :style="background" class="background" style="overflow: hidden;">
    <el-container style="height:100%">
      <div style="display: flex">
        <el-aside :width="isCollapse ? '70px' : '290px'" class="aside">
          <div class="toggle-button" @click="toggleCollapse()">|||</div>
          <Aside :isCollapse="isCollapse"></Aside>
        </el-aside>
      </div>
      <el-container>
        <el-header>
          <page-header />
        </el-header>
        <el-main style="height:100%;padding:10px">
          <!-- <router-view></router-view> -->
          <!-- <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view> -->
          <router-view v-slot="{ Component }" v-if="isRouterAlive">
            <keep-alive>
              <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"></component>
            </keep-alive>
            <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"></component>
          </router-view>
          <!-- <router-view v-slot="{ Component }" v-if="isRouterAlive">
            <keep-alive>
              <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"></component>
            </keep-alive>
            <component :is="Component" :key="$route.name" v-if="!this.$route.meta.keepAlive"></component>
          </router-view> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import pageHeader from "@/views/navigation/pageHeader";
import Aside from "@/views/navigation/aside";
export default {
  name: "Layout",
  components: {
    pageHeader,
    Aside
  },
  provide() { return { reload: this.reload } },
  data() {
    return {
      isRouterAlive: true,
      isCollapse: false,
      background: {
        backgroundImage: 'url(' + require('../assets/background/background.png') + ')',
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
      }
    }
  },
  created() {
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>
.toggle-button {
  background: #19325466;
  font-size: 25px;
  text-align: center;
  color: white;
  overflow: hidden;
  height: 56px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  height: 100%;
  width: 100%;
  /**宽高100%是为了图片铺满屏幕 */
}
</style>