import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

import config from '../../../config/base';
import {getBooks} from '../../actions/api';
import styles from './Landing.css';
import {Spinner, Book} from '../../common/';
import {slicePaginationBoxes, dataSort, formatTitle} from '../../helper';


class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            booksPerPage: 20,
            paginationIDX: 0,
            filter: 'title',
            filterAlpha: true
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDropdown = this.onChangeDropdown.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit(startIndex = null) {
        const {getBooks, setPaginationActivePage} = this.props;
        let {search, booksPerPage} = this.state;

        if(!search) return null;

        //format the search term
        search = search.toLowerCase().split(' ').join('+');

        //show next n books
        if (startIndex && !isNaN(startIndex)) {
            if (setPaginationActivePage && setPaginationActivePage instanceof Function) setPaginationActivePage(startIndex);
            //if it is not the first page then start index is numberOfBooksPerPage times startIndex-1 and plus one book
            startIndex = startIndex === 1 ? 0 : booksPerPage * (startIndex-1) + 1;
        }

        const data = {
            searchValue: search,
            startIndex: !isNaN(startIndex) ? startIndex : 0,
            booksPerPage: booksPerPage
        };

        if (getBooks && getBooks instanceof Function) getBooks(data)
    }

    headerClick = (filter) => {
      if (this.state.filter == filter) {
          this.setState({filterAlpha: !this.state.filterAlpha})
      }

      this.setState({filter: filter})
    };

    renderTable() {
        const {books} = this.props;
        const {filter, filterAlpha} = this.state;

        if (!books) return null;

        let filteredBooks = [];
        for (let i in books) {
            let dataArr = books[i]['volumeInfo'];
            dataArr.id = books[i].id;

            filteredBooks.push(dataArr)
        }

        filteredBooks.sort(dataSort(filter, filterAlpha));

        const columnNames = ["title", "subtitle", "authors", "publishedDate"];
        const columns = columnNames.map((value, id)=>{
            return <div key={id} onClick={()=>this.headerClick(value)}><span>{formatTitle(value)}</span></div>
        });

        return (
            <div className={styles.table}>
                <div className={classNames(styles.tableHeader, styles[filter], styles[filterAlpha])}>
                    {columns}
                </div>
                {this.renderBooks(filteredBooks)}
            </div>
        )
    }

    renderBooks = (books) => {
        return books.map((book, id) => {
            return (
                <Link to={book['id']} key={id}>
                    <div className={styles.BookRow}>
                        <Book {...book} />
                    </div>
                </Link>
            )
        })
    };

    onClickPagination = (idx) => {
        if (this.onSubmit) this.onSubmit(idx)

        this.setState({paginationIDX: idx})
    };

    renderPagination() {
        const {books, paginationTotalPages, paginationActivePage} = this.props;

        if (!books || !paginationTotalPages) return null;

        let paginationBoxes = [];
        for (let i = 1; i <= paginationTotalPages; i++) {
            paginationBoxes.push(i)
        }

        paginationBoxes = slicePaginationBoxes(paginationBoxes, this.state.paginationIDX);

        paginationBoxes = paginationBoxes.map((value, id)=> {
            let className = '';
            if (paginationActivePage && paginationActivePage == value) className = 'active';
            if (isNaN(value)) className = 'dots';
            return <span className={styles[className]}
                         key={`${id}_box_${value}`}
                         onClick={!isNaN(value) ? ()=>this.onClickPagination(value) : ()=>null }>
                        {value}
                    </span>
        });

        return (
            <div className={styles.Pagination}>
                {paginationBoxes}
            </div>
        )
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
        const options = [10, 20, 30, 40];

        const data = options.map((value, id)=>{
                        return <option key={id} value={value}>{value}</option>
                     });

        return (
            <div className={styles.Dropdown}>
                <span>Books per page:</span>
                <select value={this.state.booksPerPage} onChange={this.onChangeDropdown}>
                    {data}
                </select>
            </div>
        )
    }

    render() {
        const {search} = this.state;

        return (
            <div>
                {this.renderSpinner()}
                <div className={styles.Form}>
                    <div>
                        <input type="text" placeholder="Book title/author etc" name="search" value={search} onChange={this.onChange} />
                        {this.renderDropdown()}
                    </div>
                    <div>
                        <button onClick={this.onSubmit}>Get The Book!</button>
                    </div>
                </div>
                {this.renderError()}
                {this.renderTable()}
                {this.renderPagination()}
            </div>
        );
    }
}

Landing.propTypes = {
    isLoading: React.PropTypes.bool,
    customError: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    books: React.PropTypes.array,
    paginationTotalPages: React.PropTypes.number,
    paginationActivePage: React.PropTypes.number,
    getBooks: React.PropTypes.func.isRequired,
    setPaginationActivePage: React.PropTypes.func
};


export default Landing;
