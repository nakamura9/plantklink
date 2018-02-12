import React, {Component} from "react";

import * as d3 from 'd3';

class Slider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: this.props.min,
            position: this.getPos()
        };
    }
    getPos(){
        let range = this.props.max - this.props.min;
        if(!this.state.value){
            return 0;
        }else{
            return(this.state.value / range ) * this.props.width;
        }
        
    }
}