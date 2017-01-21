import React from 'react';

import styles from './App.css';


class App extends React.Component {
    render(){
        const {isLoading, customError} = this.props;

        return (
            <div className={styles.AppContainer}>
                {React.cloneElement(this.props.children, {isLoading, customError})}
            </div>
        )
    }
}

export default App;
