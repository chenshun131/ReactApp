/** 更新 */
export const STORE_UPDATE = Symbol('STORE_UPDATE');
/** 添加 */
export const STORE_ADD = Symbol('STORE_ADD');
/** 删除 */
export const STORE_RM = Symbol('STORE_RM');

/////////////////////// Action 创建函数 ///////////////////////

/**
 * 更新
 * @param date
 * @returns {{type: symbol, date: *}}
 */
export function update(date) {
    return {
        type: STORE_UPDATE,
        date
    };
}

/**
 * 添加
 * @param item
 * @returns {{type: symbol, date: *}}
 */
export function add(item) {
    return {
        type: STORE_ADD,
        date: item
    };
}

/**
 * 删除
 * @param item
 * @returns {{type: symbol, data: *}}
 */
export function rm(item) {
    return {
        type: STORE_RM,
        data: item
    };
}
