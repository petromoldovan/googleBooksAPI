import React from 'react';
import { connect } from 'react-redux';

import {getBooks} from '../../actions/api';
import LandingPage from '../../components/pages/Landing';


function mapStateToProps(state) {
    let books = state.getIn(['data', 'books'], null);
    books = books ? books.toJS() : null;

    return {books}
}

function mapDispatchToProps(dispatch) {
    return {
        getBooks: (book) => {
            dispatch(getBooks(book))
        }
    }
}

const LandingCont = connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage);

export default LandingCont;

