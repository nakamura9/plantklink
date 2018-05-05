import React, {Component} from 'react';

import ReactDOM from 'react-dom';

import * as d3 from 'd3';

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
        this.state= {angle: 0,
                    currValue: 0};
    }

    currValue(){
        //converts the angle to a numerical input value
        /*$.ajax({
            url: '/ajax/get',
            method: 'GET',
            success: (resp) => {
                this.setState({currValue: resp});
            }
        });
        */
        this.setState({currValue: Math.floor(Math.random() * 10)});
        return this.state.currValue;
    }

    
    getAngle(){
        //this is used by the needle to obtain the updated angle for the state
        //currently just a random number
        
        //first update value
        this.currValue();
        
        //obtain an angle that corresponds to that value
        var angle = (this.state.currValue / 
            (this.props.rangeUpper - this.props.rangeLower)) * 
                this.props.scaleAngle;
        
        this.setState({
            angle: angle 
        });        
        return this.state.angle;
    }

    render(){
        return(
            <svg width={this.props.width} height={this.props.height}>
                <Scale width={this.props.width -10} 
                        height={this.props.height-10} 
                        scaleAngle={this.props.scaleAngle} 
                        rangeLower={this.props.rangeLower} 
                        rangeUpper={this.props.rangeUpper} 
                        scaleDivisions={this.props.scaleDivisions} />
                
                    <Needle parentState={this.getAngle.bind(this)} 
                        width={this.props.width} height={this.props.height} angle={this.state.angle} />
                    <text x={(this.props.width / 2) - 5} 
                        y={(this.props.height / 2) - (this.props.height / 10) }>
                                {this.state.currValue}
                    </text>
            </svg>
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
    polarToCartesian(cx, cy, r, angleDeg){
        /*
        Converts polar form to cartesian form. Polar form consists of an
        angle and a magnitude. these are measured from center r
        Function returns an object of x and y values for pixels. */
        var angleInRad = (angleDeg) * Math.PI / 180;
        return {
                x: cx + (r * Math.cos(angleInRad)),
                y: cy + (r * Math.sin(angleInRad))
            };
    }


    markerPoints(){
        var end = this.polarToCartesian(this.props.cx, this.props.cy, 10, this.props.angle);
        return ({
            x: this.props.cx,
            y: this.props.cy,
            xx: end.x,
            yy: end.y
        })
    }

    render(){
        let linePoints = this.markerPoints(); 
        return(
            <g >
                <text fontSize="12" x={linePoints.xx} y={linePoints.yy + 12}>{this.props.value}</text>
                <line x1={linePoints.x} y1={linePoints.y} x2={linePoints.xx} 
                    y2={linePoints.yy} stroke="red" strokeWidth={5} /> 
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

            var label = (<Label key={"dial-label-" + i} cy={coords.y} cx={coords.x} value={this.props.rangeLower + (i * resolution)} angle={angleDeg} />)
            labels.push(label);
        }
        return labels;
    }

    render(){
        var labels = this.addDialMarkers();
        var d = this.svgArc(this.cx, this.cy, this.cx - 2, 0, this.props.scaleAngle);
        return(
            <g>
                <path d={d} stroke="red" strokeWidth={2} fill="none" />
                {labels}
            </g>
        );
    }
}


class Needle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            x: 0,
            y: this.props.height / 2,
            angle: this.props.parentState()
        }
    }

    componentDidMount(){
        this.timerID = setInterval(() =>{
            this.translate()
        }, 200);
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    translate(){
        //call only once
        this.setState({angle: this.props.parentState()});
        let needle = d3.select(ReactDOM.findDOMNode(this));
        let tween = (d, i, a) => {
            return d3.interpolateString(a, "rotate(" + this.state.angle + ", "+  (this.props.width / 2) +", "+ (this.props.height / 2) +")");
        }
        needle.transition()
            .duration(300)
            .attrTween("transform", tween);    
        }
        
    render(){
        return(
            <g>
                <circle cx={this.props.width / 2} cy={this.props.height / 2} r={this.props.height / 15} fill="red" />
                <line x1={this.props.width / 2} y1={this.props.height / 2} 
                x2={this.state.x} y2={this.state.y} style={{stroke: "rgb(255,0,0)", strokeWidth:"2"}} />
            </g>
        );
    }       
}

export default DialWidget;