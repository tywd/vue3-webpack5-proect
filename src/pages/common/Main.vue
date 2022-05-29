<!--
 * @Author: tywd
 * @Date: 2022-05-29 11:39:32
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-29 17:17:00
 * @FilePath: /webpack5-vue3/src/pages/common/Main.vue
 * @Description: Do not edit
-->
<template>
  <router-view />
  <van-tabbar route>
    <van-tabbar-item
      replace
      to="/home"
      icon="home-o"
    >首页</van-tabbar-item>
    <van-tabbar-item
      replace
      to="/me"
      icon="friends-o"
    >我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { defineComponent } from "vue";
import { Tabbar as vanTabbar, TabbarItem as vanTabbarItem } from "vant";
export default defineComponent({
  name: "Main",
  components: {
    vanTabbar,
    vanTabbarItem
  },
  setup() {
    return {};
  }
});
</script>
