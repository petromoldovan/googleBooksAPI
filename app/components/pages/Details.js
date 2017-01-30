import React from 'react';
import { browserHistory } from 'react-router';

import {Spinner, Book} from '../../common/';
import styles from './Details.css';


class Details extends React.Component {
    componentWillMount() {
        const {id} = this.props.params;
        const {getBookByID} = this.props;

        if(id && getBookByID && getBookByID instanceof Function) getBookByID(id);
    }

    goBack = () => {
        const {resetSelectedBook} = this.props;

        browserHistory.goBack();

        if(resetSelectedBook && resetSelectedBook instanceof Function) resetSelectedBook();
    };

    getImageLink = (bookInfo) => {
        if (!bookInfo['imageLinks']) return '';

        if (bookInfo['imageLinks']['small']) return bookInfo['imageLinks']['small'];

        if (bookInfo['imageLinks']['medium']) return bookInfo['imageLinks']['medium'];

        if (bookInfo['imageLinks']['thumbnail']) return bookInfo['imageLinks']['thumbnail'];
    };

    render() {
        const {selectedBook, isLoading} = this.props;

        if (!selectedBook || !selectedBook['volumeInfo'] || isLoading) return <Spinner />;

        const bookInfo = selectedBook['volumeInfo'];
        const img = this.getImageLink(bookInfo);

        return (
              <div>
                  <div className={styles.closeButton} onClick={this.goBack}>
                      <img src="/app/assets/close-icon.svg" alt="close button" />
                  </div>

                  <h1 className={styles.header}>{bookInfo['title'] ? bookInfo['title'] : 'no title'}</h1>
                  <div className={styles.content}>
                      <div className={styles.rightSide}>
                          <img src={img} alt="book preview" />
                      </div>
                      <div className={styles.leftSide}>
                          <Book {...bookInfo} detailsPage={true} />
                      </div>
                  </div>
              </div>
        );
    }
}

Details.propTypes = {
    selectedBook: React.PropTypes.object,
    resetSelectedBook: React.PropTypes.func,
    getBookByID: React.PropTypes.func,
    isLoading: React.PropTypes.bool
};


export default Details;
