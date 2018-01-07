import * as actionTypes from '../actions/store';

export default function userinfo(state = [], action) {
    switch (action.type) {
        case actionTypes.STORE_UPDATE: // 更新
            return action.data;
        case actionTypes.STORE_ADD: // 添加
            return [...state, action.data];
        case actionTypes.STORE_RM: // 删除
            return state.filter(item => {
                if (item.id !== action.data.id) {
                    return item;
                }
            });
        default:
            return state;
    }
}
