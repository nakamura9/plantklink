import React, {Component} from 'react';

import ReactDOM from 'react-dom';

import * as d3 from 'd3';



class AnimatedBar extends React.Component{
    /* Describes a single bar element that is animated.
    consists of svg with a d3 scale group and an animating bar.
    
    Props
    =======
    dataMin
    dataMax
    width
    height

    */
    constructor(props){
        super(props);
        this.state = {
            val: 0
        };
    }

    updateVal(){
        this.setState({val: Math.floor(Math.random() * 10)});
        var scaledVal = this.scale(this.state.val);
        return scaledVal;
    }

    componentWillMount(){
        
        this.scale = d3.scaleLinear()
            .range([this.props.height, 0])
            .domain([this.props.dataMin, this.props.dataMax])

        this.axis = d3.axisLeft(this.scale); 
    }

    render(){
        return(
            <svg width={this.props.width} height={this.props.height + 20}>
                <Axis height={this.props.height} axis={this.axis} />
                <Bar updater={this.updateVal.bind(this)} 
                    height={this.props.height} 
                    width={this.props.width} scaler={this.scale}/>
                <text x={0} y={this.props.height + 20} fontSize={20}>{this.state.val}</text> 
            </svg>
        );
    }
}

class Axis extends React.Component{
    componentDidMount(){
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);

    }
    render(){
        var translate = "translate(15, 0)";   
        return(
            <g className="axis" transform={translate}></g>
        )
    }
}

class Bar extends React.Component{
    /* Moving bar that has updates depending on the data rendered.
    
    Props
    =====
    dataGetter
    
    
    State
    =====
    val
    */
    constructor(props){
        super(props);
        this.state = {val: this.props.updater()};
    }
    updateBar(){
        this.setState({val: this.props.updater()});
    }
    componentWillMount(){
        this.timerID = setInterval(() =>{
            this.updateBar();
            }, 200);
        }

    componentWillUnmount(){
        clearInterval(this.timerID);
        }

    render(){
        return(
            <rect x={15} y={this.state.val} width={this.props.width} 
                height={this.props.height -this.state.val} />
        );
    }
}
export default AnimatedBar;