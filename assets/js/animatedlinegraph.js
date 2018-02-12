import React, {Component} from 'react';

import ReactDOM from 'react-dom';

import * as d3 from 'd3';
import { lab } from 'd3-color';

class AnimatedLineChart extends React.Component{
    componentWillMount(){
        this.margins = {
            x: 20,
            y: 20            
        }
        
        this.xscale = d3.scaleLinear()
            .range([this.margins.x, this.props.width])
            .domain([this.props.xmin, this.props.xmax]);

        this.yscale = d3.scaleLinear()
            .range([this.props.height, this.margins.y])
            .domain([this.props.ymin, this.props.ymax]);

        this.xaxis = d3.axisBottom(this.xscale);
        this.yaxis = d3.axisLeft(this.yscale);
        
    }
    
    render(){
        return(
            <svg width={this.props.width + this.margins.x} height={this.props.height + this.margins.y} >
                <rect x={0} y={0} width={this.props.width + this.margins.x} height={this.props.height + this.margins.y} fill="steelblue" /> 
                <XAxis xaxis={this.xaxis} height={this.props.height} {...this}/>
                <YAxis yaxis={this.yaxis} xMargin={this.margins.x}/>
                {this.props.shaded ? 
                    <ShadedLine xscale={this.xscale.bind(this)} yscale={this.yscale.bind(this)} ymax={this.props.ymax} xmax={this.props.xmax}/>
                    :
                    <Line xscale={this.xscale.bind(this)} yscale={this.yscale.bind(this)} ymax={this.props.ymax} xmax={this.props.xmax}/>
                }
                
            </svg>
        )
    }
}

class YAxis extends React.Component{
    componentDidMount(){
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.yaxis);
    }

    render(){
        var ytranslate = "translate(" + this.props.xMargin + ", 0)";
        return(
            <g className="yaxis" transform={ytranslate}></g>
        )
    }
}

class XAxis extends React.Component{
    componentDidMount(){
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.xaxis);

    }

    render(){
        var xtranslate = "translate(0,"+ this.props.height +")";
        return(
            <g className="xaxis" transform={xtranslate}></g>
        )
    }
}

class Line extends React.Component{
    constructor(props){
        super(props);
        this.state={
            d: "M 0 0",
            data: new Array(),
            
        }
    }

    componentWillMount(){
        this.timerID = setInterval(() => {
            this.updateLine();
        }, 200);
        this.line = d3.line()
            .x((d, i) => { return this.props.xscale(i) })
            .y((d, i) => { return this.props.yscale(d) });
    }
        

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    updateLine(){
        var node = d3.select("#line");
        node.data([this.state.data])
                .attr("class", "line")
                .attr("d", this.line);
        var val;
        $.ajax({
                    url: '/ajax/get',
                    method: 'GET',
                    success: (resp) => {
                        val =  resp;
                    }
                });
        let temp = this.state.data;
        if(this.state.data.length > this.props.xmax){
            temp.shift();
        }
        temp.push(val);  
        this.setState({data: temp});
        
        var cx = this.props.xscale(this.state.data.length - 1);
        var cy = this.props.yscale(this.state.data[this.state.data.length - 1]);
        
        node.transition()
            .attr("d", this.line);    
        
        d3.select("#pointer")
            .transition()
                .attr("cx", cx)
                .attr("cy", cy);
        
    }
    render(){
        return(
            <g>
                <path id="line" strokeWidth={2} stroke="white" fill="none" />
                <circle id="pointer" cx={0} cy={0} r={5} fill={
                    this.state.data[this.state.data.length - 1] > 5 ? 
                    "green"
                    :
                    "red"
                } />
            </g>
        );
    }
}

class ShadedLine extends React.Component{
    constructor(props){
        super(props);
        this.state={
            d: "M 0 0",
            data: new Array(),
            
        }
    }

    componentWillMount(){
        this.timerID = setInterval(() => {
            this.updateLine();
        }, 200);
        this.line = d3.line()
            .x((d, i) => { return this.props.xscale(i) })
            .y((d, i) => {
                if(i == 0){
                    return this.props.yscale(0);
                }else if(i == (this.props.xmax)){
                    return this.props.yscale(0);
                }else{
                    return this.props.yscale(d);
                }  
            });
    }
        
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    updateLine(){
        var node = d3.select("#sline");
        var area = d3.select("#area");

        area.data([this.state.data])
            .attr("d", this.line);
        
        node.data([this.state.data])
            .attr("d", this.line);
        
        var val =  Math.floor(Math.random() * this.props.ymax);
        
        let temp = this.state.data;
        if(this.state.data.length > (this.props.xmax)){
            temp.shift();
        }
        temp.push(val);
        
        this.setState({data: temp});
        
        var cx = this.props.xscale(this.state.data.length - 2);
        var cy = this.props.yscale(this.state.data[this.state.data.length - 2]);
        this.setState({lineX: cx});
        node.transition()
            .attr("d", this.line);    
        area.transition()
            .attr("d", this.line);
        d3.select("#spointer")
            .transition()
                .attr("cx", cx)
                .attr("cy", cy);
        
    }
    render(){
        var line_x = () => {
            if(this.state.length == 0){
                return this.props.xscale(0);
            }else{
                return this.props.xscale(this.state.data[this.state.data.length - 1]);
            }
            
        }
        return(
            <g>
                <path id="sline" strokeWidth={2} stroke="white" fill="none" />
                <path id="area" strokeWidth={0} stroke="white" fill="white" />
                <circle id="spointer" cx={0} cy={0} r={5} fill={
                    this.state.data[this.state.data.length - 1] > 5 ? 
                    "green"
                    :
                    "red"
                } />
                <line x1={this.state.lineX} y1={0} x2={this.state.lineX} y2={this.props.height} width={2} height={this.props.height} fill="black" />
            </g>
        );
    }
}

export default AnimatedLineChart;