import React, {Component} from 'react';
//do better!
import AnimatedLineChart from '../animatedlinegraph';
import {MultipleAnimatedBar} from '../bar';
import DialWidget from '../dial';
import ArcDial from '../arcdial';
import { VerticalSliderWidget, SliderWidget } from '../slider';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state= {rows: []};
    }
    componentDidMount(){
        var id = window.location.href.split('/')[5];
        
        $.ajax({
            url: '/dashboard/load/'+id,
            method: "GET",
            data: {}}).then(res =>{
                this.setState({rows: res.rows})
            });
        
    }
    render(){
        return(<div className="container">
                {this.state.rows.map((row) => (
                    <Row key={row.id} contents={row.cols} />
                ))}            
            </div>);
    }
}

class Row extends Component{
    render(){
        return(
            <div className="row well" >
                {this.props.contents.map((col, i) => (
                    <Col key={i} width={col.width} data={col.widget} widgetType={col.widget.widgetType}/>
                ))}
            </div>
        );
    }
}

class Col extends Component{
    constructor(props){
        super(props);
        this.state = {
            widget: <div></div>
        };
    }

    componentDidMount(){
        switch(this.props.widgetType){
            case "graph-line":
                this.setState({widget: <AnimatedLineChart {...this.props.data} />});
                break;
            case "graph-bar":
                this.setState({widget: <MultipleAnimatedBar {...this.props.data} />});
                break;
            case "dial-classic":
                this.setState({widget: <DialWidget {...this.props.data} />});
                break;
            case "dial-modern":
                this.setState({widget: <ArcDial {...this.props.data} />});
                break;
            case "slider":
                console.log(this.props.data);
                (this.props.data.orientation === "vertical")
                ? this.setState({
                    widget: <VerticalSliderWidget {...this.props.data} />})
                : this.setState({
                    widget: <SliderWidget {...this.props.data} />});
                break;
            default:
                this.setState({widget: <div></div>});
                break;
        }
             
    }
    
    render(){
        return(
            <div className={"col-sm-" + this.props.width}>
                <center>
                    {this.state.widget}
                </center>
            </div>
        );
    }
}
export default Dashboard;