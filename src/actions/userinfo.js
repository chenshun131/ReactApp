/** 更新 */
export const USERINFO_UPDATE = Symbol('USERINFO_UPDATE');

/**
 * 更新
 * @param data
 * @returns {{type: symbol, data: *}}
 */
export function update(data) {
    return {
        type: USERINFO_UPDATE,
        data
    };
}
