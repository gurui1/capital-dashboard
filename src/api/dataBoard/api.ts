// 其余七个表的接口
import request from './request';

const BASE_URL = 'finance_platform_web/apply/board/';

// 期初余额表
// 将变量或表达式嵌入到字符串中时，使用模板字符串 反引号 ` `  使用${}语法来插入变量或表达式的值
export function biaoOne(payload: any) {
    return request({
        url: `${BASE_URL}queryFsInitialBalance.do`,
        method: 'post',
        data: payload,
    });
}

// 预计期末余额表
export function biaoTwo(payload: any) {
    return request({
        url: `${BASE_URL}getTerminalBalance.do`,
        method: 'post',
        data: payload,
    });
}

// 预计支出表
export function biaoThree(payload: any) {
    return request({
        url: `${BASE_URL}queryExpectExpenditureInfo.do`, // 使用BASE_URL
        method: 'post',
        data: payload,
    });
}

// 预计回款表
export function biaoFour(payload: any) {
    return request({
        url: `${BASE_URL}queryExpectReturnMoney.do`, // 使用BASE_URL
        method: 'post',
        data: payload,
    });
}

// 实际支出表
export function biaoFive(payload: any) {
    return request({
        url: `${BASE_URL}queryActualExpenditureInfo.do`, // 使用BASE_URL
        method: 'post',
        data: payload,
    });
}

// 实际回款表
export function biaoSix(payload: any) {
    return request({
        url: `${BASE_URL}queryActualReturnMoney.do`, // 使用BASE_URL
        method: 'post',
        data: payload,
    });
}

// 系统外预计收支
export function biaoSeven(payload: any) {
    return request({
        url: `${BASE_URL}queryFsSystemOutSz.do`, // 使用BASE_URL
        method: 'post',
        data: payload,
    });
}

// 所有下拉框
export function everySelect(payload: any) {
    return request({
        url: `${BASE_URL}queryCondition.do`, // 保留原样
        method: "get",
    });
}

// 人员
export function peopleSelect(payload: any) {
    return request({
        url: `${BASE_URL}queryCondition.do`, // 保留原样
        method: "get",
    });
}
