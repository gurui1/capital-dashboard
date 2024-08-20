import { ref, onMounted, watch } from 'vue';
import { everySelect } from './api'; // 假设这是你的API请求函数

export function useSelectData() {
  const length1 = ref(0);
  const length2 = ref(0);
  const length3 = ref(0);
  const length4 = ref(0);
  
  const singleSelect = { value: 'Option1', label: 'Option1' };
  const accountName = reactive(Array.from({ length: length1.value }, () => ({ ...singleSelect })));
  const belongBu = reactive(Array.from({ length: length2.value }, () => ({ ...singleSelect })));
  const firstBusiness = reactive(Array.from({ length: length3.value }, () => ({ ...singleSelect })));
  const secondBusiness = reactive(Array.from({ length: length4.value }, () => ({ ...singleSelect })));

  const getSelect = async() => {
    let payLoad = {};
    const res = await everySelect(payLoad);
    console.log(res.data.data, '薪学习');
    
    const resArr = res.data.data;
    [length1.value, length2.value, length3.value, length4.value] = [
      resArr.accountName.length,
      resArr.belongBu.length,
      resArr.firstBusiness.length,
      resArr.secondBusiness.length
    ];

    // 更新数据
    updateSelectData(resArr);
  };

  const updateSelectData = (resArr) => {
    accountName.splice(0, accountName.length);
    accountName.push(...resArr.accountName.map(item => ({ label: item, value: item })));

    belongBu.splice(0, belongBu.length);
    belongBu.push(...resArr.belongBu.map(item => ({ label: item, value: item })));

    firstBusiness.splice(0, firstBusiness.length);
    firstBusiness.push(...resArr.firstBusiness.map(item => ({ label: item, value: item })));

    secondBusiness.splice(0, secondBusiness.length);
    secondBusiness.push(...resArr.secondBusiness.map(item => ({ label: item, value: item })));
  };

  onMounted(getSelect);

  return { accountName, belongBu, firstBusiness, secondBusiness };
}