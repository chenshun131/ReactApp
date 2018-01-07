import React, { PureComponent } from 'react';
import { Link, hashHistory } from 'react-router';
import PropTypes from 'prop-types';

import SearchInput from '../SearchInput';

import './style.less';

/**
 * 主页头部
 */
class HomeHeader extends PureComponent {

    constructor(props) {
        super(props);

        this.enterHandle = this.enterHandle.bind(this);
    }

    render() {
        return (
            <div id="home-header" className="clear-fix">
                <div className="home-header-left float-left">
                    <Link to="/city">
                        <span>{this.props.cityName}</span>
                        &nbsp;
                        <i className="icon-angle-down"/>
                    </Link>
                </div>
                <div className="home-header-right float-right">
                    <Link to="/Login">
                        <i className="icon-user"/>
                    </Link>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"/>
                        &nbsp;
                        <SearchInput value="" enterHandle={this.enterHandle}/>
                    </div>
                </div>
            </div>
        );
    }

    enterHandle(value) {
        hashHistory.push(`/search/all/${encodeURIComponent(value)}`);
    }

}

HomeHeader.propTypes = {
    cityName: PropTypes.string.isRequired
};

export default HomeHeader;
