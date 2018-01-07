import { createStore } from "redux";
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools ，可调起 Chrome 扩展程序
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );
    return store;
}
