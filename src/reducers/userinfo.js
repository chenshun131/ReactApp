import * as actionTypes from '../actions/userinfo';

export default function userinfo(state = {}, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE: // 更新数据
            return action.data;
        default:
            return state;
    }
}
