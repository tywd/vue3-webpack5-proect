<!--
 * @Author: tywd
 * @Date: 2022-05-29 11:57:20
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-29 15:03:27
 * @FilePath: /webpack5-vue3/src/pages/common/404.vue
 * @Description: Do not edit
-->
<!--  -->
<template>
  <div class="error-container">
    <h1>404 not found</h1>
    <van-button @click="goBack">返回首页</van-button>
  </div>
</template>

<script setup> 
// 真香
// vue + script setup 语法糖写法 不需用export default
// 使用export default 需要在setup 包住 最后还需return 暴露出所有需要用的值和方法
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Button as vanButton } from "vant";
const router = useRouter();
const goBack = () => {
  router.replace("/");
};
// export default defineComponent({
//   name: "Error404",
//   components: {
//     vanButton
//   },
//   setup() {
//     const router = useRouter();
//     const goBack = () => {
//       router.replace("/");
//     };
//     return {
//       goBack
//     };
//   }
// });
</script>
<style lang='scss' scoped>
</style>
