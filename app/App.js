import React from 'react';
import { connect } from 'react-redux';

import {getBooks} from './actions/api';


class App extends React.Component {
    render() {
        return (
            <div>
                Hello World!!!

                <button onClick={this.props.getBooks}>click me</button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getBooks: () => {
            dispatch(getBooks())
        }
    }
}

export default connect(null, mapDispatchToProps)(App);
