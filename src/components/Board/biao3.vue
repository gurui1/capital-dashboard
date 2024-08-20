<template>
  <div class="wBox">
    <div class="bodyTop">
      <div class="title">
        <div class="wenzi">搜索条件</div>
      </div>
      <div class="search">
        <div class="top">
          <div class="three">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;日期: &nbsp;&nbsp;</span>
            <el-date-picker v-model="timeLineVal" type="daterange" range-separator="至" start-placeholder="开始时间"
              end-placeholder="结束时间" :disabled-date="disabledDate" />
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;账户名称: &nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="jianCheng" multiple collapse-tags collapse-tags-tooltip placeholder="请选择"
            style="width: 240px">
            <el-option v-for="item in selectDataStore.accountName" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>

          </div>
          <div class="three">
            <span>&nbsp;&nbsp;归属BU: &nbsp;&nbsp;&nbsp;</span>
            <!-- <el-input v-model="guiShu" style="width: 6.4vw"> </el-input> -->
            <el-select v-model="guiShu" clearable placeholder="请选择" style="width:  6vw">
              <el-option v-for="item in selectDataStore.belongBu" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
          <div class="four">
            <span>&nbsp;&nbsp;预计支出金额: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="yuJi1" style="width: 6.4vw"> </el-input>
            &nbsp;一&nbsp;
            <el-input v-model="yuJi2" style="width: 6.4vw"> </el-input>

          </div>

        </div>
        <div class="bottom">
          <div class="three">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;一级业务: &nbsp;&nbsp;&nbsp;</span>

            <el-select v-model="yijiYW" clearable placeholder="请选择" style="width:  6vw">
              <el-option v-for="item in selectDataStore.firstBusiness" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;二级业务: &nbsp;&nbsp;&nbsp;</span>
            <!-- <el-input v-model="erjiYW" style="width: 6.4vw"> </el-input> -->
            <el-select v-model="erjiYW" clearable placeholder="请选择" style="width:  6vw">
              <el-option v-for="item in selectDataStore.secondBusiness" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;部门: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="buMen" style="width: 6.4vw"> </el-input>
          </div>
          <div class="four">
          </div>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" class="btn" @click="getData">查询&nbsp;
        </el-button>
        <el-button type="primary" class="btn" @click="toExcel">导出&nbsp;
        </el-button>
      </div>

    </div>
    <div class="bodyBottom">
      <div class="title2"> <span class="wenzi">查询结果</span></div>

      <el-table  :data="tableData" border class="table"
        :row-style="{ fontSize: '14px', height: '43px', padding: '10px' }">
        <el-table-column align="center" prop="日期" label="日期" width="200" />
        <el-table-column align="center" prop="账户名称" label="账户名称" width="300" />
        <!-- <el-table-column align="center" prop="账户简称" label="账户简称" width="180" /> -->
        <el-table-column align="center" prop="归属BU" label="归属BU" width="180" />
        <el-table-column align="center" prop="一级业务" label="一级业务" width="180" />
        <el-table-column align="center" prop="二级业务" label="二级业务" width="180" />
        <!-- <el-table-column align="center" prop="体系" label="体系" width="200" /> -->
        <el-table-column align="center" prop="部门" label="部门" width="180" />
        <el-table-column align="center" prop="预计支出金额" label="预计支出金额(人民币)" />
      </el-table>
      <div class="last">
        <div class="lastone" style="position:relative;left: 0px;width: 200px;">总计</div>
        <div class="lastone" style="position:relative;left: 1050px;">{{ renminbi }}</div>
      </div>
    
      <el-pagination class="fenye" v-model:current-page="currentPage" v-model:page-size="pageSize" :disabled="disabled"
        :background="background" layout="total,,sizes, prev, pager, next , jumper" :total=total
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />


    </div>
  </div>
</template>

