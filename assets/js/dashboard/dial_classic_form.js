import React, {Component} from 'react';

class DialClassicForm extends Component{
    render(){
        return(
            <div>
            <table className="table">
                <tbody>
                    <tr>
                        <td><label>Name</label></td>
                        <td><input name="name" 
                            className="form-control" 
                            type="text" 
                            onChange={this.props.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td><label>Width</label></td>
                        <td><input className="form-control" 
                            type="number"
                            name="width"
                            onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Height</label></td>
                        <td><input className="form-control" 
                            type="number"
                            name="height"
                            onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Maximum Angular Value</label></td>
                        <td><input name="scaleAngle"
                                   className="form-control" 
                                   type="number"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Lower Range Limit</label></td>
                        <td><input name="rangeLower"
                                   className="form-control" 
                                   type="number"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Upper Range Limit</label></td>
                        <td><input name="rangeUpper"
                                   className="form-control" 
                                   type="number"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Number of scale divisions</label></td>
                        <td><input name="scaleDivisions"
                                   className="form-control" 
                                   type="number"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Scale Color</label></td>
                        <td><input name="scaleColor" 
                                   className="form-control" 
                                   type="text"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Background Color</label></td>
                        <td><input name="bgColor" 
                                   className="form-control" 
                                   type="text"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                </tbody>
            </table>
                
            </div>
        );
    }
}

export default DialClassicForm;