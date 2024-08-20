import { defineStore } from 'pinia'
import { everySelect } from '@/api/dataBoard/api';
import { peopleSelect } from '@/api/dataBoard/api'
// useMain  可以是 useUser、useCart 之类的名字 
// defineStore('main',{..}) 在devtools 就使用 main 这个名
export const useMain = defineStore('main', {
  // 相当于data
  state: () => {
    return {
      cebianName: "dataBoard|数据看板",
      editableTabs: [{ title: "数据看板", name: "dataBoard|数据看板" }],
      closeButton: false, //切换按钮
      isCollapse:false  //菜单收回

    }
  },
  persist: true,
})
// stores/selectDataStore.js


export const useSelectDataStore = defineStore('selectData', {
  state: () => ({
    accountName: [] as Array<any> ,
    belongBu: [] as Array<any>,
    firstBusiness:[] as Array<any>,
    secondBusiness: []as Array<any>,
    people: []as Array<any>,
  }),
  actions: {
    fetchSelectData() {
      return new Promise((resolve, reject) => { 
      // resolve用于在异步操作成功时调用，reject用于在异步操作失败时调用。
        everySelect({})
          .then(response => {
            this.accountName = response.data.data.accountName.map(item => ({ label: item, value: item }));
            this.belongBu = response.data.data.belongBu.map(item => ({ label: item, value: item }));
            this.firstBusiness = response.data.data.firstBusiness.map(item => ({ label: item, value: item }));
            this.secondBusiness = response.data.data.secondBusiness.map(item => ({ label: item, value: item }));
            // this.people = response.data.data.userMap.map(item => ({ label: item, value: item }));
            // console.log(people);
            
           resolve(response); // 将响应数据作为解决的值
          })
          .catch(error => {
            console.error('Failed to fetch data:', error);
            reject(error);
          });
      });
    },
    // PeopleSelectData() {
    //   return new Promise((resolve, reject) => { 
    //   // resolve用于在异步操作成功时调用，reject用于在异步操作失败时调用。
    //     everySelect({})
    //       .then(response => {
    //         // console.log(response,'22');
            
    //         this.people = response.data.data.accountName.map(item => ({ label: item, value: item }));

    //        resolve(response); // 将响应数据作为解决的值
    //       })
    //       .catch(error => {
    //         console.error('Failed to fetch data:', error);
    //         reject(error);
    //       });
    //   });
    // }
    
    // async fetchSelectData() {
    //   try {
    //     const response = await everySelect({}); 
    //       this.accountName = response.data.data.accountName.map(item => ({ label: item, value: item }));
    //       this.belongBu = response.data.data.belongBu.map(item => ({ label: item, value: item }));
    //       this.firstBusiness = response.data.data.firstBusiness.map(item => ({ label: item, value: item }));
    //       this.secondBusiness = response.data.data.secondBusiness.map(item => ({ label: item, value: item }));
       
    //   } catch (error) {
    //     console.error('Failed to fetch data:', error);
    //   }
    // }
  }
});

