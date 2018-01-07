import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';

import SearchInput from '../SearchInput';

import './style.less';

class SearchHeader extends PureComponent {

    render() {
        return (
            <div id="search-header" className="clear-fix">
                <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"/>
                </span>
                <div className="input-container">
                    <i className="icon-search"/>
                    &nbsp;
                    <SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)}/>
                </div>
            </div>
        )
    }

    clickHandle() {
        window.history.back()
    }

    enterHandle(value) {
        hashHistory.push('/search/all/' + encodeURIComponent(value))
    }
}

export default SearchHeader;