<script setup lang="ts">
import { biaoThree, } from "@/api/dataBoard/api";
import { exportExcel } from "../../excelConfig"
import { excelThree } from "@/api/dataBoard/excel";
import { useSelectDataStore } from '../../store/home';
const selectDataStore = useSelectDataStore();

const currentPage: any = ref(1)
const pageSize = ref(10)
const background = ref(true)
const disabled = ref(false)
const handleSizeChange = (e: any) => {
  pageSize.value = e;
  pageSize.value = e;
  // getData2();
  getData();
};
const handleCurrentChange = (e: any) => {
  currentPage.value = e;
  currentPage.value = e;
  // getData2();
  getData();

};

let timeLineVal: any = ref([]);
let jianCheng: any = ref([])
let guiShu: any = ref()
let yuJi1: any = ref()
let yuJi2: any = ref()
let yijiYW: any = ref()
let erjiYW: any = ref()

let buMen: any = ref()

const tableData: any = reactive([]);
const total = ref(0);
let toExcel = () => {
  let payLoad = reactive({
    accountNameList: jianCheng.value,
    belongBu: guiShu.value,
    startApplyDate: timeLineVal.value[0],
    endApplyDate: timeLineVal.value[1],
    startAmount: yuJi1.value,
    endAmount: yuJi2.value,
    firstBusiness: yijiYW.value,
    secondBusiness: erjiYW.value,
    depart: buMen.value,
  });
  excelThree(payLoad)
  .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      // // 设置下载的文件名，包括文件扩展名
      link.setAttribute('download', '预计支出表.xlsx');
      //将<a>元素添加到DOM树中（通常添加到document.body），然后模拟点击这个<a>元素，从而触发文件下载。
      //下载完成后，<a>元素被从DOM中移除，以避免潜在的内存泄漏问题。
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // 清理URL
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      // 失败时的处理逻辑
      console.error('请求失败，错误信息为：', error);
    });
  // exportExcel('预计支出表', tableData);

};
const disabledDate = (time: Date) => {
  const currentTime = new Date();
  // 设置 currentTime 为昨天的同一时刻
  currentTime.setDate(currentTime.getDate() - 1);
  // 禁用小于昨天的日期
  return time.getTime() < currentTime.getTime();
}

let geiTime = () => {
  timeLineVal.value[1] = localStorage.getItem('nextMouthFirstDay');
  timeLineVal.value[0] = localStorage.getItem('now');
}
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
  // console.log(a,b,'ab');
  timeLineVal.value[0] = `${year1}-${month1}-${day1}`;
  timeLineVal.value[1] = `${year2}-${month2}-${day2}`;
}

let renminbi: any = ref()
let getData = async () => {
  if (!timeLineVal.value) {
    // timeLineVal.value = [localStorage.getItem('mouthFirstDay'), localStorage.getItem('now')];
    timeLineVal.value= [localStorage.getItem('now'),'2030-01-01'];
  }
  
  await changeTime(timeLineVal.value[0], timeLineVal.value[1]);
  let payLoad = reactive({
    accountNameList: jianCheng.value,
    belongBu: guiShu.value,
    startApplyDate: timeLineVal.value[0],
    endApplyDate: timeLineVal.value[1],
    startAmount: yuJi1.value,
    endAmount: yuJi2.value,
    firstBusiness: yijiYW.value,
    secondBusiness: erjiYW.value,
    depart: buMen.value,
    pageSize: pageSize.value,
    pageNum: currentPage.value,
  });
  try {
    const response = await biaoThree(payLoad);
    const resArr = response.data.data.pageInfo.list;
    tableData.splice(0, tableData.length); // 清空原有数据
    resArr.forEach((item: { applyDate: any; accountName: any; belongBu: any; firstBusiness: any; secondBusiness: any; depart: any; amount: any; }) => {
      tableData.push({
        日期: item.applyDate,
        账户名称: item.accountName,
        归属BU: item.belongBu,
        一级业务: item.firstBusiness,
        二级业务: item.secondBusiness,
        部门: item.depart,
        预计支出金额: item.amount
      });
    });
    total.value = response.data.data.pageInfo.total;
    renminbi.value = response.data.data.amountTotal;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

};

onMounted(() => {
  geiTime();
  getData();

});
onUnmounted(() => { });
</script>

<style lang="less" scoped>
.last{
  font-size: 16px;
  letter-spacing: 1px;
  position: relative;
  top: 2px;
  
}
.lastone{
  display: inline-block;
  width: 300px;
  text-align: center;
}

/deep/.el-date-editor {
  --el-date-editor-daterange-width: 185px;
}

/deep/.el-input__icon:nth-of-type(1) {
  display: none;
}

/deep/.el-input__icon {
  // background-color: #6AB4E5;
  position: relative;
  left: 0.2vw;
}

.wBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
}

