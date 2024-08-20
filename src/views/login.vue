<template>
  <div class="wBox">
    <div class="login" @mouseenter="funin($event)" @mouseleave="funout($event)">
      <h1>Login</h1>
      <div class="formt">
        <input v-model="userData.username" type="text" placeholder="账号" />
        <input v-model="userData.password" type="password" placeholder="密码" />
        <button @click="toMain()">登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMain } from "@/store/home";
import { Login } from "@/api/140/login";
import cookie from "js-cookie";
const router = new (useRouter as any)();

let span: HTMLSpanElement;
let inTime: number, outTime: number;
let isIn = true; //默认开关 打开
let isOut: boolean;

//鼠标进入事件
const funin = (e:any) => {
  let login = document.querySelector(".login") as HTMLElement;
  console.log(e);
  isOut = false; //预先关闭，若不进入if语句，则不能进入鼠标离开事件里的 if
  if (isIn) {
    inTime = new Date().getTime();

    //生成 span 元素并添加进 login 的末尾
    span = document.createElement("span");
    span.className = "spanCs";
    login.appendChild(span);
    //span 去使用 in动画
    span.style.animation = "in .5s ease-out forwards";

    //计算 top 和 left 值，跟踪鼠标位置
    let top = e.clientY - e.target.offsetTop;
    let left = e.clientX - e.target.offsetLeft;

    span.style.top = top + "px";
    span.style.left = left + "px";

    isIn = false; //当我们执行完程序后，关闭
    isOut = true; //当我们执行完里面的程序，再打开
  }
};

//鼠标离开事件
const funout = (e:any) => {
  let login = document.querySelector(".login") as HTMLElement;
  if (isOut) {
    outTime = new Date().getTime();
    let passTime = outTime - inTime;

    if (passTime < 500) {
      setTimeout(mouseleave, 500 - passTime); //已经经过的时间就不要了
    } else {
      mouseleave();
    }
  }

  function mouseleave() {
    span.style.animation = "out .5s ease-out forwards";
    //计算 top 和 left 值，跟踪鼠标位置
    let top = e.clientY - e.target.offsetTop;
    let left = e.clientX - e.target.offsetLeft;

    span.style.top = top + "px";
    span.style.left = left + "px";

    //注意：因为要等到动画结束，所以要给个定时器
    setTimeout(function () {
      login.removeChild(span);
      isIn = true; //当我们执行完鼠标离开事件里的程序，才再次打开
    }, 500);
  }
};

const userData = reactive({
  username: "1234",
  password: "12",
});
const toMain = () => {
  // Login(userData).then((res: any) => {
  //   if (res.data.code == 200) {
  //     console.log(res.data.token);
  //     cookie.set("token", res.data.token);
  //     ElNotification({ type: "success", message: "登录成功" });
      router.replace(useMain().cebianName.split("|")[0]);
  //   } else {
  //     ElMessage.error("登录失败,用户名或密码错误");
  //   }
  // });
  localStorage.setItem("userSex", "男");
  localStorage.setItem("userName", "张三");
  localStorage.setItem("userPhone", "13246525467");
  localStorage.setItem("userCode", "1");
  localStorage.setItem("userRole", "超级管理员");
  localStorage.setItem("userAccount", "admin");
};
onMounted(() => {});
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  color: #eee;
}
.wBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #4f4f4f;
}

.login {
  /* 超出部分隐藏 */
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 450px;
  background-color: #666666;
  border-radius: 10px;
  box-shadow: 10px 10px 20px rgba(33, 44, 55, 0.3);
}

h1 {
  font-size: 45px;
  font-weight: 400;
  /* 提高层级 */
  z-index: 1;
}

.formt {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 230px;
  /* 提高层级 */
  z-index: 1;
}

input {
  width: 200px;
  height: 40px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #eee;
  font-size: 16px;
  outline: none;
}

input::placeholder {
  font-size: 12px;
  color: #eee;
}

button {
  width: 180px;
  height: 36px;
  border: 1px solid #eee;
  border-radius: 18px;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
}

button:hover {
  background-color: #4f4f4f;
  box-shadow: 0 0 4px 4px #9a9a9a;
}
</style>
