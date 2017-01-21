import React from 'react';

import {getBooks} from '../../actions/api';


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
            console.log(book)
            return (
                <div key={id} className="bookWrapper">

                    <h3>{book['volumeInfo']['title'] ? book['volumeInfo']['title'] : 'no title'}</h3>
                    <h4>{book['volumeInfo']['authors'] ? book['volumeInfo']['authors'][0] : 'no author'}</h4>
                </div>
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
