import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

import Header from '../../components/Header'
import LoginComponent from '../../components/Login'

class Login extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            checking: true
        };
        this.loginHandle = this.loginHandle.bind(this);
    }

    render() {
        return (
            <div>
                <Header title="登录"/>
                {
                    // 等待验证之后，再显示登录信息
                    this.state.checking ?
                        <div>{/* 等待中 */}</div> :
                        <LoginComponent loginHandle={this.loginHandle}/>
                }
            </div>
        );
    }

    componentDidMount() {
        // 判断是否已经登录
        this.doCheck();
    }

    doCheck() {
        const userinfo = this.props.userinfo;
        if (userinfo.username) {
            // 已经登录，则跳转到用户主页
            this.goUserPage();
        } else {
            // 未登录，则验证结束
            this.setState({
                checking: false
            });
        }
    }

    /**
     * 登录信息处理
     * @param username
     */
    loginHandle(username) {
        // 保存用户名
        const actions = this.props.userInfoActions;
        let userinfo = this.props.userinfo;
        userinfo.username = username;
        actions.update(userinfo);

        const params = this.props.params;
        const router = params.router;
        if (router) {
            // 跳转到指定的页面
            hashHistory.push(router);
        } else {
            // 跳转到用户主页
            this.goUserPage();
        }
    }

    goUserPage() {
        hashHistory.push('/User');
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
