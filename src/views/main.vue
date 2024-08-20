<template>
  <div class="zwBox">
    <!-- :collapse 动态绑定是否关闭 :default-active动态绑定应打开的页面 
     unique-opened	是否只保持一个子菜单的展开 默认为false 即可同时打开多个子菜单 -->
    <el-menu
      class="menuSty"
      :collapse="useMain().isCollapse"
      background-color="#45484A"
      :unique-opened="true"
      :default-active="useMain().cebianName"
      text-color="#fff"
      @select="handleSelect"
    >
    <!-- 按钮 -->
      <div
        v-if="useMain().closeButton"
        style="
          top: 0;
          position: absolute;
          height: 68px;
          display: flex;
          align-items: center;
        "
        :style="{ right: useMain().isCollapse ? '5px' : '0px' }"
      >
        <button
          id="mybutton"
          class="button"
          @click="menuChange"
          :style="{
            transform: useMain().isCollapse
              ? 'scale(0.6) translateX(5px) rotate(180deg)'
              : 'scale(0.6) translateX(5px) rotate(0deg)',
          }"
        >
          <div class="button-box">
            <span class="button-elem">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
            <span class="button-elem">
              <svg viewBox="0 0 46 40">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
          </div>
        </button>
      </div>
      <!-- 资金看板前图案 -->
      <div
        style="
          height: 68px;
         
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
        "
        :style="{ marginRight: useMain().isCollapse ? '5px' : '0px' }"
      >
        <div
          style="display: flex; align-items: center"
          v-if="!useMain().closeButton || !useMain().isCollapse"
        >
          <svg
            style="width: 28px; position: absolute; left: 20px"
            t="1712572286509"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="35047"
            width="128"
            height="128"
          >
            <path
              d="M512.384 64l420.7744 224v448L512.384 960 91.6224 736v-448L512.384 64z m0 176.512L257.408 376.256v271.488L512.384 783.488l254.9888-135.744v-271.488L512.3968 240.512z"
              fill="#1989FA"
              opacity=".3"
              p-id="35048"
            ></path>
            <path
              d="M512.384 342.4l159.3088 84.8v169.6L512.384 681.6128l-159.296-84.8128v-169.6zM486.4 283.008V149.2352a76.8 76.8 0 1 1 51.2 0v133.76a232.9344 232.9344 0 0 0-51.2 0z m211.1104 92.3264l147.7504-85.2992a76.8 76.8 0 1 1 22.3744 46.208l-144.4864 83.4048a230.1568 230.1568 0 0 0-25.6384-44.3136z m25.6384 229.0176l144.4736 83.4048a76.8 76.8 0 1 1-22.3744 46.208l-147.7376-85.2992c10.112-13.696 18.7264-28.544 25.6384-44.3136zM537.6 740.992v133.7728a76.8 76.8 0 1 1-51.2 0v-133.76a232.9344 232.9344 0 0 0 51.2 0z m-211.1104-92.3264L178.7392 733.952a76.8 76.8 0 1 1-22.3744-46.208l144.4864-83.4048a230.1568 230.1568 0 0 0 25.6384 44.3136z m-25.6384-229.0176L156.3776 336.256a76.8 76.8 0 1 1 22.3744-46.208l147.7376 85.2992a230.1568 230.1568 0 0 0-25.6384 44.3136z"
              fill="#1989FA"
              p-id="35049"
            ></path>
          </svg>
        </div>
        <div
          v-if="!useMain().isCollapse"
          style="
            text-wrap: nowrap;
            color: #409eff;
            font-size: 20px;
            font-weight: 550;
            position: absolute;
            left: 55px;
          "
        >
          &nbsp;&nbsp;&nbsp;&nbsp;资金看板
        </div>
      </div>
      <!-- <template> 元素在 Vue.js 中作为循环渲染的容器更加语义化，因为它在最终渲染的 HTML 中不会留下额外的节点。 -->
      <template v-for="item in menuConfig.menu" :key="item.index">
        <resub :configData="item"></resub>
      </template>
    </el-menu>
    <div class="homeMain">
      <div class="mainHeader">
        <div
          class="closeBtn"
          v-if="!useMain().closeButton"
          style=""
          @click="menuChange"
        >
          <el-icon v-if="!useMain().isCollapse"><Fold /></el-icon>
          <el-icon v-else><Expand /></el-icon>
        </div>
        <el-button
          @click="useMain().closeButton = !useMain().closeButton"
          type="primary"
          size="small"
          style="margin-left: 12px"
          ><el-icon style="transform: rotate(90deg)"><Sort /></el-icon
        ></el-button>
        <!-- <el-popover placement="bottom-end" :width="200" trigger="hover">
          <template #default>
            <div class="topSty">
              <div
                class="topSty-item"
                style="grid-row: span 2; margin-left: 10px"
              >
                
                <img
                  src="../assets/imageTou.gif"
                  style="width: 36px; height: 36px"
                  alt=""
                />
              </div>
              <div class="topSty-item">当前角色:</div>
              <div class="topSty-item">{{ userRole }}</div>
            </div>
            <div class="tuichuSty" @click="toGeren">个人中心</div>
            <div class="tuichuSty" @click="tuichu">退出登录</div>
          </template>
          <template #reference>
            <div
              class="rightTou"
              style="width: 150px; height: 100%; position: absolute; right: 0px"
              @mouseenter="touxEnter"
              @mouseleave="touxLeave"
            >
        
              <img class="imgTouxiang" src="../assets/imageTou.gif" alt="" />
              <div
                style="
                  position: absolute;
                  right: 35px;
                  top: 50%;
                  transform: translateY(-50%);
                  cursor: pointer;
                "
              >
                {{ account }}
              </div>
              <el-icon class="elaaa">
                <ArrowDown />
              </el-icon>
            </div>
          </template>
        </el-popover> -->
      </div>
      <div class="sideTabs">
        <el-tabs
          v-model="useMain().cebianName"
          type="card"
          class="demo-tabs"
          closable="true"
          @tab-remove="removeTab"
          @tab-change="changeTab"
        >
          <el-tab-pane
            v-for="item in useMain().editableTabs"
            :key="item.name"
            :name="item.name"
          >
            <template #label>
              <div style="display: flex; align-items: center">
                <el-icon><HelpFilled /></el-icon>
                <div>&nbsp;{{ item.title }}</div>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="homeBody">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/routes";
