import React, {Component} from 'react';

import ReactDOM from 'react-dom';

class Indicator extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }

    increment(){
        this.setState({count: this.state.count + 1});
    }

    decrement(){
        this.setState({count: this.state.count - 1});
    }

    render(){
        return(
            <div style={{width: this.props.width}}>
                <div><h3 style={{textAlign: "center"}}>{this.state.count}</h3></div>
                <div>
                    <button style={{width: this.props.width / 2}} className="btn btn-success" onClick={this.increment.bind(this)}>
                    <span className="glyphicon glyphicon-plus"></span>
                    </button>
                    <button style={{width: this.props.width / 2}} className="btn btn-danger" onClick={this.decrement.bind(this)}>
                    <span className="glyphicon glyphicon-minus"></span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Indicator;