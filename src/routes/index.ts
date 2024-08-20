import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useMain } from "@/store/home";
import cookie from "js-cookie";
import { log } from "console";
// 2. 配置路由
const routes: Array<RouteRecordRaw> = [

  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("@/views/login.vue"),
  // },
  {
    path: "/main",
    name: "main",
    redirect: "/dataBoard", //main 重定向到 /dataBoard， 
    component: () => import("@/views/main.vue"),
    children: [
      {
        path: "/dataBoard",
        name: "dataBoard",
        component: () => import("@/components/dataBoard.vue"),
      },
      
      {
        path: "/Opening-Balance",
        name: "biao1",
        component: () => import("@/components/Board/biao1.vue"),
      },
      {
        path: "/Closing-Balance",
        name: "biao2",
        component: () => import("@/components/Board/biao2.vue"),
      },
   
      {
        path: "/Expected-Expenditure",
        name: "biao3",
        component: () => import("@/components/Board/biao3.vue"),
      },
      {
        path: "/Expected-Receipts",
        name: "biao4",
        component: () => import("@/components/Board/biao4.vue"),
      },
      {
        path: "/Actual-Expenditure",
        name: "biao5",
        component: () => import("@/components/Board/biao5.vue"),
      },
      {
        path: "/Actual-Receipts",
        name: "biao6",
        component: () => import("@/components/Board/biao6.vue"),
      },
      {
        path: "/Other-Expenditure&Receipts",
        name: "biao7",
        component: () => import("@/components/Board/biao7.vue"),
      },
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
  }

];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// function getCookieValue(cookieName) {
//   const name = cookieName + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const cookieArray = decodedCookie.split(';');

//   for (let i = 0; i < cookieArray.length; i++) {
//     let cookie = cookieArray[i].trim();
//     if (cookie.indexOf(name) === 0) {
//       return cookie.substring(name.length, cookie.length);
//     }
//   }
//   return "";
// }
// cookie.set("token", 111);
// const token = cookie.get("token");
// console.log(token, 'cookie');
// console.log(localStorage.getItem("token1"), 'localStorage');

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token') 
// console.log(token, '超链接');
if (token) {
  sessionStorage.setItem('BWtoken', token);
  // 设置过期时间为 30 分钟后的时间戳（单位为毫秒）
  // const now = new Date();
  // const Overtime: any = now.getTime() + 30 * 60 * 1000; // 30 minutes
  // localStorage.setItem('tokenOvertime', Overtime);
}

// 路由拦截
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('BWtoken');
  // const tokenOvertime: any = localStorage.getItem('tokenOvertime');
  // const now = new Date().getTime();
  if (to.path === "/") next("/main")
  if (to.path === "/404") {
    next()
    sessionStorage.removeItem("BWtoken")

  }
   else if (!token || token !=='aB3KmN8pQrZx7W2') {
    next({ path: "/404" });
  }
  next();

});
// 3导出路由   然后去 main.ts 注册 router.ts
export default router