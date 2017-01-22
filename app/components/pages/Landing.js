import React from 'react';
import {Link} from 'react-router';

import config from '../../../config/base';
import {getBooks} from '../../actions/api';
import styles from './Landing.css';


class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit(startIndex) {
        const {getBooks, setPaginationActivePage} = this.props;
        let {search} = this.state;
        search = search.toLowerCase().split(' ').join('+');

        //show next n books
        if (startIndex) {
            if (setPaginationActivePage && setPaginationActivePage instanceof Function) setPaginationActivePage(startIndex);
            startIndex = config.maxBooks * startIndex + 1;
        }

        const data = {
            searchValue: search,
            startIndex: startIndex ? startIndex : 0
        };

        if (getBooks && getBooks instanceof Function) getBooks(data)
    }

    renderBooks() {
        const {books} = this.props;

        if (!books) return null;

        return books.map((book, id) => {
            return (
                <Link to={book['id']} key={id}>
                    <div className={styles.bookRow}>
                        <span>{book['volumeInfo']['title'] ? book['volumeInfo']['title'] : 'no title'}</span>
                        <span>{book['volumeInfo']['subtitle'] ? book['volumeInfo']['subtitle'] : 'no subtitle'}</span>
                        <span>{book['volumeInfo']['authors'] ? book['volumeInfo']['authors'][0] : 'no author'}</span>
                        <span>{book['volumeInfo']['publishedDate'] ? book['volumeInfo']['publishedDate'] : 'no data'}</span>
                    </div>
                </Link>
            )
        })

    }

    renderPagination() {
        const {books, paginationTotalPages, paginationActivePage} = this.props;

        if (!books || !paginationTotalPages) return null;

        let paginationBoxes = [];
        for (let i = 1; (i -1) < paginationTotalPages; i++) {
            let className = '';
            if (paginationActivePage && paginationActivePage === i) className = 'active';
            paginationBoxes.push(<a className={styles[className]} key={i} value={i} onClick={()=>this.onSubmit(i)}>{i}</a>)
        }

        return (<div>{paginationBoxes}</div>)
    }

    render() {
        const {search} = this.state;

        return (
            <div className={styles.container}>
                <input type="text" name="search" value={search} onChange={this.onChange} />
                <button onClick={() => this.onSubmit()}>click me</button>

                {this.renderBooks()}
                {this.renderPagination()}
            </div>
        );
    }
}

export default Landing;
