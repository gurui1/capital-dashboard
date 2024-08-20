<template>
  <div id="all" ref="wBoxRef">
    <div class="top">
      <span class="title">财务数据分析看板</span>
      <!-- <a  href="http://127.0.0.1:5173/" target="_blank" >跳转</a> -->

      <div class="twoBtn">
        <!-- <div class="one" @click="dialogVisible1 = true">操作日志</div>
        <el-dialog v-model="dialogVisible1" width="800" height="1000">
          This is dialog content.
        </el-dialog> -->
        <div class="two" @click="tuiSong">推送至移动端</div>

        <el-dialog v-model="dialogVisible2" :show-close="false" class="dialog">
          <div class="dialog-title">
            <span class="wenzi"> 推送设置</span>
            <el-icon class="button" @click="close2">
              <Close />
            </el-icon>
          </div>
          <div class="dialog-body">
            <div>
              <div class="dialog-body-one">
                <span class="label">接收人 : </span>
                <!-- <input type="text"> -->

                <el-select-v2 v-model="selectPeople" filterable :options="options" placeholder="请选择"
                  style="width: 320px" multiple />
              </div>
              <div class="dialog-body-two">
                <span class="label">移动端图片 : </span>
                <div v-if="imageUrl" @dblclick="showPng">
                  <!-- <img> 元素负责显示捕获到的PNG格式图像。它的 src 属性被设置为 imageUrl，这是一个包含PNG图像数据的URL，通过这种方式展示在用户界面上。 -->
                  <img class="png" :src="imageUrl" alt="Captured Image">
                </div>
                <div v-if="showModal" class="modal">
                  <div class="modal-content">
                    <span class="close" @click="closePng">&times;</span>
                    <!-- <a> 元素使用了 href 属性，将 imageUrl 设置为其值。这个链接允许用户点击下载捕获的图像。
                      通过设置 download 属性为 "账单.png"，浏览器会提示用户下载文件，文件名为“数据看板.png”。 -->
                    <a class="Download" :href="imageUrl" download="数据看板.png">
                      下载</a>
                    <img :src="imageUrl" alt="Captured Image">

                  </div>
                </div>
              </div>
              <div class="dialog-body-three">
                <div class="one1" @click="faSong">确定发送</div>
                <div class="two1" @click="close2">取消</div>

              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>

    <div class="mid">
      <div class="left">
        <pieEcharts1 :title="'期初余额'" @custom-event="handleCustomEventFromA"></pieEcharts1>
      </div>
      <div class="right">
        <pieEcharts2 :title="'预计期末余额'" :messageFromA="messageForB"></pieEcharts2>
      </div>

    </div>
    <div class="other">
      <div class="left">
        <other :title="'今日预计支出金额'"></other>
      </div>
      <div class="right">
        <other :title="'今日预计回款金额'"></other>
      </div>
    </div>
    <div class="mid">
      <div class="left">
        <div class="one">

          <lineEcharts1 :title="'预计支出金额部门统计'" :panduan="a"></lineEcharts1>
        </div>
        <div class="one">
          <lineEcharts2 :title="'预计支出金额业务统计'" :panduan="a"></lineEcharts2>
        </div>

      </div>
      <div class="right">
        <div class="one">
          <lineEcharts1 :title="'预计回款金额部门统计'" :panduan="a"></lineEcharts1>
        </div>
        <div class="one">
          <lineEcharts2 :title="'预计回款金额业务统计'" :panduan="a"></lineEcharts2>
        </div>
      </div>

    </div>
    <div class="mid">
      <div class="left">
        <lineEchartsL :title="'金额趋势'" :panduan="a"></lineEchartsL>
      </div>


    </div>
    <div class="mid" style="margin-top: 5px ;">
      <div class="left">
        <div class="one">
          <lineEcharts1 :title="'实际支出金额部门统计'" :panduan="a"></lineEcharts1>
        </div>
        <div class="one">
          <lineEcharts2 :title="'实际支出金额业务统计'" :panduan="a"></lineEcharts2>
        </div>

      </div>
      <div class="right">
        <div class="one">
          <lineEcharts1 :title="'实际回款金额部门统计'" :panduan="a"></lineEcharts1>
        </div>
        <div class="one">
          <lineEcharts2 :title="'实际回款金额业务统计'" :panduan="a"></lineEcharts2>
        </div>
      </div>

    </div>

  </div>

