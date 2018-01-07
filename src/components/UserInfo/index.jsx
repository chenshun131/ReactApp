import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.less';

class UserInfo extends PureComponent {

    render() {
        return (
            <div className="userinfo-container">
                <p>
                    <i className="icon-user"/>
                    &nbsp;
                    <span>{this.props.username}</span>
                </p>
                <p>
                    <i className="icon-map-marker"/>
                    &nbsp;
                    <span>{this.props.city}</span>
                </p>
            </div>
        );
    }

}

UserInfo.propTypes = {
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
};

export default UserInfo;
