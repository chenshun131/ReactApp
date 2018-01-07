import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';

import './style.less';

class Header extends PureComponent {

    constructor(props) {
        super(props);
        this.clickHandle = this.clickHandle.bind(this);
    }

    render() {
        return (
            <div id="common-header">
                <span className="back-icon" onClick={this.clickHandle}>
                    <i className="icon-chevron-left"/>
                </span>
                <h1>{this.props.title}</h1>
            </div>
        );
    }

    clickHandle() {
        const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(hashHistory);
        } else {
            window.history.back();
        }
    }

}

export default Header;
