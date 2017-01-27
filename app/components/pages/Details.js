import React from 'react';

import Spinner from '../../common/Spinner';


class Details extends React.Component {
    componentWillMount() {
        const {id} = this.props.params;
        const {getBookByID} = this.props;

        if(id && getBookByID && getBookByID instanceof Function) getBookByID(id);
    }

    renderSpinner() {
        const {isLoading} = this.props;

        if(!isLoading) return null;

        return <Spinner />;
    }

    render() {
        const {selectedBook} = this.props;

        if (!selectedBook) return <Spinner />;

        return (
              <div>
                  <span>{selectedBook['volumeInfo']['title'] ? selectedBook['volumeInfo']['title'] : 'no title'}</span>
              </div>
        )
    }
}

export default Details;
