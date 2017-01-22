import React from 'react';

import styles from './Spinner.css';


class Spinner extends React.Component {
    render() {
        return(
            <div className={styles.Spinner}>
                <img src="/app/assets/ico-loading.gif" alt="spinner" />
            </div>
        )
    }
}

export default Spinner;
