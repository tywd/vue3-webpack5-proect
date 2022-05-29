<!--
 * @Author: tywd
 * @Date: 2022-05-29 15:29:23
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-29 16:04:23
 * @FilePath: /webpack5-vue3/src/components/CustomInput.vue
 * @Description: 自定义组件 v-model 的写法
-->
<template>
  <!-- <input type="text" :value="modelValue" @input="onInput"> -->
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
  <!-- <input type="text" v-model="value"> -->
</template>
<script>
import { defineComponent, defineProps, onMounted, computed } from "vue";
export default defineComponent({
  name: "CustomInput",
  props: {
    modelValue: { type: [String, Number], default: "0" }
  },
  //   emits: ["update:modelValue"],
  setup(props, context) {
    // onInput 写法
    const onInput = e => {
      context.emit("update:modelValue", e.target.value);
    };
    // computed 写法
    let value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        context.emit("update:modelValue", value);
      }
    });
    return {
      value,
      onInput
    };
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
