import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class BBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            origin: {
                x: props.x,
                y: props.y,
            },
            height: 100,
            width: 100
        }
    }

    LRHandler(x, y){
        //lower right
        this.setState({
            height: this.state.height - y,
            width: this.state.width - x
            });
    }

    URHandler(x, y){
        //upper right
        this.setState({
             width: this.state.width - x,
             height: this.state.height + y,
             origin:{
                x: this.state.origin.x,
                y: this.state.origin.y - y
             }
            });
    }

    LLHandler(x, y){
        //lower left
        this.setState({
            width: this.state.width + x,
            height: this.state.height - y,
            origin: {
                x: this.state.origin.x - x,
                y: this.state.origin.y
            }
            });
    }

    ULHandler(x, y){
        //upper left
        this.setState({
             width: this.state.width + x,
             height: this.state.height + y,
             origin:{
                x: this.state.origin.x -x,
                y: this.state.origin.y - y
             }
            });

    }
    LVHandler(x, y){
        //left vertical handler
        this.setState({
            width: this.state.width + x,
            origin:{
                x: this.state.origin.x -x,
                y: this.state.origin.y
            }
        });
    }

    LHHandler(x, y){
        this.setState({
            height: this.state.height - y,
        });
    }

    UHHandler(x, y){
        this.setState({
            height: this.state.height + y,
            origin:{
                x: this.state.origin.x,
                y: this.state.origin.y - y
            }
        });
    }

    RVHandler(x, y){
        this.setState({
            width: this.state.width - x,
        });
    }

    render(){
        return(
            <g>
                <UpperLeftCorner {...this.state}
                    dimHandler={this.ULHandler.bind(this)} />
                <UpperRightCorner  {...this.state}
                    dimHandler={this.URHandler.bind(this)}/>
                <LowerRightCorner {...this.state} 
                    dimHandler={this.LRHandler.bind(this)}/>
                <LowerLeftCorner {...this.state} 
                    dimHandler={this.LLHandler.bind(this)}/>
                <RotationHandle {...this.state}/>
                <LeftVerticalEdge {...this.state}
                    dimHandler={this.LVHandler.bind(this)}/>
                <UpperHorizontalEdge {...this.state} 
                    dimHandler={this.UHHandler.bind(this)}/>
                <RightVerticalEdge {...this.state} 
                    dimHandler={this.RVHandler.bind(this)}/>
                <LowerHorizontalEdge {...this.state} 
                    dimHandler={this.LHHandler.bind(this)}/>
            </g>
        );
    }
}

