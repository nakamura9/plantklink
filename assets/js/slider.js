import React, {Component} from "react";

import * as d3 from 'd3';
import { XAxis, YAxis } from "./common";
//fix offset bug!!!
class SliderWidget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            captured: false,
            x: 0,
            val: 0
        };
        this.scaleMargin = 20;
        this.valMargin = 40;
        this.scale = d3.scaleLinear()
            .range([0, this.props.width])
            .domain([this.props.min, this.props.max]);
        this.axis=d3.axisTop(this.scale);
        
        this.sliderWidth = this.props.width / 15;
        
    }

    capture(e){
        this.setState({captured: true});
    }

    release(e){
        this.setState({captured: false});
    }
    
    logDrag(e){
        if(this.state.captured && e.nativeEvent.offsetX < this.props.width){
            let newPos = () =>{
                let widWidth = this.props.width * 15;
                let x = e.nativeEvent.offsetX - (this.sliderWidth / 2)
                return (x > 0 ? x : 0);
            }
            this.setState({
                x: newPos(),
                val: Math.ceil(this.scale.invert(this.state.x))
            });
        }
    }
    
    render(){
        this.rectHeight = () => {
            if(this.props.height < 51){
                return Math.floor(this.props.height / 10);
            }
            return 3;
        }
        this.midpoint = () => {
            return (this.props.height / 2) - (this.rectHeight() / 2);
        }
        var scaleTranslate = "translate(0, " + this.props.height +")";
        return(
            <svg width={this.props.width + this.valMargin} 
                height={this.props.height + this.scaleMargin} 
                onMouseDown={this.capture.bind(this)}
                onMouseUp={this.release.bind(this)}
                onMouseMove={this.logDrag.bind(this)}
                onMouseLeave={this.release.bind(this)} >
                <rect x={0} y={this.midpoint()+ this.scaleMargin} 
                    width={this.props.width} 
                    height={this.rectHeight()} 
                    rx={2} ry={2} />
                <rect x={0} y={this.midpoint() + this.scaleMargin -2} 
                    height={this.rectHeight() + 4}
                    width={this.state.x}
                    fill="rgb(26,220,17)"
                    rx={3} ry={3} />
                <Slider x={this.state.x} y={this.scaleMargin} 
                    width={this.sliderWidth} 
                    height={this.props.height}
                    round={this.props.round} />
                <XAxis xaxis={this.axis} height={this.scaleMargin} />
                <text x={this.props.width} y={this.props.height}
                    fontSize={24}>
                    {this.state.val}
                </text>
            </svg>
        );
    }
}

class Slider extends React.Component{
    render(){
        if(this.props.round){
            let cy =this.props.y + (this.props.height / 2); 
            
            return(
                <circle fill="white" cx={this.props.x}
                cy={cy}
                r={this.props.height / 4}
                stroke="black"
                strokeWidth={1} />
            );
        }else{
            return(
                <rect fill="white" x={this.props.x} y={this.props.y}
                rx={5} ry={5}
                strokeWidth={1}
                stroke="black" 
                width={this.props.width} 
                height={this.props.height}/>
            )
        }
        ;
    }
}

class VerticalSliderWidget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            captured: false,
            y: this.props.height,
            val: 0
        };
        this.scaleMargin = 20;
        this.valMargin = 40;
        this.scale = d3.scaleLinear()
            .range([this.props.height, 0])
            .domain([this.props.min, this.props.max]);
        this.axis=d3.axisLeft(this.scale);
        
        this.sliderHeight = this.props.width / 4;
        
    }

    
    capture(e){
        this.setState({captured: true});
    }

    release(e){
        this.setState({captured: false});
    }
    
    logDrag(e){
        if(this.state.captured && e.nativeEvent.offsetY < this.props.height){
            let newPos = () =>{
                let widWidth = this.props.width * 15;
                let y = e.nativeEvent.offsetY - (this.sliderHeight / 2);
                return (y > 0 ? y : 0);
            }
            this.setState({
                y: newPos(),
                val: Math.ceil(this.scale.invert(this.state.y))
            });
        }
    }
    
    render(){
        this.rectWidth = () => {
            if(this.props.width < 31){
                return Math.floor(this.props.width / 10);
            }
            return 3;
        }
        this.midpoint = () => {
            return (this.scaleMargin + (this.props.width / 2) - (this.rectWidth() / 2));
        }
        var scaleTranslate = "translate(0, " + this.props.height +")";
        return(
            <svg width={this.props.width + this.scaleMargin} 
                height={this.props.height + this.valMargin} 
                onMouseDown={this.capture.bind(this)}
                onMouseUp={this.release.bind(this)}
                onMouseMove={this.logDrag.bind(this)}
                onMouseLeave={this.release.bind(this)} >
                <rect x={this.midpoint() } y={0} 
                    width={this.rectWidth()} 
                    height={this.props.height} 
                    rx={2} ry={2} />
                <rect x={this.midpoint()} y={this.state.y} 
                    height={this.props.height - this.state.y}
                    width={this.rectWidth() + 4}
                    fill="rgb(26,220,17)"
                    rx={3} ry={3} />
                <VerticalSlider x={this.scaleMargin} y={this.state.y} 
                    width={this.props.width} 
                    height={this.sliderHeight}
                    round={this.props.round} />
                <YAxis yaxis={this.axis} xMargin={this.scaleMargin} />
                <text x={this.scaleMargin} y={this.props.height + this.valMargin}
                    fontSize={24}>
                    {this.state.val}
                </text>
            </svg>
        );
    }
}

class VerticalSlider extends React.Component{

    render(){
        if(this.props.round){
            return(
                <circle fill="white" cx={this.props.width}
                cy={this.props.y}
                r={this.props.width / 3}
                stroke="black"
                strokeWidth={1} />
            );
        }else{
            return(
                <rect fill="white" x={this.props.x} y={this.props.y}
                rx={5} ry={5}
                strokeWidth={1}
                stroke="black" 
                width={this.props.width} 
                height={this.props.height}/>
            )
        };
    }
}

export {SliderWidget, VerticalSliderWidget};