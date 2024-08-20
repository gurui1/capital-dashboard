<template>
  <div id="all1">
    <div class="title">
      <span class="wenzi">
        &nbsp&nbsp &nbsp {{ props.title }} &nbsp
      </span>
      <div class="ball"></div>
    </div>
    <div @click="tiaozhuan" class="xq">
      <!-- <img src="../../assets/菜单.png" alt="" style="width: 15px;height: 18px;position: relative;top: 3px;" />
      <span style="margin-left: 2px;">详情</span> -->
    </div>
    <div class="select">
      <span>支出日期: </span>
      <!-- <el-date-picker v-model="timeLineVal" type="daterange" range-separator="至" start-placeholder="开始时间"
        end-placeholder="结束时间" :disabled-date="disabledDate" /> -->
      <el-date-picker v-if="props.panduan == true" v-model="timeLineVal" type="daterange" range-separator="至"
        start-placeholder="开始时间" end-placeholder="结束时间"  />
      <span v-if="props.panduan == false">&nbsp;{{ timeLineVal[0] }}&nbsp;&nbsp;至&nbsp;&nbsp;{{ timeLineVal[1] }}</span>

      <el-button type="primary" @click="getData">查询</el-button>
    </div>
    <div class="chart" ref="midEcharts6"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from "vue";
import * as echarts from "echarts";
import { biao12 } from "@/api/dataBoard/data";
// const props = defineProps(["title",]);
const props = defineProps(["title", "panduan"]);
//   import { getData2 } from "../../api/diTan/api";

const disabledDate = (time: Date) => {
  const currentTime = new Date();

  // 禁用大于当前时间的日期
  return time.getTime() > currentTime.getTime();
}
let timeLineVal: any = ref([]);

let geiTime = () => {
  timeLineVal.value[0] = localStorage.getItem('mouthFirstDay');
  timeLineVal.value[1] = localStorage.getItem('now');
  // console.log(timeLineVal.value);
}
const router = useRouter();
let tiaozhuan = () => {
  router.push('/biao1'); // 导航到 '/about' 路由
}
// 生成近七日日期数组
// function generateRecentDates() {
//   const dates = [];
//   for (let i = 6; i >= 0; i--) {
//     const date = new Date();
//     date.setDate(date.getDate() - i);
//     dates.push(date.toISOString().slice(0, 10));
//   }
//   return dates;
// }

let myChart: any = null;
let first = true;
let midEcharts6: any = ref(null);
let state: any;

let echartX: any = ref([]);
// console.log(echartX.value);

