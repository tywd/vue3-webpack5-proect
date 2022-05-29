<!--
 * @Author: tywd
 * @Date: 2022-05-12 19:45:18
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-29 17:16:48
 * @FilePath: /webpack5-vue3/src/pages/Home.vue
 * @Description: Do not edit
-->
<template>
  <header>首页</header>
  <div>解析Vue文件了哟~</div>
  <p>{{name}}</p>
  <p>获取vuex里面的数据{{count}}</p>
  <router-link to="/redPacketRain">红包雨</router-link>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);
    const name = ref("tywd");
    const active = ref(0);

    return {
      name,
      count,
      active
    };
  }
});
</script>

<style lang="scss" scoped>
.home-container {
  font-size: 0.5rem;
}
</style>
