// 所有导出excel的接口
import request from './request';

const BASE_URL = 'finance_platform_web/apply/board/';

// 期初余额表
export function excelOne(payload: any) {
    return request({
        url: `${BASE_URL}exportFsInitialBalance.do`,
        method: 'post',
        data: payload,
    });
}

// 预计期末余额表
export function excelTwo(payload: any) {
    return request({
        url: `${BASE_URL}exportTerminalBalance.do`,
        method: 'post',
        data: payload,
    });
}

// 预计支出表
export function excelThree(payload: any) {
    return request({
        url: `${BASE_URL}exportExpectExpenditureInfo.do`,
        method: 'post',
        data: payload,
    });
}

// 预计回款表
export function excelFour(payload: any) {
    return request({
        url: `${BASE_URL}exportExpectReturnMoney.do`,
        method: 'post',
        data: payload,
    });
}

// 实际支出表
export function excelFive(payload: any) {
    return request({
        url: `${BASE_URL}exportActualExpenditureInfo.do`,
        method: 'post',
        data: payload,
    });
}

// 实际回款表
export function excelSix(payload: any) {
    return request({
        url: `${BASE_URL}exportActualReturnMoney.do`,
        method: 'post',
        data: payload,
    });
}

// 系统外预计收支
export function excelSeven(payload: any) {
    return request({
        url: `${BASE_URL}exportFsSystemOutSz.do`,
        method: 'post',
        data: payload,
    });
}