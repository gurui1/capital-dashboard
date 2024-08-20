<template>
  <div class="wBox">
    <div class="bodyTop">
      <div class="title">
        <div class="wenzi">搜索条件</div>
      </div>
      <div class="search">
        <div class="three">
          <span> &nbsp;&nbsp; &nbsp;&nbsp; 账户名称 : &nbsp; </span>
          <!-- <el-input v-model="jianCheng" style="width: 6.4vw"></el-input> -->
          <el-select v-model="jianCheng" multiple collapse-tags collapse-tags-tooltip placeholder="请选择"
            style="width: 240px">
            <el-option v-for="item in selectDataStore.accountName" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <!-- <div class="one">
          <span> 账户类别: &nbsp; </span>
          <el-select v-model="leiBie" clearable placeholder="请选择" style="width:  7vw">
            <el-option v-for="item in accountType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div> -->

        <div class="other">
          <span> 银行余额: &nbsp; </span>
          <el-input v-model="yuE1" style="width: 6.4vw"></el-input> &nbsp;
          一 &nbsp;
          <el-input v-model="yuE2" style="width: 6.4vw"></el-input>
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
        :row-style="{ fontSize: '14px', height: '45px', padding: '10px' }">
        <el-table-column align="center" prop="账户名称" label="账户名称" width="300" />
        <el-table-column align="center" prop="账户简称" label="账户简称" width="220" />
        <!-- <el-table-column align="center" prop="账户类别" label="账户类别" width="220" /> -->
        <el-table-column align="center" prop="预计期末余额" label="银行余额" width="220">
          <template #header>
            <span>预计期末余额&nbsp;</span>
            <span>(人民币)</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="理财" label="理财" width="220" />
        <el-table-column align="center" prop="贷款" label="贷款" width="220" />
        <el-table-column align="center" prop="合计" label="合计" width="220" />
      </el-table>
      <div class="last">
        <div class="lastone" style="position:relative;left: 0;width: 300px;">总计</div>
        <div class="lastone" style="position:relative;left: 220px;">{{ renminbi }}</div>
        <div class="lastone" style="position:relative;left: 220px;">{{ licai }}</div>
        <div class="lastone" style="position:relative;left: 220px;">{{ daikuan }}</div>
        <div class="lastone" style="position:relative;left: 220px;">{{ heji }}</div>
      </div>
      <!-- <div v-if="tableData.length == 0" class="table">
        <span class="zanwu">暂无数据</span>
      </div> -->
      <el-pagination class="fenye" v-model:current-page="currentPage" v-model:page-size="pageSize" :disabled="disabled"
        :background="background" layout=" total,sizes, prev, pager, next , jumper," :total=total
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />


    </div>
  </div>
</template>

<script setup lang="ts">
import { biaoTwo } from "@/api/dataBoard/api";
import { exportExcel } from "../../excelConfig"
import { excelTwo } from "@/api/dataBoard/excel";
import { useSelectDataStore } from '../../store/home';
const selectDataStore = useSelectDataStore();

const currentPage: any = ref(1)
const pageSize = ref(10)
const background = ref(true)
const disabled = ref(false)
const handleSizeChange = (e: any) => {
  pageSize.value = e;
  pageSize.value = e;
  getData();
};
const handleCurrentChange = (e: any) => {
  currentPage.value = e;
  currentPage.value = e;
  getData();
};



let yuE1: any = ref()
let yuE2: any = ref()
let jianCheng: any = ref([])

const tableData: any = reactive([]);
const total = ref(0);

let renminbi: any = ref(0)
let licai: any = ref(0)
let daikuan: any = ref(0)
let heji: any = ref(0)

let getData = async () => {
  let payLoad = reactive({
    accountNameList: jianCheng.value,
    startInitialBalance: yuE1.value,
    endInitialBalance: yuE2.value,
    pageSize: pageSize.value,
    pageNum: currentPage.value,
  });
  try {
    const response = await biaoTwo(payLoad);
    const resArr = response.data.data.pageInfo.list;
    tableData.splice(0, tableData.length); // 清空原有数据
    resArr.forEach((item: { accountName: any; terminalBalance: any; financialManagement: any; receipts: any; total: any; }) => {
      tableData.push({
        账户名称: item.accountName,
        账户简称: item.shortName,
        预计期末余额: item.terminalBalance,
        理财: item.financialManagement,
        贷款: item.receipts,
        合计: item.total
      });
    });
    total.value = response.data.data.pageInfo.total;
    renminbi.value = response.data.data.terminalBalanceTotal;
    licai.value = response.data.data.financeTotal;
    daikuan.value = response.data.data.receiptsTotal;
    heji.value = response.data.data.totalAll;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

};
let toExcel = () => {
  let payLoad = reactive({
    accountName: jianCheng.value,
    startInitialBalance: yuE1.value,
    endInitialBalance: yuE2.value,
  });
  excelTwo(payLoad)
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      // // 设置下载的文件名，包括文件扩展名
      link.setAttribute('download', '预计期末余额表.xlsx');
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
  // exportExcel('银行余额表', tableData);

};



onMounted(() => {
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
  width: 220px;
  // height: 50px;
  // background-color: red;
  text-align: center;
}

.wBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bodyTop {
  width: 98.8%;
  height: 155px;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0px #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;

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
    flex: 1;
    width: 60%;
    position: relative;
    left: -20%;
    // background-color: #6AB4E5;
    display: flex;
    box-sizing: border-box;
    margin-top: 19px;

    .one {
      flex: 1;
    }

    .other {
      flex: 1.5;
    }

    .three {
      flex: 1.5;
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
  height: 510px;
  // background-color: #6AB4E5;
  margin-top: 9px;

  .zanwu {
    position: relative;
    left: 700px;
    top: 30px;
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
  // --el-table-border-color: rgba(156, 136, 136, 0.5);
  // --el-table-border: 1px solid rgba(156, 136, 136, 0.5);
  // --el-table-text-color: #21448b;
  // --el-table-header-text-color: #4168b7;
}
</style>
