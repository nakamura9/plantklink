import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Animate from 'react-move/Animate';

class ArcDial extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 0
        };
        
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
    
    getVal(){
        this.setState({value: Math.floor(Math.random() * this.props.rangeUpper)});
        return this.state.value;
    }
    render(){
        var midpoints = {
            x: this.props.width / 2,
            y: this.props.height / 2
        }
        let radius = midpoints.x - (this.props.arcThickness / 2);
        var d = this.svgArc(midpoints.x, midpoints.y, radius, 0, this.props.angleExtent);

        return(
            <div>
            <h5>{this.props.name}</h5>
            <svg width={this.props.width} height={this.props.height}>
                <rect width={this.props.width} 
                    height={this.props.height} 
                    x={0} 
                    y={0} 
                    fill={this.props.backgroundColor} />
                <path d={d} 
                    stroke="rgb(230,230,230)" 
                    strokeWidth={this.props.arcThickness} 
                    fill="none" />
                <Arc getVal={this.getVal.bind(this)} 
                    angleExtent={this.props.angleExtent} 
                    color={this.props.color} 
                    svgArc={this.svgArc.bind(this)} 
                    x={midpoints.x} 
                    y={midpoints.y}
                    arcThickness={this.props.arcThickness}
                    rangeUpper={this.props.rangeUpper} />
                <text 
                    x={midpoints.x - (this.props.labelSize / 2)} 
                    y={(this.props.angleExtent <= 180)
                        ? midpoints.y
                        : midpoints.y + (this.props.labelSize / 2)}
                    fontSize={this.props.labelSize}   
                    fill={(this.props.backgroundColor === "white")
                            ? this.props.color
                            : "white"}>{this.state.value}</text>
            </svg>
            </div>
        );
    }
}

class Arc extends Component{
    constructor(props){
        super(props);
        this.radius = this.props.x - (this.props.arcThickness / 2);
        this.initPathD = this.props.svgArc(this.props.x, this.props.y, this.radius, 0, 0);
        this.state = {
            value:  0,
            d: this.initPathD
        };
    }

    tick(){
        var increment = this.props.angleExtent / this.props.rangeUpper;
        var oldAngle = this.state.value * increment;
        var val = this.props.getVal();
        var angle = increment * val;
        let pathD = this.props.svgArc(this.props.x, this.props.y, this.radius, 0, angle);
        this.setState({value: val,
                        d: pathD
                        });
    }

    componentDidMount(){
        this.ticker = setInterval(() => {this.tick()}, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.ticker);
    }

    render(){ 
        return(
            <Animate start={() =>({
                value: 0,
                d: this.initPathD
            })} 
                update={() =>({
                    value: this.state.value,
                    d: this.state.d,
                    timing: {duration: 500,
                            ease: d3.easeBackOut}
                })} >
                {(state) => {
                    return(
                        <path d={this.state.d} stroke={this.props.color} strokeWidth={this.props.arcThickness} fill="none" />
                    );
                }}
        </Animate>
            
        );
    }
}

export default ArcDial;
