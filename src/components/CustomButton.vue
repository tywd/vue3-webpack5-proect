<!--
 * @Author: tywd
 * @Date: 2022-05-29 15:20:45
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-29 17:16:07
 * @FilePath: /webpack5-vue3/src/components/CustomButton.vue
 * @Description: 自定义组件 v-model button 的写法
-->
<template>
  <div>
    {{parentVal}}
    <button @click="$emit('update:parentVal',100) ">改父中的a</button>
  </div>
</template>
<script>
import { defineComponent, defineProps, onMounted, computed } from "vue";
export default defineComponent({
  name: "CustomButton",
  props: {
    parentVal: { type: Number, default: 1 }
  },
  emits: ["update:parentVal"],
  // model: {
  //   prop: "parentVal"
  // },
  setup(props, context) {
    return {};
  }
});
// const props = defineProps({ modelValue: { type: String | Number, default: "0" }});
// const emit = defineEmits(["modelValue"]);
// onMounted(() => {
//   emit("update:modelValue", count.value);
// });
</script>

<style scoped>
</style>