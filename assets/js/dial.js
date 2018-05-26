import React, {Component} from 'react';

import ReactDOM from 'react-dom';

import * as d3 from 'd3';
import Animate from 'react-move/Animate';

//bug with initial position of widget

class DialWidget extends React.Component{
    /* 
    Super widget that consists of a scale and a needle component
    wrapped around an svg element
    Props
    =====
    width -number in pixels
    height - number in pixels 
    scaleAngle - the angle swept by the scale
    scaleIntervals - the number of divisions along the scale
    rangeUpper - the maximum value on the scale
    rangeLower - the minimum value on the scale
    
    */
    constructor(props){
        //the angle determines the position of the needle
        super(props);
        this.valRange = this.props.rangeUpper - this.props.rangeLower;
        this.state= {angle: 0,
                    currValue: 0};
    }

    currValue(){
        
       var val = Math.floor(Math.random() * this.valRange);
        this.setState({currValue:  this.props.rangeLower + val});
    }

    
    getAngle(){
        //this is used by the needle to obtain the updated angle for the state
        //currently just a random number
        
        //first update value
        this.currValue();
        
        //obtain an angle that corresponds to that value
        var angle = ((this.state.currValue - this.props.rangeLower) / 
                        this.valRange) * this.props.scaleAngle;
        
        this.setState({
            angle: angle 
        });        
        return angle;
    }

    render(){
        return(
            <div>
            <h5>{this.props.name}</h5>
            <svg width={this.props.width} height={this.props.height}>
                <rect x={0} y={0} 
                      width={this.props.width} 
                      height={this.props.height}
                      fill = {this.props.bgColor} />
                <Scale width={this.props.width} 
                        height={this.props.height} 
                        scaleAngle={this.props.scaleAngle} 
                        rangeLower={this.props.rangeLower} 
                        rangeUpper={this.props.rangeUpper} 
                        scaleDivisions={this.props.scaleDivisions}
                        color={this.props.scaleColor} />
                
                    <Needle parentState={this.getAngle.bind(this)} 
                        width={this.props.width} height={this.props.height} angle={this.state.angle}
                        color={this.props.scaleColor} />
                    <text x={(this.props.width / 2) - 15} 
                        y={(this.props.height / 2) +18} fill="white" fontSize={48}>
                                {this.state.currValue}
                    </text>
            </svg>
            </div>
        );
    }
}

class Label extends React.Component{
    /* 
    One of multiple components inserted along the dial scale.
    Props:
    =====
    cx - lower left corner position x value
    cy - lower left corner position y value
    value- the label value 
    */
    
    render(){
        return(
            <g transform={"rotate(" + this.props.angle + "," + this.props.cx + "," + this.props.cy + ")"}>
                <text transform={"rotate("+ (-this.props.angle) + ",24,"+ this.props.cy +")"} fontSize="16" fill={this.props.color}  x={16} y={this.props.cy + 6}>{this.props.value}</text>
                
                <line strokeLinecap="round" x1={3 + Math.cos(this.props.angle)} y1={this.props.cy} x2={10} 
                    y2={this.props.cy} stroke={this.props.color} strokeWidth={5} /> 
            </g>
        )
    }
}

class Scale extends React.Component{
    /*
    Scale that has a arc for the graphical representation and multiple 
    label widgets
    */
    constructor(props){
        super(props);
        //just to shorten the frequently used values
        this.cx = props.width / 2;
        this.cy = props.height / 2;
    }
    polarToCartesian(cx, cy, r, angleDeg){
        /*
        Converts polar form to cartesian form. Polar form consists of an
        angle and a magnitude. these are measured from center r
        Function returns an object of x and y values for pixels. */
        var angleInRad = (angleDeg-180) * Math.PI / 180;
        return {
                x: cx + (r * Math.cos(angleInRad)),
                y: cy + (r * Math.sin(angleInRad))
            };
    }

    svgArc(x, y, radius, startAngle, endAngle){
        /*
        Using supplied values, creates an arc path string based on the 
        coordinates of the start point and the endpoint as well as the radius 
        of the arc
        */

        //points used to contain the arc
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);

        // if the angle is greater than 180 degrees
        var largeArcFlag = (endAngle - startAngle < 180) ? "0" : "1";
        
        //returns the path string M - move, A - arc
        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");

        return d;
    }

    addDialMarkers(){
        /*Adds the markers as well as the label text values. returns an array of JSX elements */
        var span = this.props.rangeUpper - this.props.rangeLower;
        var resolution = span / this.props.scaleDivisions;
        var labels = [];
        
        var i=0;
        for(i=0; i < (this.props.scaleDivisions + 1); i++){
            var angleDeg = (this.props.scaleAngle / this.props.scaleDivisions) * i;
            var coords =this.polarToCartesian(this.cx, this.cy, 
                    this.cx -2, angleDeg)

            var label = (<Label key={"dial-label-" + i} 
                                color={this.props.color} 
                                cy={this.props.height /2} 
                                cx={this.props.height / 2} 
                                value={this.props.rangeLower + (i * resolution)}angle={angleDeg} />);
            labels.push(label);
        }
        return labels;
    }

    render(){
        var labels = this.addDialMarkers();
        var stroke = 5;
        var d = this.svgArc(this.cx, this.cy, this.cx-(stroke / 2) , 0, this.props.scaleAngle);
        return(
            <g>
                <path d={d} stroke={this.props.color} strokeWidth={stroke} fill="none" />
                {labels}
            </g>
        );
    }
}


class Needle extends React.Component {
    constructor(props){
        super(props);
        this.center = {
            x:this.props.width / 2,
            y: this.props.height / 2,
            delta: this.props.height / 10
        }

        this.polyPoints = this.center.x + "," + 
                        (this.center.y - this.center.delta) + 
                        " " + this.center.x + "," + 
                        (this.center.y + this.center.delta) + 
                        " 0," + this.center.y;

        this.state = {
            angle: this.props.parentState()
        }
    }

    componentDidMount(){
        this.timerID = setInterval(() =>{
            this.translate()
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    translate(){
        //call only once
        
        this.setState({angle: this.props.parentState()});
        /*let needle = d3.select(ReactDOM.findDOMNode(this));
        let tween = (d, i, a) => {
            return d3.interpolateString(a, "rotate(" + this.state.angle + ", "+  (this.props.width / 2) +", "+ (this.props.height / 2) +")");
        }
        needle.transition()
            .duration(800)
            .attrTween("transform", tween);*/   
        }
        
    render(){  
        return(
            <Animate start={() => ({
                angle: 0
            })} update={() => ({
                angle: this.state.angle,
                timing: {duration: 1000,
                        ease: d3.easeBackOut}
            })}>
                {(state) =>{
                    return(
                        <g transform={"rotate(" + state.angle + "," + this.center.x + "," + this.center.y + ")"}>
            <polygon points={this.polyPoints} style={{fill:this.props.color, strokeColor:this.props.color}}/>
                <circle cx={this.center.x} cy={this.center.y} r={this.props.height / 10} fill={this.props.color} />
            </g>
                    );
                }}
            </Animate>
        );
    }       
}

export default DialWidget;