let echarty1: any = ref([]);
let echarty2: any = ref([]);
let echarty3: any = ref([]);
let initEcharts = () => {


  if (first) {
    myChart = echarts.init(midEcharts6.value as any);
  }
  first = false;

  state = reactive({
    option: {
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 10,
        },
        axisPointer: {
          type: "line",
          label: {
            backgroundColor: "#111339",
          },
        },

      },
      color: ["#0D0DFF", "#D9001B", "#70B603"],
      grid: {
        left: "2%",
        right: "4%",
        bottom: "4%",
        top: "20%",
        containLabel: true,
      },
      legend: {
        itemWidth: 15,
        itemHeight: 7,
        left: "center",
        // top:'5',
        textStyle: {
          color: "black",
          fontSize: 15,
        },
        inactiveColor: "grey",
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: echartX,
          axisLabel: {
            color: "black",
            opacity: 0.8,
            fontSize: 10,
            formatter: function (value: string) {
              return value.split("\n").join("\n");
            },
          },
          axisTick: { show: false },
        },

      ],

      yAxis: [
        {
          //      name: "电价",
          // nameGap: 4, // 设置名称与坐标轴的距离为 20px
          // nameLocation: "end", // 在起始位置显示
          // nameTextStyle: {
          //   color: "#fff", // 坐标轴名称的字体颜色
          //   fontSize: 11, // 坐标轴名称的字体大小
          // },
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            color: "black",
            opacity: 0.8,
            fontSize: 10, // 设置字体大小为 12px
            formatter: function (value: any, index: number) {
              if (index % 2 === 1) {
                return Number(value).toFixed(0); // 返回奇数位置的刻度标签值
              } else {
                return ""; // 返回空字符串，不显示偶数位置的刻度标签
              }
            },
          },
          axisLine: {
            show: true,
            lineStyle: {},
          },
        },
      ],
      series: [
        {
          type: "line",
          symbol: "circle",
          symbolSize: 6,
          showSymbol: false,
          name: "预计支出",
          zlevel: 3,
          lineStyle: {
            normal: {
              width: 2,
            },
          },
          smooth: false,
          data: echarty1,
        },
        {
          type: "line",
          symbol: "circle",
          symbolSize: 6,
          showSymbol: false,
          name: "实际支出",
          zlevel: 3,
          lineStyle: {
            normal: {
              width: 2,
            },
          },
          smooth: false,
          data: echarty2,
        },
        {
          type: "line",
          symbol: "circle",
          symbolSize: 6,
          showSymbol: false,
          name: "实际回款",
          zlevel: 3,
          lineStyle: {
            normal: {
              width: 2,
            },
          },
          smooth: false,

          data: echarty3,
        },
      ],
    },
  });

  state.option && myChart.setOption(state.option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
};
// Change time
let changeTime = (a: any, b: any) => {
  // new Date() 构造函数会创建一个新的 Date 对象，并且默认初始化为当前的日期和时间。如果你不传递任何参数，new Date() 会返回当前的日期和时间。
  //如果传递了参数，如一个日期字符串、一个时间戳或年、月、日等值，new Date() 会根据这些输入初始化 Date 对象对应的日期和时间
  const date1 = new Date(a);
  const year1 = date1.getFullYear();
  const month1 = (date1.getMonth() + 1).toString().padStart(2, "0");
  const day1 = date1.getDate().toString().padStart(2, "0");

  const date2 = new Date(b);
  const year2 = date2.getFullYear();
  const month2 = (date2.getMonth() + 1).toString().padStart(2, "0");
  const day2 = date2.getDate().toString().padStart(2, "0");
  timeLineVal.value[0] = `${year1}-${month1}-${day1}`;
  timeLineVal.value[1] = `${year2}-${month2}-${day2}`;
}
let getData = () => {
  if (!timeLineVal.value) {
    timeLineVal.value = [localStorage.getItem('mouthFirstDay'), localStorage.getItem('now')];
  }
  echartX.value = [];
  echarty1.value = [];
  echarty2.value = [];
  echarty3.value = [];
  changeTime(timeLineVal.value[0], timeLineVal.value[1]);
  let payLoad = reactive({
    beginDate: timeLineVal.value[0],
    endDate: timeLineVal.value[1]

  });
  biao12(payLoad).then((res) => {
    // console.log(res.data.data, '金额趋势');
    let newArr: any = res.data.data;
    //  创建统一的时间轴

    // Object.keys(newArr.预计支出)：这将newArr.预计支出 对象的所有键名提取出来，返回一个数组。
    // Object.values()方法正是用来从一个对象中提取所有的值
    const charSet: any = ref(new Set(Object.keys(newArr.预计支出).concat(Object.keys(newArr.实际支出), Object.keys(newArr.实际回款))))
    const sortedDates = Array.from(charSet.value).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
    // console.log(sortedDates, 'sortedDates');
    sortedDates.forEach((date) => {
      echartX.value.push(date);
    });
    // 遍历统一的时间轴，填充数据
    sortedDates.forEach((date) => { // 对于每个元素（即每个日期date），执行提供的回调函数。
      echarty1.value.push(Number(newArr.预计支出[date] || 0)); // 从newArr对象中获取与当前遍历的日期date相关联的值。
      echarty2.value.push(Number(newArr.实际支出[date] || 0));//使用逻辑或运算符||提供默认值0，确保即使没有数据，也不会导致错误或异常。
      echarty3.value.push(Number(newArr.实际回款[date] || 0)); // Numbe表达式将从newArr中获取的值转换为数字类型
    });
    initEcharts();
  });
};
onMounted(() => {
  geiTime();
  getData();

});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<style setup lang="less" scoped>
.xq {
  position: absolute;
  font-size: 0.8vw;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  top: 5vh;
}

.xq:hover::before {
  content: '查看详情';
  position: absolute;
  top: 25px;
  /* 根据需要调整位置 */
  left: 0;
  width: 55px;
  background-color: #fff;
  /* 可选：背景色 */
  padding: 5px;
  /* 可选：内边距 */
  border: 1px solid #ccc;
  /* 可选：边框 */
  border-radius: 4px;
  /* 可选：边框圆角 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  /* 可选：阴影 */
  font-size: 12px;
  /* 可选：字体大小 */
  color: #333;
  /* 可选：字体颜色 */
}

/deep/.el-date-editor {
  --el-date-editor-daterange-width: 185px;
  // --el-date-editor-daterange-height: 185px;
}

/deep/.el-input__icon:nth-of-type(1) {
  display: none;
}

/deep/.el-input__icon {
  // background-color: #6AB4E5;
  position: relative;
  left: 0.2vw;
}

.select {

  position: absolute;
  top: 10px;
  font-size: 14px;
  left: 160px;
}

.el-button {
  color: white;
  // width: 50px;
  // height: 30px;
  // position: relative;
  position: absolute;
  top: 0vh;

  left: 290px;
  margin-left: -15px;
  padding: 0px 8px;
}

#all1 {
  box-sizing: border-box;
  width: 99.5%;
  // top: 2%;
  // left: 2%;
  margin: auto;
  height: 98%;
  position: relative;
  border: 2px solid rgb(184, 172, 172);
}

.title {

  color: black;
  // font-size: 1.5vh;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  display: inline-block;
  height: 1.5rem;

  top: 5px;
  // left: 8px;
  // 文字间距
  letter-spacing: 1px;
  border-right: 2px solid #4080D4;
  /* 右侧边框 */
  border-top: 2px solid #4080D4;
  /* 上方边框 */
  border-bottom: 2px solid #4080D4;
  //   border: 1px solid #4080D4;
  border-top-right-radius: 10px;
  /* 设置右上角为10像素的圆角 */
  border-bottom-right-radius: 10px;

  /* 设置右下角为10像素的圆角 */
  // padding-bottom: 3px;
  .wenzi {

    position: relative;
    // top: 0.1rem;

  }

  .ball {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: black;
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
  }
}


.chart {
  height: 275px;
  width: 100%;
  position: relative;
  top: 10px;
}
</style>