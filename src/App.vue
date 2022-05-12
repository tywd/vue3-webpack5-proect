<template>
  <div>
    <div>解析Vue文件了哟~</div>
    <p>{{name}}</p>
    <p>获取vuex里面的数据{{count}}</p>
    <router-link to="/">首页</router-link> <br>
    <router-link to="/me">我的</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    name: 'App',
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);

    return {
      count
    };
  }
});
</script>
