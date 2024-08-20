// 数据看板页面所有echarts图接口
import request from './request';

const BASE_URL = 'finance_platform_web/apply/board/';

// 期初余额
export function biao1() {
    return request({
        url: `${BASE_URL}initialBalanceBoard.do`,
        method: 'get',
    });
}

// 预计期末余额
export function biao2() {
    return request({
        url: `${BASE_URL}terminalBalanceBoard.do`,
        method: 'get',
    });
}

// 预计支出部门
export function biao3(payload: any) {
    return request({
        url: `${BASE_URL}queryExpectByDepart.do`,
        method: 'post',
        data: payload,
    });
}

// 预计回款部门
export function biao4(payload: any) {
    return request({
        url: `${BASE_URL}queryExpectReturnByDepart.do`,
        method: 'post',
        data: payload,
    });
}

// 实际支出部门
export function biao5(payload: any) {
    return request({
        url: `${BASE_URL}queryActualByDepart.do`,
        method: 'post',
        data: payload,
    });
}

// 实际回款部门
export function biao6(payload: any) {
    return request({
        url: `${BASE_URL}queryActualReturnByDepart.do`,
        method: 'post',
        data: payload,
    });
}

// 预计支出业务
export function biao7(payload: any) {
    return request({
        url: `${BASE_URL}queryExpectByBusiness.do`,
        method: 'post',
        data: payload,
    });
}

// 预计回款业务
export function biao8(payload: any) {
    return request({
        url: `${BASE_URL}queryExpectReturnByBusiness.do`,
        method: 'post',
        data: payload,
    });
}

// 实际支出业务
export function biao9(payload: any) {
    return request({
        url: `${BASE_URL}queryActualByBusiness.do`,
        method: 'post',
        data: payload,
    });
}

// 实际回款业务
export function biao10(payload: any) {
    return request({
        url: `${BASE_URL}queryActualReturnByBusiness.do`,
        method: 'post',
        data: payload,
    });
}

// 今日预计支出金额 && 今日预计回款金额
export function biao11() {
    return request({
        url: `${BASE_URL}queryTodayAmount.do`,
        method: 'get',
    });
}

// 金额趋势
export function biao12(payload: any) {
    return request({
        url: `${BASE_URL}queryAmountTrend.do`,
        method: 'get',
        params: payload,
    });
}