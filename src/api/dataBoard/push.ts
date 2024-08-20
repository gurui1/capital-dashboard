// 推送 接口
import request from './rq';

const BASE_URL = 'finance_platform_web/apply/board/';
export function push(payload: any) {
    return request({
        url: `${BASE_URL}sendMail.do`,
        method: 'post',
        data: payload,
    });
}

// 人员
// export function peopleSelect(payload: any) {
//     return request({
//         url: `${BASE_URL}queryCondition.do`, // 保留原样
//         method: "get",
//     });
// }
