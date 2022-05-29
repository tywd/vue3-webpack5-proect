<template>
  <div class="me-container">
    <header>
      我的页面
    </header>
    <van-button
      plain
      hairline
      type="primary"
    >细边框按钮</van-button>
    <van-button
      plain
      hairline
      type="primary"
    >细边框按钮</van-button>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Button as vanButton } from "vant";
export default defineComponent({
  name: "Me",
  components: {
    vanButton
  },
});
</script>

<style lang="scss" scoped>
.me-container{
  font-size: .5rem;
}
</style>