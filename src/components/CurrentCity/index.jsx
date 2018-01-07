import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.less'

class CurrentCity extends PureComponent {

    render() {
        return (
            <div className="current-city">
                <h2>{this.props.cityName}</h2>
            </div>
        )
    }

}

CurrentCity.propTypes = {
    cityName: PropTypes.string.isRequired
};

export default CurrentCity