import { useMain } from "@/store/home.ts";
import menuConfig from "./menu.json";
import resub from "./resub.vue";
// const route = new (useRoute as any)();
// let userImg: any = localStorage.getItem("userImg");
let account = localStorage.getItem("userAccount");
let userRole = localStorage.getItem("userRole");

//删除tabs里面的路由
const removeTab: any = (targetName: string) => {
  if (useMain().cebianName === targetName) {
    useMain().editableTabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab =
          useMain().editableTabs[index + 1] ||
          useMain().editableTabs[index - 1];
        if (nextTab) {
          useMain().cebianName = nextTab.name;
          router.replace(nextTab.name.split("|")[0]);
        }
        if (useMain().editableTabs.length > 1) {
          useMain().editableTabs.splice(index, 1);
        }
      }
    });
  } else {
    useMain().editableTabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        if (useMain().editableTabs.length > 1) {
          useMain().editableTabs.splice(index, 1);
        }
      }
    });
  }
};

//改变tabs标签
const changeTab: any = (targetName: string) => {
  // console.log(targetName);
  router.replace(targetName.split("|")[0]);
};
const handleSelect = (key: string, _keyPath: string[]) => {
  // console.log(key, "6666");
  useMain().cebianName = key;
  // sign用来标记是否有这个标签 默认为true 循环遍历editableTabs 如果有这个标签就赋值为false 如果没有就push进去 
  let sign = true;
  useMain().editableTabs.forEach((item) => {
    // console.log(item.name);
    if (item.name == key) {
      sign = false;
    }
  });
  if (sign) {
    //  split() 方法可以将字符串按照指定的分隔符分割成数组 
    // 在key中寻找 |   “ | ”将字符串分为前后两部分 取后一部分
    useMain().editableTabs.push({ title: key.split("|")[1], name: key });
  }
  // console.log(localStorage.getItem('token'),'00');
  // const token = localStorage.getItem('token');
  // console.log(token);
  
  // if(token == null) {
  //   window.location.href = "http://127.0.0.1:5173/404";
  //   console.log(404);
  // }
   
  // else
   router.replace("/" + key.split("|")[0]);
};
const menuChange = () => {
  useMain().isCollapse = !useMain().isCollapse;

};
const touxEnter = () => {
  document.getElementsByClassName("elaaa")[0].style.transform =
    "rotate(180deg)";
};
const touxLeave = () => {
  document.getElementsByClassName("elaaa")[0].style.transform = "";
};

