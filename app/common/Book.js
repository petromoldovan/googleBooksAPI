import React from 'react';

import styles from './Book.css';


class Book extends React.Component {
    rederAuthors(authors) {
        if (!authors || !authors instanceof Array) return null;

        return authors.map((author, id)=>{
            return <span key={id}>{author}</span>
        })

    }

    render() {
        const {title, subtitle, authors, publishedDate, imageLinks, description, maturityRating,  } = this.props;

        console.log(this.props)

        return(
            <div className={styles.Book}>


                <span>{title ? title : 'no title'}</span>
                <span>{subtitle ? subtitle : 'no subtitle'}</span>
                <span>
                    {this.rederAuthors(authors)}
                </span>
                <span>{publishedDate ? publishedDate : 'no data'}</span>

            </div>
        )
    }
}

export {Book};
