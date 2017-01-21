import React from 'react';


class App extends React.Component {
    render(){
        const {isLoading, customError} = this.props;

        return (
            <div className="AppComponent">
                {React.cloneElement(this.props.children, {isLoading, customError})}
            </div>
        )
    }
}

export default App;
