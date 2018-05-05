import React, {Component} from "react";

class KnobWidget extends React.Component{
    constructor(props){
        super(props);
        this.center= this.props.dia / 2;
        let coords = this.polarToCartesian(
            this.center, this.center, this.center - 30, this.props.start);
        this.delta = Math.floor((this.props.end - this.props.start) / (this.props.max - this.props.min));

        this.state = {
            val: this.props.min,
            indicator: {
                x: coords.x,
                y: coords.y
            }
        
        };
        
    }
    setAngle(){
        let coords = this.polarToCartesian(
            this.center, this.center, this.center - 30, this.delta * this.state.val);

        this.setState({indicator:{
            x: coords.x,
            y: coords.y
        }});
    }
    increment(){
        if(this.state.val != this.props.max){
            this.setState({val: this.state.val + 1});
        }
        this.setAngle();
    }

    decrement(){
        if(this.state.val != this.props.min){
            this.setState({val: this.state.val - 1});
        }
        this.setAngle();
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

    render(){
        const btnStyle = {width: "100%"};
        return(
            <div>
                <svg width={this.props.dia} height={this.props.dia}>
                    <Knob dia={this.props.dia} indicator={this.state.indicator}/>
                    <KnobScale start={this.props.start} end={this.props.end} dia={this.props.dia} />
                    <text x={this.props.dia / 2} y={this.props.dia / 2}>{this.state.val}</text>
                </svg>
                <div className="btn-group" style={btnStyle}>
                    <button onClick={this.decrement.bind(this)} 
                        className="btn btn-danger">(-)</button>
                    <button onClick={this.increment.bind(this)} 
                        className="btn btn-success">+</button>
                </div>
            </div>
            
        )
    }
}

class Knob extends React.Component{
    render(){
        return(
            <g>
                <circle cx={this.props.dia / 2}
                    cy={this.props.dia / 2}
                    r={(this.props.dia / 2) - 20}
                    stroke="black"
                    fill="grey"
                    strokeWidth={1}
                    />
                <circle cx={this.props.indicator.x} 
                    cy={this.props.indicator.y}
                    r={this.props.dia / 20}
                    fill="white" /> 
            </g>
        );
    }
}

class KnobScale extends React.Component{
    
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

    render(){
        let c = this.props.dia / 2
        var d= this.svgArc(c, c, c - 5, this.props.start, this.props.end);
        return(
            <path d={d} stroke="red" strokeWidth={2}
                fill="none" />
        );
    }
}

export default KnobWidget;