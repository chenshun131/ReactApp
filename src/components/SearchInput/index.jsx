import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.less';

class SearchInput extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.changeHandle = this.changeHandle.bind(this);
        this.keyUpHandle = this.keyUpHandle.bind(this);
    }

    render() {
        return (
            <input
                className='search-input'
                type='text'
                placeholder='请输入关键字'
                onChange={this.changeHandle}
                onKeyUp={this.keyUpHandle}
                value={this.state.value}
            />
        );
    }

    componentDidMount() {
        // 默认值
        this.setState({
            value: this.props.value || ''
        });
    }

    changeHandle(e) {
        // 监控变化
        this.setState({
            value: e.target.value
        });
    }

    keyUpHandle(e) {
        // 监控 enter 事件
        if (e.keyCode !== 13) {
            return;
        }
        this.props.enterHandle(e.target.value);
    }

}

SearchInput.propTypes = {
    enterHandle: PropTypes.func.isRequired
};

export default SearchInput;
