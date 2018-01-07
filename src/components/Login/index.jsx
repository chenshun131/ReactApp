import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import './style.less';

class Login extends PureComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: ''
        };
        this.changeHandle = this.changeHandle.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
    }

    render() {
        return (
            <div id="login-container">
                <div className="input-container phone-container">
                    <i className="icon-tablet"/>
                    <input
                        type="text"
                        placeholder="输入手机号"
                        onChange={this.changeHandle}
                        value={this.state.username}
                    />
                </div>
                <div className="input-container password-container">
                    <i className="icon-key"/>
                    <button>发送验证码</button>
                    <input type="text" placeholder="输入验证码"/>
                </div>
                <button className="btn-login" onClick={this.clickHandle}>登录</button>
            </div>
        )
    }

    changeHandle(e) {
        this.setState({
            username: e.target.value
        })
    }

    clickHandle() {
        const username = this.state.username;
        const loginHandle = this.props.loginHandle;
        loginHandle(username);
    }

}

Login.propTypes = {
    loginHandle: PropTypes.func.isRequired
};

export default Login;