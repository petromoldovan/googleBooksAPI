import React from 'react';

import styles from './Book.css';


class Book extends React.Component {
    rederAuthors(authors) {
        if (!authors || !authors instanceof Array) return null;

        return authors.map((author, id)=>{
            return <span className={styles.authorRow} key={id}>{author}</span>
        })

    }

    formatTitle = (string) => {
        //split words
        string = string.split(/(?=[A-Z])/).join(" ");

        //return with the first capital letter
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    render() {
        const {title, subtitle, authors, publishedDate, description, maturityRating, detailsPage } = this.props;

        let bookMap = {
            title: title,
            subtitle: subtitle,
            authors: authors,
            publishedDate: publishedDate
        };

        if(detailsPage) {
            bookMap['title'] = "";
            bookMap['description'] = description;
            bookMap['maturityRating'] = maturityRating;
        }

        let data = Object.keys(bookMap).map((key, id)=>{
            if(!bookMap[key]) return (detailsPage ? null : <div key={id}>no data</div>);

            return (
                <div key={id}>
                    { detailsPage ? <h3>{this.formatTitle(key)}</h3> : null }
                    <span>{key === "authors" ? this.rederAuthors(bookMap[key]) : bookMap[key]}</span>
                </div>)
        });

        return <div>{data}</div>
    }
}

Book.propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    publishedDate: React.PropTypes.string,
    description: React.PropTypes.string,
    maturityRating: React.PropTypes.string,
    authors: React.PropTypes.array,
    detailsPage: React.PropTypes.bool
};

Book.defaultProps = {
    detailsPage: false
};


export {Book};
