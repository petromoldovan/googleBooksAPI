import React from 'react';
import { connect } from 'react-redux';

import {getBooks} from '../../actions/api';
import {setPaginationActivePage} from '../../actions/state';
import LandingPage from '../../components/pages/Landing';


function mapStateToProps(state) {
    let books = state.getIn(['data', 'books'], null);
    books = books ? books.toJS() : null;
    const paginationTotalPages = state.getIn(['ui', 'pagination', 'total'], null);
    const paginationActivePage = state.getIn(['ui', 'pagination', 'activePage'], 1);
    const customError = state.getIn(['ui', 'customError'], null);

    return {books, paginationTotalPages, paginationActivePage}
}

function mapDispatchToProps(dispatch) {
    return {
        getBooks: (book) => {
            dispatch(getBooks(book))
        },
        setPaginationActivePage: (index) => {
            dispatch(setPaginationActivePage(index))
        }
    }
}

const LandingCont = connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage);

export default LandingCont;

