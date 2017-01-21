import React from 'react';
import { connect } from 'react-redux';

import DetailsPage from '../../components/pages/Landing';

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

const DetailsCont = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsPage);

export default DetailsCont;