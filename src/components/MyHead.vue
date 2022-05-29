<!--
 * @Author: tywd
 * @Date: 2022-05-29 14:15:53
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-29 15:03:10
 * @FilePath: /webpack5-vue3/src/components/MyHead.vue
 * @Description: Do not edit
-->
<template>
  <van-nav-bar
    :title="navTitle"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
</template>
<!-- <script>
export default {
  name: "Myhead",
}
</script> -->
<script setup>
// 真香
// vue + script setup 语法糖写法 不需用export default
// 使用export default 需要在setup 包住 最后还需return 暴露出所有需要用的值和方法
import { defineComponent, reactive, computed, toRefs, defineProps } from "vue";
import { useRouter } from "vue-router";
import { NavBar as vanNavBar } from "vant";
const props = defineProps({
  title: {
    type: String,
    default: "标题"
  }
});
const router = useRouter();
let navTitle = computed(() => props.title);
const state = reactive({});
const onClickLeft = () => {
  router.go(-1);
};

// export default defineComponent({
//   name: "MyHead",
//   props: {
//     title: {
//       type: String,
//       default: "标题"
//     }
//   },
//   components: {
//     vanNavBar
//   },
//   setup(props) {
//     const router = useRouter();
//     let navTitle = computed(() => props.title);
//     const state = reactive({
//       // navTitle:
//     });
//     const onClickLeft = () => {
//       router.go(-1);
//     };
//     return {
//       onClickLeft,
//       navTitle,
//       ...toRefs(state)
//     };
//   }
// });
</script>

<style scoped>
</style>
