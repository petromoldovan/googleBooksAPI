import React from 'react';

import {getBooks} from '../../actions/api';


class Landing extends React.Component {
    render() {
        return (
            <div>
                Hello World!!!

                <button onClick={this.props.getBooks}>click me</button>
            </div>
        );
    }
}

export default Landing;
