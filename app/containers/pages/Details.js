import { connect } from 'react-redux';

import DetailsPage from '../../components/pages/Details';
import {getBookByID} from '../../actions/api';
import {resetSelectedBook} from '../../actions/state';


function mapStateToProps(state) {
    let selectedBook = state.getIn(['data', 'selectedBook'], null);
    selectedBook = selectedBook ? selectedBook.toJS() : null;

    return { selectedBook };
}

function mapDispatchToProps(dispatch) {
    return {
        getBookByID: (id) => {
            dispatch(getBookByID(id));
        },
        resetSelectedBook: () => {
            dispatch(resetSelectedBook());
        }
    };
}

const DetailsCont = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsPage);

export default DetailsCont;
