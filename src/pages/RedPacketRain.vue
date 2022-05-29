<!--
 * @Author: tywd
 * @Date: 2022-05-18 15:16:41
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-29 14:50:48
 * @FilePath: /webpack5-vue3/src/pages/RedPacketRain.vue
 * @Description: 实现一个简易红包雨
-->
<template>
  <div class="red-packet-container">
    <MyHead title="红包雨"/>
    <!-- <header>红包雨</header> -->
    <!-- <div
      class="fromTo f30"
      @click="fromToClick"
    >fromTo</div>
    <div
      class="from f30"
      @click="fromClick"
    >from</div>
    <div
      class="to f30"
      @click="toClick"
    >to</div> -->

    <div
      ref="redpacketElm"
      class="redpacket-elm"
    >
      <van-button @click="openRedPacketRain">开始红包雨</van-button>
    </div>
    <img
      :src="redbag"
      alt=""
    >
  </div>
</template>
<script>
// import gsap from "gsap";
// import { PixiPlugin } from "gsap/PixiPlugin.js";
import { reactive, defineComponent, ref, toRefs, onMounted } from "vue";
import RedPacketRainApp from "utils/redPacketRainAnimate.js";
import redbag from "assets/img/redbag@3x.png";
import { Button as vanButton } from "vant";
import MyHead from "components/MyHead.vue";
export default defineComponent({
  name: "RedPacketRain",
  components: {
    vanButton,
    MyHead
  },
  setup(props, context) {
    console.log('context: ', context);
    const redpacketElm = ref(null);
    const state = reactive({
      gameCfgDefault: {
        img: redbag, // 下雨的红包图片
        count: 5, // 红包的数量
        awardList: [
          // 奖品列表
          {
            id: 1,
            title: "久旱逢甘霖",
            desc: "恭喜中奖10元，请到我的奖品处填写信息领取"
          },
          { id: 2, title: "金榜题名时", desc: "恭喜获得10个菠萝币" },
          { id: 3, title: "洞房花烛夜", desc: "恭喜获得" },
          { id: 4, title: "他乡遇故知", desc: "" }
        ],
        animations: {
          // 单位统一为 ms
          redPackageFrequency: 300, // 红包生成频率
          countdownTotal: 20000, // 游戏时长
          redPackageDuration: 10000 // 红包坠落时长
        }
      }
    });
    // gsap.registerPlugin(PixiPlugin);
    // const fromToClick = () => {
    //   gsap.fromTo(".fromTo", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 100 }); // 从某个状态开始，到某个状态结束，需要设置两个状态
    // };
    // const fromClick = () => {
    //   gsap.from(".from", { opacity: 0, y: 100, duration: 1 }); // 从某个状态开始，设置的是起始状态
    // };

    // const toClick = () => {
    //   gsap.to(".to", { opacity: 0, x: 100, duration: 1 }); // 过渡到某个状态，设置的是结束状态
    // };

    const openRedPacketRain = () => {
      let redpacketAni = new RedPacketRainApp(
        redpacketElm.value,
        state.gameCfgDefault,
        e => {
          console.log(e);
          redpacketAni = null;
        }
      );
      console.log("redpacketAni: ", redpacketAni);
      redpacketAni.start();
    };

    onMounted(() => {});
    return {
      redpacketElm,
      // fromToClick,
      // fromClick,
      // toClick,
      redbag,
      openRedPacketRain,
      ...toRefs(state)
    };
  }
});
</script>

<style scoped lang="scss">
.red-packet-container {
  width: 100%;
  height: 20rem;
  header {
    font-size: 25px;
  }
  .redpacket-elm {
    // position: fixed;
    // left: 0;
    // top: 0;
    // width: 100%;
    // height: 80%;
    // border: 1px solid #000;
  }
}
</style>
