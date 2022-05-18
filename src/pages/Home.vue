<template>
  <div>
    首页
    <v-button
      plain
      hairline
      type="primary"
    >细边框按钮</v-button>
    <v-button
      plain
      hairline
      type="primary"
    >细边框按钮</v-button>
    <div>解析Vue文件了哟~</div>
    <p>{{name}}</p>
    <p>获取vuex里面的数据{{count}}</p>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { Button } from "vant";
export default defineComponent({
  name: "Home",
  components: {
    "v-button": Button
  },
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);
    const name = ref("tywd");

    return {
      name,
      count
    };
  }
});
</script>
