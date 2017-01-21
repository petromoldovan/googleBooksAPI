import React from 'react';
import {Link} from 'react-router';

import {getBooks} from '../../actions/api';
import styles from './Landing';


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
                <Link to={book['id']} key={id} className="bookWrapper">
                    <div>
                        <div>{book['volumeInfo']['title'] ? book['volumeInfo']['title'] : 'no title'}</div>
                        <div>{book['volumeInfo']['subtitle'] ? book['volumeInfo']['subtitle'] : 'no subtitle'}</div>
                        <div>{book['volumeInfo']['authors'] ? book['volumeInfo']['authors'][0] : 'no author'}</div>
                        <div>{book['volumeInfo']['publishedDate'] ? book['volumeInfo']['publishedDate'] : 'no data'}</div>

                    </div>
                </Link>
            )
        })

    }

    render() {
        const {search} = this.state;

        return (
            <div>
                <input type="text" name="search" value={search} onChange={this.onChange} />
                <button onClick={this.onSubmit}>click me</button>

                {this.renderBooks()}
            </div>
        );
    }
}

export default Landing;
