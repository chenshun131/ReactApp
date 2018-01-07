import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';

import configureStore from './store/configureStore';
import RouteMap from './router/RouterMap';
import './static/css/common.less'
import './static/css/font.css'

// 创建 Redux 的 store对象
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root'));
