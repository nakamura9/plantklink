import React, {Component} from 'react';

import ReactDOM from 'react-dom';

class App extends React.Component {
    render(){
        return (
            <div>
                <h1>HEllo django!</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("react-root"));