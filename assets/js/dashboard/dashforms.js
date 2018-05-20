import {Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Button} from 'react-bootstrap';
import $ from 'jquery';
import React, {Component} from 'react';
import LineGraphForm from './line_graph_form';
import BarGraphForm from './bar_graph_form';
import DialClassicForm from './dial_classic_form';
import DialModernForm from './dial_modern_form';
import SliderForm from './slider_form';


class RowForm extends Component{
    constructor(props){
        super(props);
        /**
         * Component that adds rows to a dashboard.
         * Based on a modal view
         * Includes a form for specifying the number of rows and the 
         * ratio between row elements
         * col object
         * width property
         */
        this.state = {
            cols:[],
            customRatio: false
        }
    }
    handleSubmit(){
        /**
         * submits a row to the grid designer component,
         * clears its own state and close its modal view
         */
        this.props.handleSubmit(this.state);
        this.setState({cols : [],
                    customRatio : false});
        this.props.modalCloser();
    }

    handleRatioCheck(event){
        // causes the state to reveal the ratio inputs
        this.setState({customRatio: !this.state.customRatio});
    }

    handleSelect(event){
        /**
         * Called when select widget for the number of columns
         * is changed. 
         * adds columns to the row and defaults to column widths 
         * of equal value.
         */
        var colCount = event.target.value;
        var cols = [];
        var defaultWidth = 12 / colCount;
        var i=0;
        for (i=0; i < colCount; i++){
            cols.push({width: defaultWidth});
        }
        
        this.setState({
            cols: cols
        });
    }

    handleRatios(event){
        /**
         * updates individual column width properties whenever
         * any of the ratio control fields are updated
         */
        var ratioIndex = parseInt(event.target.name);
        var newCols = this.state.cols;
        newCols[ratioIndex] = {width: parseInt(event.target.value)};
        this.setState({
            cols: newCols
        });
        console.log(this.state.cols);

    }
    render(){
        return(
            <Modal show={this.props.toggleVar} >
                <ModalHeader closeButton>
                    <ModalTitle>Add Row</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form>
                    <label>Number of Columns</label>
                    <select onChange={this.handleSelect.bind(this)} id="rowCount" className="form-control" >
                        <option value={0}>{0}</option>    
                        <option value={1}>{1}</option>
                        <option value={2}>{2}</option>
                        <option value={3}>{3}</option>
                        <option value={4}>{4}</option>
                        <option value={6}>{6}</option>
                    </select>
                    <hr />
                    <label>Custom Ratios:</label>
                    <input 
                        type="checkbox" 
                        className="form-control"
                        onChange={this.handleRatioCheck.bind(this)} />
                    <div className={this.state.customRatio ? "show" : "hidden"}>
                    <h5><label>Ratios(must add up to 12)</label></h5>
                    <table>
                        <tbody>
                            <tr>
                                {this.state.cols.map((item, i) =>(
                                    <td key={i}>
                                        <input className="form-control"
                                                type="number"
                                                name={i}
                                                value={item.width}
                                                onChange={this.handleRatios.bind(this)}/>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    
                    <Button 
                        onClick={this.handleSubmit.bind(this)}>Create</Button>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}

class WidgetForm extends Component{
    constructor(props){
        /**
         * A modal based component that forms the container for all 
         * widget forms
         * one state variable, the widgetForm which defaults to an
         * empty div
         * the state is expanded by individual widget forms
         */
        super(props);
        this.state = {
            widgetForm: <div></div>
        };
        
    }
    handleSubmit(){
        /**
         * submits the now expanded state to the parent component which is the 
         * column it belongs to.
         * removes the widgetForm key before doing so
         */
        var data = this.state;
        delete data.widgetForm;
        this.props.submit(data);
    }

    handleInputChange(event){
        /**
         * generalized method for registering the values supplied to inputs in 
         * any for with the state. creates name variables and populates them 
         * with the value of the unput at the event.
         */
        const target = event.target;
        const value = (target.type === 'checkbox') 
                        ? target.checked 
                        : (target.type === "number")
                        ? parseInt(target.value)
                        : target.value;
        const name = target.name;
        
        //powerful!
        this.setState({
            [name]: value
        });
    }

    handleSelect(val){
        /**
         * Concerned with only the select widget at the top of 
         * the component. Uses a switch statement to represent the 
         * value of the input by means of a corresponding widget
         * Each widget is initialized with a handler prop that updates the 
         * state whenever an event is fired.
         */
        switch(val){
            case "graph-line":
                this.setState({widgetType: val,
                    widgetForm: <LineGraphForm 
                        handleInputChange={this.handleInputChange.bind(this)}/>})
                break;
                case "graph-bar":
                this.setState({widgetType: val,
                    widgetForm: <BarGraphForm 
                        handleInputChange={this.handleInputChange.bind(this)}/>})
                break;
                case "slider":
                this.setState({widgetType: val,
                    widgetForm: <SliderForm 
                        handleInputChange={this.handleInputChange.bind(this)}/>})
                break;
                case "dial-classic":
                this.setState({widgetType: val,
                    widgetForm: <DialClassicForm 
                        handleInputChange={this.handleInputChange.bind(this)}/>})
                break;
                case "dial-modern":
                this.setState({widgetType: val,
                    widgetForm: <DialModernForm 
                        handleInputChange={this.handleInputChange.bind(this)}/>})
                break;
            default:
                this.setState({widgetType: val,
                    widgetForm: <div></div>})
                break;
        }
    }

    render(){
        return(
            <Modal show={this.props.toggleVar} >
                <ModalHeader closeButton>
                    <ModalTitle>Configure Widget</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form>
                    <table>
                    <tbody>
                    <tr>
                        <td><label>Widget Type</label></td>
                        <td><select onChange={event => this.handleSelect(event.target.value)} ref="widgetType" className="form-control" >
                        <option value="">-------</option>
                        <option value="graph-line">Graph-Line</option>
                        <option value="graph-bar">Graph-Bar</option>
                        <option value="dial-classic">Dial-Classic</option>
                        <option value="dial-modern">Dial-Modern</option>
                        <option value="slider">Slider</option>
                        </select></td>
                    </tr>
                    </tbody>
                    </table>
                    {this.state.widgetForm}
                    
                    <Button onClick={this.handleSubmit.bind(this)}>Create</Button>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}


class WidgetCard extends Component{
    /**
     * simplified representation of a widget when designing a dashboard
     */
    render(){
        return(
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Widget: {this.props.name}</h3>
                </div>
                <div className="panel-body">
                    <center><div><span className="glyphicon glyphicon-cog" style={{fontSize: 72}}></span></div>
                    <button className="btn btn-danger" onClick={this.props.remove}>Remove Widget</button></center>
                </div>
            </div>
        );
    }
}

export {RowForm, WidgetForm, WidgetCard};