const tuichu = () => {
  useMain().$reset();
  localStorage.clear();
  router.replace("/login");
};
const toGeren = () => {
  // handleSelect("geren|个人中心", []);
  router.replace("/geren");
};

onMounted(() => {});
onUnmounted(() => {});
</script>

<style lang="less" scoped>
.zwBox {
  width: 100vw;
  height: 100vh;
  display: flex;
}

@bgColor: #0093fc;
@sideSelectColor: #5d5d5d;
// @sideSelectColor: #1e273a;
// @sideBgColor:#161616;
@sideBgColor:#45484A;
//背景颜色
/deep/.el-menu-item {
  height: 50px;
}
/deep/.el-sub-menu__title {
  background-color: @sideBgColor;
  height: 50px;
}
/deep/.el-sub-menu__title:hover {
  background-color: @sideSelectColor;
}
/deep/.el-menu-item:hover {
  background-color: @sideSelectColor;
}
/deep/.el-tabs__item:hover {
  color: #409eff;
}

/deep/.el-tabs__item.is-active {
  background-color: #fff;
}
/deep/.el-tabs {
  height: 100%;
}

//一级类目选中
:deep(.el-sub-menu.is-active) {
  .el-sub-menu__title.el-tooltip__trigger.el-tooltip__trigger {
    color: @bgColor;
    border-right: 4px solid @bgColor;
  }
}
/deep/.el-menu-item.is-active {
  border-right: 4px solid @bgColor;
  color: @bgColor;
  background-color: @sideSelectColor;
}

/deep/.el-menu--vertical:not(.el-menu--collapse) {
  width: 240px;
  flex-shrink: 0;
}

// /deep/.is-active {
//   background-color: #4f4f4f;
// //   width: 400px;
// }

.homeMain {
  flex: 1;
  background-color: #e8e8e8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
}
.homeBody {
  flex: 1;
  
  height: 100vh;
  background-color: white;
  overflow: auto; /* 当内容超出视窗大小时显示滚动条 */
}
.rightTou:hover {
  background-color: #d5d5d5;
}
.mainHeader {
  height: 6.6vh;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  position: relative;
}
.sideTabs {
  height: 40px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 6px 12px 0px #dddddd;
}

.topSty {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(208, 208, 208);
  &-item {
    display: flex;
    align-items: center;
    // justify-content: center;
  }
}
.tuichuSty {
  height: 40px;
  display: flex;
  // justify-content: center;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
.tuichuSty:hover {
  background-color: #dbdada;
}
.imgTouxiang {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  right: 85px;
  top: 50%;
  transform: translateY(-50%);
  // border: 1px solid rgb(52, 52, 52);
  cursor: pointer;
}

.elaaa {
  // background-color: #009087;
  width: 30px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  transition-duration: 0.5s;
  transform-origin: center 25%;
  position: absolute;
  cursor: pointer;
}

// .elaaa:hover {
//     transform: rotate(180deg);
// }
.closeBtn {
  height: 50%;
  width: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 14px;
  font-size: 24px;
}
.closeBtn:hover {
  background-color: #d5d5d5;
}

.button {
  display: block;
  position: relative;
  width: 56px;
  height: 56px;
  margin: 0;
  overflow: hidden;//如果内容溢出，隐藏超出部分。
  outline: none;//清除默认的轮廓样式，通常用于去除链接和输入框的默认轮廓。
  background-color: transparent;// 设置背景颜色为透明，即没有背景色
  transform: scale(0.6) translateX(5px) rotate(180deg); //先缩小到原来的 60%（scale），再水平平移 5 像素（translateX），最后顺时针旋转 180 度（rotate）。
  transition-duration: 1s; // 设置过渡效果持续时间为 1 秒，用于平滑过渡 CSS 属性的变化。
  border: 0;// 清除边框，使元素没有边框
}

.button:before,
.button:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 7px;
}

.button:before {
  border: 4px solid #f0eeef;
  transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button:after {
  //   border: 4px solid #ffd562;
  border: 4px solid @bgColor;
  transform: scale(1.3);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

.button:hover:before,
.button:focus:before {
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.button:hover:after,
.button:focus:after {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button-box {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.button-elem {
  display: block;
  width: 20px;
  height: 20px;
  margin: 17px 18px 0 18px;
  transform: rotate(180deg);
  fill: #f0eeef;
}

.button:hover .button-box,
.button:focus .button-box {
  transition: 0.4s;
  transform: translateX(-56px);
}
</style>
