<template>
  <div>
    <router-link to="/">首页</router-link> <br>
    <router-link to="/me">我的</router-link> <br>
    <router-link to="/redPacketRain">红包雨</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import { ref, defineComponent, computed } from "vue";
export default defineComponent({
  name: "App",
  setup() {
  }
});
</script>