</template>
<script setup lang="ts">
import pieEcharts1 from "../components/echarts/pieEcharts1.vue"
import pieEcharts2 from "../components/echarts/pieEcharts2.vue"
import lineEchartsL from "./echarts/lineEchartsL.vue"
import lineEcharts1 from "./echarts/lineEcharts1.vue"
import lineEcharts2 from "./echarts/lineEcharts2.vue"
import other from "./echarts/other.vue"
import html2canvas from 'html2canvas';
import { debounce } from 'lodash';// 防抖
import { push } from '../api/dataBoard/push'
import { peopleSelect } from '../api/dataBoard/api'


import { useSelectDataStore } from '../store/home';
const selectDataStore = useSelectDataStore();

// let dialogVisible1 = ref(false)
let dialogVisible2 = ref(false)
let a = ref(true)
let messageForB: any = ref();
function handleCustomEventFromA(payload: any) {
  // 父组件接收来自子组件A的事件，并处理数据

  messageForB.value = payload;
}
// 将DataURL转换为Blob
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
// let test: any = ref(23051065)
const selectPeople = ref([])
// console.log(selectPeople.value);

let faSong = async () => {
  a.value = true
  dialogVisible2.value = false;
  let joker: any = ref(false);

  const file = dataURLtoFile(imageUrl.value, 'screenshot.png');
  // console.log(file,'file')
  // 然后你可以使用这个file对象上传到服务器
  const formData = new FormData();
  formData.append('userIds', selectPeople.value); // 假设selectPeople.value是一个数组
  formData.append('file', file); // 注意这里使用的是转换后的文件对象
  // 调接口 传图片 
  // let payLoad = {
  //   userIds: selectPeople.value,
  //   imageUrl: imageUrl
  // }
  try {
    push(formData); // 直接调用push函数
    // const response = await push(payLoad);
    // 假设response中有一个属性success表示请求是否成功
    // if (response.success) {
      joker.value = true;
    // } else {
    //   joker.value = false;
    //   console.error('请求成功，但返回值表示失败');
    // }
  } catch (error) {
    // joker.value = false;
    console.error('请求失败，错误信息为：', error);
  }


  if (joker.value == true) {
    ElMessage({
      message: '推送成功.',
      type: 'success',
    })
  } else {
    ElMessage.error('推送失败，请联系系统管理员排查.')
  }
}
let close2 = () => {
  a.value = true
  dialogVisible2.value = false
  showModal.value = false;
}




watch(dialogVisible2, (newValue) => {
  if (!newValue) {
    showModal.value = false;
  }
});


const imageUrl: any = ref(null);
const showModal: any = ref(false);
const wBoxRef: any = ref(null);

const captureAndDisplay = () => {
  const element = wBoxRef.value;
  if (element) {
    // 使用 html2canvas 库，将指定的HTML元素转换为一个canvas对象。这个库能够将DOM元素呈现为canvas
    html2canvas(element, {}).then((canvas) => {
      const ctx = canvas.getContext('2d'); // 获取canvas的2D渲染上下文
      // 在截图上添加水印
      addTextWatermark(ctx, canvas);

      // canvas.toDataURL("image/png") 将canvas对象转换为一个包含PNG格式图像数据的base64编码的数据URL
      const imgData = canvas.toDataURL("image/png");
      imageUrl.value = imgData;
      // console.log(imageUrl.value)
    });
  }
};



