import {connect} from 'react-redux';

import App from '../components/App';


function mapStateToProps(state) {
    const isLoading = state.getIn(['ui', 'isLoading'], false);
    const customError = state.getIn(['ui', 'customError'], '');

    return {
        isLoading, customError
    }
}

function mapDispatchToProps() {
    return {}
}

const AppCont = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


export default AppCont;
