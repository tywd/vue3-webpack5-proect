<!--
 * @Author: tywd
 * @Date: 2022-05-18 15:04:01
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-29 17:16:23
 * @FilePath: /webpack5-vue3/src/pages/Me.vue
 * @Description: Do not edit
-->
<template>
    <header>
      我的页面
    </header>
    <van-button
      plain
      hairline
      type="primary"
    >细边框按钮</van-button>
    <!-- v-model -->
    <CustomInput v-model="searchText"></CustomInput>
    <CustomButton v-model:parentVal="searchTextChecked"></CustomButton>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import { Button as vanButton } from "vant";
import CustomInput from "components/CustomInput.vue"; // 测试自定义组件的 v-model
import CustomButton from "components/CustomButton.vue"; // 测试自定义组件的 v-model
export default defineComponent({
  name: "Me",
  components: {
    vanButton,
    CustomInput,
    CustomButton
  },
  setup(){
    let state = reactive({
      searchText: 1,
      searchTextChecked: 1
    })
    return {
      ...toRefs(state)
    }
  }
});
</script>

<style lang="scss" scoped>
.me-container {
  font-size: 0.5rem;
}
</style>