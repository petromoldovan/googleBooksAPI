import React from 'react';
import { connect } from 'react-redux';

import DetailsPage from '../../components/pages/Details';
import {getBookByID} from '../../actions/api';


function mapStateToProps(state) {
    let selectedBook = state.getIn(['data', 'selectedBook'], null);
    selectedBook = selectedBook ? selectedBook.toJS() : null;

    return { selectedBook }
}

function mapDispatchToProps(dispatch) {
    return {
        getBookByID: (id) => {
            dispatch(getBookByID(id))
        },
        setPaginationActivePage: (index) => {
            dispatch(setPaginationActivePage(index))
        }
    }
}

const DetailsCont = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsPage);

export default DetailsCont;