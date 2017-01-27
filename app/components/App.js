import React from 'react';

import styles from './App.css';


class App extends React.Component {
    render(){
        const {isLoading, customError} = this.props;

        return (
            <div className={styles.AppContainer}>
                <div className={styles.container}>
                    {React.cloneElement(this.props.children, {isLoading, customError})}
                </div>
            </div>
        )
    }
}

export default App;
