import React from 'react';
import {Link} from 'react-router';

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

    onSubmit() {
        const {getBooks} = this.props;
        let searchValue = this.state.search;
        searchValue = searchValue.toLowerCase().split(' ').join('+');

        if (getBooks && getBooks instanceof Function) getBooks(searchValue)
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

    render() {
        const {search} = this.state;

        return (
            <div className={styles.container}>
                <input type="text" name="search" value={search} onChange={this.onChange} />
                <button onClick={this.onSubmit}>click me</button>

                {this.renderBooks()}
            </div>
        );
    }
}

export default Landing;
