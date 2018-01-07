import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

import './style.less';

class OrderList extends PureComponent {

    render() {
        const data = this.props.data;
        const submitComment = this.props.submitComment;

        return (
            <div>
                {data.map((item, index) => {
                    return <Item key={index} data={item} submitComment={submitComment}/>
                })}
            </div>
        );
    }

}

OrderList.propTypes = {
    data: PropTypes.object.isRequired,
    submitComment: PropTypes.func.isRequired
};

export default OrderList;