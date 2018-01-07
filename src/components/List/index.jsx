import React, { PureComponent } from 'react';

import Item from './Item';

import './style.less';

class List extends PureComponent {

    render() {
        return (
            <div className="list-container">
                {
                    this.props.data.map((item, index) => <Item key={index} data={item}/>)
                }
            </div>
        );
    }

}

export default List;