class UpperHorizontalEdge extends Component{
    handleMouseDown = (event) =>{
        // find the mouse coordinates 
        this.coords = {
            x: event.pageX,
            y: event.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = (e) =>{
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.props.dimHandler(xDiff, yDiff);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
    };
    
    render(){
        var midpoint = this.props.width / 2;
        return(
                <rect x={this.props.origin.x + (this.props.width / 2) - 5} 
                      y={this.props.origin.y } 
                      width={10} height={10} 
                      fill="black"
                      onMouseDown={this.handleMouseDown.bind(this)}
                      onMouseUp={this.handleMouseUp.bind(this)} />
        );
    }
}

class LowerHorizontalEdge extends Component{
    handleMouseDown = (event) =>{
        // find the mouse coordinates 
        this.coords = {
            x: event.pageX,
            y: event.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = (e) =>{
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.props.dimHandler(xDiff, yDiff);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
    };

    render(){
        var midpoint = this.props.width / 2;
        return(
            <rect x={this.props.origin.x + (this.props.width / 2) - 5} 
                      y={this.props.origin.y + this.props.height -10} 
                      width={10} height={10} 
                      fill="black"
                      onMouseDown={this.handleMouseDown.bind(this)}
                      onMouseUp={this.handleMouseUp.bind(this)} />
            
        );
    }
}

class LeftVerticalEdge extends Component {
    handleMouseDown = (event) =>{
        // find the mouse coordinates 
        this.coords = {
            x: event.pageX,
            y: event.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = (e) =>{
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.props.dimHandler(xDiff, yDiff);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
    };
    
    render(){
        var midpoint = this.props.height / 2;
        return(
            <rect x={this.props.origin.x } 
                      y={this.props.origin.y + (this.props.height / 2) - 5} 
                      width={10} height={10} 
                      fill="black"
                      onMouseDown={this.handleMouseDown.bind(this)}
                      onMouseUp={this.handleMouseUp.bind(this)} />
        );
    }
}   

class RightVerticalEdge extends Component {
    handleMouseDown = (event) =>{
        // find the mouse coordinates 
        this.coords = {
            x: event.pageX,
            y: event.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = (e) =>{
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.props.dimHandler(xDiff, yDiff);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
    };
    
    render(){
        var midpoint = this.props.height / 2;
        return(
            <rect x={this.props.origin.x + this.props.width -10} 
                      y={this.props.origin.y + (this.props.height / 2) - 5} 
                      width={10} height={10} 
                      fill="black"
                      onMouseDown={this.handleMouseDown.bind(this)}
                      onMouseUp={this.handleMouseUp.bind(this)} />
        );
    }
}

class UpperLeftCorner extends Component{
    handleMouseDown = (event) =>{
        // find the mouse coordinates 
        this.coords = {
            x: event.pageX,
            y: event.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = (e) =>{
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.props.dimHandler(xDiff, yDiff);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
    };

    render(){
        return(
            <rect x={this.props.origin.x} 
                  y={this.props.origin.y} 
                  width={10} height={10} 
                  fill="black"
                  onMouseDown={this.handleMouseDown.bind(this)}
                  onMouseUp={this.handleMouseUp.bind(this)} /> 
        );
    }
}

class UpperRightCorner extends Component{
    handleMouseDown = (event) =>{
        // find the mouse coordinates 
        this.coords = {
            x: event.pageX,
            y: event.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = (e) =>{
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.props.dimHandler(xDiff, yDiff);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
    };

    render(){
        return(
            <rect x={this.props.origin.x + this.props.width - 10} 
                  y={this.props.origin.y} 
                  width={10} height={10} 
                  fill="black" 
                  onMouseDown={this.handleMouseDown.bind(this)}
                  onMouseUp={this.handleMouseUp.bind(this)}/>
        );
    }
}

class LowerLeftCorner extends Component{
    handleMouseDown = (event) =>{
        // find the mouse coordinates 
        this.coords = {
            x: event.pageX,
            y: event.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = (e) =>{
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.props.dimHandler(xDiff, yDiff);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
    };

    render(){
        return(
            <rect x={this.props.origin.x} 
                  y={this.props.origin.y + this.props.height - 10} 
                  width={10} height={10} 
                  fill="black"
                  onMouseDown={this.handleMouseDown.bind(this)}
                  onMouseUp={this.handleMouseUp.bind(this)} />
        );
    }
}

class LowerRightCorner extends Component{
    
    handleMouseDown = (event) =>{
        // find the mouse coordinates 
        this.coords = {
            x: event.pageX,
            y: event.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = (e) =>{
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.props.dimHandler(xDiff, yDiff);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
    };

    render(){
        return(
            <rect x={this.props.origin.x + this.props.width - 10} 
                  y={this.props.origin.y + this.props.height - 10} 
                  width={10} height={10} 
                  fill="black"
                  onMouseDown={this.handleMouseDown.bind(this)}
                  onMouseUp={this.handleMouseUp.bind(this)} />
        );
    }
}

class RotationHandle extends Component{
    //origin 
    // parent height 
    //parent width
    render(){
        var midpoint= this.props.width / 2;
        return(
            <g>
                <line x1={this.props.origin.x + midpoint} 
                    y1={this.props.origin.y - 30} 
                    x2={this.props.origin.x + midpoint} 
                    y2={this.props.origin.y}
                    stroke="black"
                    strokeWidth={2} />
                <circle cx={this.props.origin.x + midpoint} 
                        cy={this.props.origin.y -30 } 
                        r={8} fill="yellow" 
                        strokeWidth={2} 
                        stroke="black" />
            </g>
        );
    }
}
export default BBox;