.bodyTop {
  width: 98.8%;
  height: 180px;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0px #d9d9d9;
  display: flex;
  align-items: center;
  flex-direction: column;

  .title {
    flex: 1;
    width: 100%;

    .wenzi {
      letter-spacing: 1px;
      line-height: 40px;
      width: 120px;
      height: 40px;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
      background-color: #6AB4E5;
      border-radius: 5px;
      text-align: center;
      position: relative;
      top: 9px;
      left: 20px;
    }
  }

  .search {

    width: 100%;
    flex: 2;
    // background-color: blue;
    // height: 14vh;
    // background-color: red;
    position: relative;
    // left: -10%;
    // left: -5vw;
    // top: 2vh;
    display: flex;
    flex-direction: column;

    .top {
      flex: 1;
      display: flex;
      flex-direction: row;
      top: 18px;
      position: relative;

      .three {
        flex: 1;

      }

      .four {
        flex: 1.5;
      }
    }

    .bottom {
      flex: 1;
      display: flex;
      flex-direction: row;
      top: 9px;
      box-sizing: border-box;
      position: relative;

      .three {
        flex: 1;
      }

      .four {
        flex: 1.5;
      }
    }
  }

  .button {
    width: 100%;
    flex: 0.8;

    // background-color: aqua;
    // height: 4vh;
    .btn {
      margin-top: 4px;
      margin-left: 40px;
    }

    .btn :first-child {
      margin-left: 0vw;
    }
  }
}

.bodyBottom {
  width: 98.8%;
  flex: auto;
  height: 0;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 0px 16px 0px #d9d9d9;
  box-sizing: border-box;
  padding: 15px;
}



.title2 {
  position: relative;
  width: 120px;
  height: 40px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  background-color: #6AB4E5;
  border-radius: 5px;
  text-align: center;
  left: 5px;
  top: 0vh;

  .wenzi {
    letter-spacing: 1px;
    line-height: 38px;
  }
}

.table {
  width: 98%;
  height: 485px;
  // background-color: #6AB4E5;
  margin-top: 10px;

  .zanwu {
    position: relative;
    left: 700px;
    top: 29px;
    font-size: 40px;
    letter-spacing: 2px;
    color: rgba(128, 128, 128, 0.6);
    /* 使用 RGBA 表示灰色，最后一个值 0.6 表示透明度 */
    font-weight: bold;
  }
}

.fenye {
  display: flex;
  /* 启用Flexbox布局 */
  justify-content: flex-start;
  /* 内容在主轴上向右对齐 */
  align-items: center;
  /* 内容在交叉轴上居中对齐 */
  position: relative;
  /* 或者使用sticky/fixed定位，取决于需求 */
  width: 98%;
  /* 占据父元素的全部宽度 */
  height: auto;
  /* 自动高度，适应内容 */
  top: 7px;
}

/deep/.el-table {
  // --el-table-border-color: rgba(156, 136, 136,0.5);
  // --el-table-border: 1px solid rgba(156, 136, 136,0.5);
  // --el-table-text-color: #21448b;
  // --el-table-header-text-color: #4168b7;
}
</style>
