import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../../routes/index";
import cookie from "js-cookie";
// 创建axios实例
const request = axios.create({ 
  // baseURL: "http://192.168.6.14:8082/", //本地环境
  // baseURL: "http://localhost:8080/finance_platform_task/", //本地环境
  baseURL: "http://ncw.baiwutong.com:8082/", // 生产环境
  // baseURL: "http://192.168.113.244:8082/", // 测试环境
  
});
// request拦截器   在实际发出请求前，会先执行请求拦截器的逻辑
request.interceptors.request.use(
  (config) => {
    // console.log("请求拦截器");
    
    // const token= localStorage.getItem('token');
    // const token = cookie.get("token") || ""; // 添加请求头
    // config.headers["token"] = token;
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    // 'Content-Type': ''
    // console.log(config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// response 拦截器  服务器处理登录逻辑，并返回响应。响应首先会被响应拦截器处理
request.interceptors.response.use(
  (response) => {
    // token失效，重新登录
    // console.log("响应拦截器");
    
    // if (response.data.code === 401) {
    //   //  重新登录
    //   ElMessage.error("token失效");
    //   localStorage.clear();
    //   router.push("/404");
    // } // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default request;
