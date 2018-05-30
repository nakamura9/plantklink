import React, {Component} from 'react';

class Window extends Component{
    constructor(props){
        super(props);
        this.state = {
            children: []
        }
    }
    
    render(){
        return(
            <div>
                
                <div className="jumbotron">
                    <div className="container">
                        <h1>New Scada Layout</h1>
                        <p>Start off by inserting a new widget</p>
                    </div>
                </div>
                
                <div className="pull-left">
                    
                    <button type="button" className="btn btn-default btn-lg">Add Widget +</button>
                    
                </div>
                <div className="pull-left">
                    <svg width={800} height={500}>
                        <rect x={0} y={0} width={800} height={500} fill="limegreen" />
                        {this.state.children}
                    </svg>
                </div>
            </div>
        );
    }
}

export default Window;