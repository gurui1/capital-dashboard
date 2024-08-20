<template>
    <div id="all1">
        <div class="left">
            <span class="wenzi"> {{ props.title }}</span>
        </div>
        <div class="right">
            <span class="wenzi2" v-if="props.title == '今日预计支出金额'"> {{ xx1 }}&nbsp;元</span>
            <span class="wenzi2" v-if="props.title == '今日预计回款金额'"> {{ xx2 }}&nbsp;元</span>
        </div>

    </div>
</template>

<script setup lang="ts">
// import { onMounted, onUnmounted, ref, reactive } from "vue";
//   import * as echarts from "echarts";
const props = defineProps(["title",]);
import { biao11 } from "@/api/dataBoard/data";
// let a:any;
// let xx: any = ref();
let xx1: any = ref();
let xx2: any = ref();
// const init = () => {
//     if (props.title == "今日预计支出金额")
//         xx.value = xx1.value;
//     else
//         xx.value = xx2.value;
// };
// let time: any = ref([])
// 接口传当天的时间
// let getTime = () => {
//     time.value[0] = localStorage.getItem('now');
//     time.value[1] = localStorage.getItem('now')

// }
let getData = () => {

    let payLoad = reactive({
    });
    biao11(payLoad).then((res) => {
        // console.log(res.data.data, 'xxx1');
        // console.log(res.data.data.今日预计支出金额)
        xx1.value = res.data.data.今日预计支出金额
        xx2.value = res.data.data.今日预计回款金额
        // console.log(xx1.value, xx2.value);

    });

};
onMounted(async () => {
    // await getTime();//等待 getTime() 函数执行完成
    getData();
    // init();

});

</script>

<style setup lang="less" scoped>
#all1 {
    box-sizing: border-box;
    width: 99%;
    margin: 10px auto;
    height: 80%;
    position: relative;
    border: 2px solid rgb(184, 172, 172);
    border-radius: 10px;
    /* 圆角半径为 10px */

    display: flex;
    flex-direction: row;
    background-color: #DFFBB4;

    .left {
        flex: 1;
        border-right: 3px #02A7F0 solid;
        box-sizing: border-box;

        .wenzi {
            font-size: 20px;
            font-weight: bold;
            position: relative;
            top: 30%;
            left: 25%;
        }
    }

    .right {
        flex: 1;
        position: relative;

        .wenzi2 {
            font-size: 20px;
            font-weight: bold;
            position: absolute;
            top: 50%;
            /* 相对于父元素顶部的偏移量为父元素高度的50% */
            left: 50%;
            /* 相对于父元素左侧的偏移量为父元素宽度的50% */
            transform: translate(-50%, -50%);
            /* 将元素自身的50%宽度和高度偏移量减去 */
        }
    }
}
</style>