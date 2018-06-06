import React, {Component} from 'react';
import  BBox from './boundingbox';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            children: [],
            clicks: [],
            mouseDownHandler: (evt) => {
                var rect =event.target.getBoundingClientRect();
                var x = rect.left;
                var y = rect.top;
                console.log("mouse down: ", evt.pageY, " ", rect.y)
            },
            mouseMoveHandler: (evt) => (console.log("mouse moving")),
            mouseUpHandler: (evt) => (console.log("mouse up")),
            doubleClickHandler: (evt) => (console.log("double click!")),
            clickHandler: (evt) => (console.log("click")),
        };
    }
    
    addLine(){
        this.setState({
            mouseUpHandler: this.addLineClickHandler.bind(this)
        });
    }
    
    getCoords(evt){
        var svg = document.getElementById("svg_window");
        var dim = svg.getBoundingClientRect();
        return({
            x: evt.clientX - dim.left,
            y: evt.clientY - dim.top
        });
    }


    addLineClickHandler(evt){
        var coords = this.getCoords(evt);
        if(this.state.clicks.length === 0){
            this.setState({clicks: [coords]});
        }else{
            let children = this.state.children;
            
            children.push(<line x1={this.state.clicks[0].x}
                            y1={this.state.clicks[0].y}
                            y2={coords.y}
                            x2={coords.x}
                            stroke="black"
                            strokeWidth={1}
                            key={this.state.children.length} />);
            this.setState({
                children: children,
                mouseUpHandler: (evt) => (console.log("click")),
                clicks: []
            });

        }
    }

    addPolyLine(){

    }

    addCircle(){

    }

    addLabel(){

    }

    addRect(){

    } 
    
    addPolygon(){

    }

    addWidget(){
        let children = this.state.children;
        let index = this.state.children.length;
        children.push(<BBox 
            x={50} 
            y={50}
            key={index}/>);

        this.setState({children: children});
    }

    render(){
        return(
            <div>
                
                <div className="jumbotron">
                    <div className="container">
                        <h1>New Scada Layout</h1>
                        <p>Start off by inserting a new widget</p>
                    </div>
                </div>
                
                <div>
                    
                    <button type="button" className="btn btn-default btn-lg" onClick={this.addLine.bind(this)}>Add Line</button>
                    <button type="button" className="btn btn-default btn-lg" onClick={this.addPolyLine.bind(this)}>Add PolyLine</button>
                    <button type="button" className="btn btn-default btn-lg" onClick={this.addCircle.bind(this)}>Add Circle</button>
                    <button type="button" className="btn btn-default btn-lg" onClick={this.addRect.bind(this)}>Add Rect</button>
                    <button type="button" className="btn btn-default btn-lg" onClick={this.addWidget.bind(this)}>Add Widget</button>
                    <button type="button" className="btn btn-default btn-lg" onClick={this.addLabel.bind(this)}>Add Label</button>
                </div>
                <div>
                <svg id="svg_window" 
                    viewBox="0 0 800 500" 
                    width={800} 
                    height={500}
                    onClick={this.state.doubleClickHandler.bind(this)}
                    onMouseDown={this.state.mouseDownHandler.bind(this)}
                    onMouseUp={this.state.mouseUpHandler.bind(this)}
                    onDoubleClick={this.state.doubleClickHandler.bind(this)} >
                       {this.state.children.map((child, i) =>
                       (child)
                   )}
                </svg>        
                </div>
            </div>
        );
    }
}

export default App;