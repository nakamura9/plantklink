import React, {Component} from 'react';

import {XAxis, YAxis} from './common';

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
        var val = this.props.updater();
        var node = ReactDOM.findDOMNode(this)
            
        d3.select(node)
            .transition(100)
            .attr("y", val)
            .attr("height", this.props.height - val);
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

class MultiBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {flag: this.props.flag};
    }

    currVal(){
        var node = ReactDOM.findDOMNode(this);
        var y = this.props.updater(this.props.index);
        d3.select(node)
            .transition(100)
            .attr("y", y)
            .attr("height", this.props.height - y);
    }

    componentDidMount(){
        this.currVal();
        this.timeID = setInterval(() =>{
            this.currVal();
        }, 200);
    }
    
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    render(){
        return(
            <rect x={this.props.x} 
            y={0}
            width={this.props.width} 
            height={this.props.height} 
            fill="white" />
        );
    }
}

class MultipleAnimatedBar extends React.Component{
    constructor(props){
        super(props);
        /*
        width
        height 
        nBars
        margin
        */
        this.xscale = d3.scaleLinear()
            .range([this.props.margin, this.props.width])
            .domain([this.props.xmin, this.props.xmax]);

        this.yscale = d3.scaleLinear()
            .range([this.props.height, this.props.margin])
            .domain([this.props.ymin, this.props.ymax]);

        this.xaxis = d3.axisBottom(this.xscale);
        this.yaxis = d3.axisLeft(this.yscale);

        this.state = {
            barVals: new Array(),
        };
    }
    
    getVal(index){
        return this.yscale(this.state.barVals[index]);
    }

    updateBars(){
        var temp = new Array();
        var i;
        for(i=0; i < this.props.nBars; i++){
            temp.push(Math.floor(Math.random() * 12));
        }
        this.setState({
            barVals: temp
        });
    }

    componentWillMount(){
        this.bars = new Array();
        var i;
        var barWidth = Math.floor(this.props.width / this.props.nBars) - 2; 
        for(i=0; i < this.props.nBars ; i++ ){
            this.state.barVals[i] = Math.floor(Math.random() * 10);
            this.bars.push(
                <MultiBar key={"bar_" + i.toString()} 
                    x={this.props.margin + 
                        (this.props.width / this.props.nBars) * i} 
                    index={i}  
                    updater={this.getVal.bind(this)}
                    height={this.props.height} 
                    width={barWidth} />);
        }

        this.timerID = setInterval(() => {
            this.updateBars();
        }, 200)
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    
    render(){
        return(
            <svg width={this.props.width + this.props.margin} height={this.props.height + this.props.margin}>
                <YAxis yaxis={this.yaxis} xMargin={this.props.margin} />
                <XAxis xaxis={this.xaxis} height={this.props.height} />
                <rect fill="red" 
                x={this.props.margin} 
                y={0} 
                width={this.props.width} 
                height={this.props.height} />
                {this.bars}
            </svg>
        );
    }
}

export {AnimatedBar, MultipleAnimatedBar};