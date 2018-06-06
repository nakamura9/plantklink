import React, {Component} from 'react';

// dummy class doesnt work
export default class Line {
    constructor(props){
        super(props);
        this.state = {
            end: {
                x: 0,
                y: 0
            }
        }
    }
    
    mouseDownHandler(evt){
        this.origin = {
            x: evt.pageX,
            y: evt.pageY,
        };
        this.setState({end: this.origin})
    }
    
    mouseMoveHandler(evt){
        this.setState
    }
    render(){
        return(
            <line x1={this.origin.x} y1={this.origin.y} x2=
        )
    }
}