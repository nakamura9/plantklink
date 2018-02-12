import React, {Component} from 'react';

class Valve extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {open: false};
    }

    toggle(){
        this.setState({open: !this.state.open});
    }
    render(){
        return(
            <div>
                <div><p>{this.state.open ? "Open" : "Closed" }</p></div>
                <div>
                    <svg width={50} height={50}>
                    <g>
                   <path id="cap"
                      fill={this.state.open ? "green" : "red" } stroke="#000000" strokeWidth="1px"
                      d="M 0.125,15.875 0.25,31.5 32.125,16.25 32.5,31.625 Z"
                      />
                   <path
                   fill="none" stroke="#000000" strokeWidth="1px"
                      d="M 16.375,23.75 16.25,11.625"
                       />
                   <path id="body"
                      fill={this.state.open ? "green" : "red" } stroke="#000000" strokeWidth="1px"
                      id="path4560"
                      type="arc"
                      cx="-16.222572"
                      cy="-13.183418"
                      rx="10.875"
                      ry="11.0625"
                      start="0"
                      end="3.1415927"
                      open="true"
                      d="m -5.3475723,-13.183418 a 10.875,11.0625 0 0 1 -5.4374997,9.5804058 10.875,11.0625 0 0 1 -10.875001,-2e-7 10.875,11.0625 0 0 1 -5.437499,-9.5804066"
                      transform="rotate(179.79385)"
                       />
                 </g>
                    </svg>
                </div>
                <div>
                    <button className="btn" onClick={this.toggle.bind(this) }>{this.state.open ? "Close" : "Open"}</button>
                </div>
            </div>
        )
    }
}

export default Valve;