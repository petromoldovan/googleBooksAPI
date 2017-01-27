import React from 'react';
import {Link} from 'react-router';

import config from '../../../config/base';
import {getBooks} from '../../actions/api';
import styles from './Landing.css';
import Spinner from '../../common/Spinner';


class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            booksPerPage: 20
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDropdown = this.onChangeDropdown.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit(startIndex) {
        const {getBooks, setPaginationActivePage} = this.props;
        let {search, booksPerPage} = this.state;
        search = search.toLowerCase().split(' ').join('+');

        //show next n books
        if (startIndex) {
            if (setPaginationActivePage && setPaginationActivePage instanceof Function) setPaginationActivePage(startIndex);
            startIndex = booksPerPage * startIndex + 1;
        }

        const data = {
            searchValue: search,
            startIndex: startIndex ? startIndex : 0,
            booksPerPage: booksPerPage
        };

        if (getBooks && getBooks instanceof Function) getBooks(data)
    }

    renderBooks() {
        const {books} = this.props;

        if (!books) return null;

        return books.map((book, id) => {
            return (
                <Link to={book['id']} key={id}>
                    <div className={styles.BookRow}>
                        <span>{book['volumeInfo']['title'] ? book['volumeInfo']['title'] : 'no title'}</span>
                        <span>{book['volumeInfo']['subtitle'] ? book['volumeInfo']['subtitle'] : 'no subtitle'}</span>
                        <span>
                            {book['volumeInfo']['authors'] ? book['volumeInfo']['authors'].forEach((author)=>author) : 'no author'}
                        </span>
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
            paginationBoxes.push(<span className={styles[className]} key={i} onClick={()=>this.onSubmit(i)}>{i}</span>)
        }

        return (<div className={styles.Pagination}>{paginationBoxes}</div>)
    }

    renderSpinner() {
        const {isLoading} = this.props;

        if(!isLoading) return null;

        return <Spinner />
    }

    renderError() {
        const {customError} = this.props;

        if(!customError) return null;

        return <div className={styles.Error}>Error {customError.status}: {customError.message}</div>
    }

    onChangeDropdown(e) {
        this.setState({booksPerPage: e.target.value});
        if(this.state.search) this.onSubmit();
    }

    renderDropdown() {
        return (
            <select value={this.state.booksPerPage} onChange={this.onChangeDropdown}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
            </select>
        )
    }

    render() {
        const {search} = this.state;

        return (
            <div className={styles.container}>
                {this.renderSpinner()}
                <div className={styles.Form}>
                    <input type="text" name="search" value={search} onChange={this.onChange} />
                    <button onClick={() => this.onSubmit()}>Get The Book!</button>
                    {this.renderDropdown()}
                </div>
                {this.renderError()}

                {this.renderBooks()}
                {this.renderPagination()}
            </div>
        );
    }
}

export default Landing;