//加水印
const addTextWatermark = (ctx, canvas) => {
  // 设置水印文本
  const watermarkText = "仅 限 公 司 资 金 规 划 使 用，严 禁 外 泄";

  // 设置字体样式
  ctx.font = "normal 68px Arial";
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";

  const startX = 500;
  const startY = canvas.height - 200;

  // 设置水印的结束位置（右上角）
  const endX = canvas.width + 100;
  const endY = 400;

  // 计算水印文本的长度
  const textWidth = ctx.measureText(watermarkText).width;

  // 计算水印的斜率
  const angle = Math.atan((startY - endY) / (endX - startX));

  // 旋转坐标系统
  ctx.translate(startX, startY);
  ctx.rotate(-angle);

  // 绘制水印文本
  ctx.fillText(watermarkText, 0, 0);

  // 恢复坐标系统
  ctx.rotate(angle);
  ctx.translate(-startX, -startY);
};


// 多次触发 tuiSong 函数后，在最后一次触发后的 300ms 后函数才会被执行。
let tuiSong = debounce(async () => {
  a.value = false


  nextTick(() => {
    captureAndDisplay();
  });
  setTimeout(() => {
    dialogVisible2.value = true
  }, 100);


  // }, 100);

}, 300)
const showPng = () => {
  showModal.value = true;

};
const closePng = () => {
  showModal.value = false;
};
let options: any = reactive([])
let huoqu = () => {
  peopleSelect().then((res) => {
    let newArr = res.data.data.userMap
    // console.log(newArr,'newarr')
    options = Object.entries(newArr).map(([key, value]) => ({
      label: value,
      value: key
    }));
    // console.log(options,'options');
    
  })
}
onMounted(() => {
  huoqu()
  //点击推送后 在弹窗里显示

});
</script>

<style setup lang="less" scoped>
@import './dialog.css';



#all {
  // background-color: aqua;
  width: 1414px;
  height: 1500px;
  display: flex;
  flex-direction: column;


}

.top {
  flex: 1;
  // background-color: rgb(231, 222, 222);

  .title {
    position: relative;
    // 将元素的中心点移动到其父元素的中心位置 根据元素本身的宽度和高度的一半来移动元素，使其相对于其父元素居中。
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    font-size: 30px;
    font-weight: bold;
    color: #000;
    letter-spacing: 10px;
    display: inline-block;
  }
}

.mid {
  flex: 5;
  // background-color: rgb(184, 219, 184);
  display: flex;
  flex-direction: row;

  .left {
    flex: 1.2;
    // background-color: red;
    display: flex;

    .one {
      flex: 1;
      //  border: 2px solid rgb(184, 172, 172);
    }

  }

  .right {
    flex: 1.2;
    display: flex;
    margin-left: 2px;

    .one {
      flex: 1;
      //  border: 2px solid rgb(184, 172, 172);

    }

    // background-color: aliceblue;
  }




}

.other {
  flex: 1.5;
  // background-color: rgb(184, 219, 184);
  display: flex;
  flex-direction: row;

  .left {
    flex: 1;
  }

  .right {
    flex: 1;
  }
}

.bottom {
  flex: 12;
  // background-color: rgb(178, 178, 201);
  display: flex;
  flex-direction: column;

  .every {
    flex: 1;
    // background-color: #000;
    display: flex;
    flex-direction: row;

    .one {
      flex: 1.1;
      // background-color: aliceblue
    }

    .two {
      flex: 1;
      // background-color: rgba(124, 15, 15, 0.541);
    }
  }

}

.twoBtn {
  position: relative;
  width: 130px;
  // top: 13vh;
  // right: 5vw;
  height: 48px;
  left: 1280px;
  display: inline-block;
  // background-color: red;
  display: flex;
  font-size: 15px;
  letter-spacing: 1px;
  text-align: center;
  line-height: 48px;

  /* 垂直居中 */
  .one {
    flex: 1;
    background-color: #95F204;
    box-sizing: border-box;
    border: 1px rgb(235, 228, 228) solid;
    border-radius: 15px;
    cursor: pointer;
    // padding: 0.5vw;
    color: black;
    font-weight: bold;


  }

  .two {
    flex: 1;
    background-color: #81D3F8;
    box-sizing: border-box;
    border: 1px rgb(235, 228, 228) solid;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 20px;

    color: white;

    font-weight: bold;

  }



}
</style>