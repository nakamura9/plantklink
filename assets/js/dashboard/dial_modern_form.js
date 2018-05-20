import React, {Component} from 'react';

class DialModernForm extends Component{
    
    
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
                <td><input name="angleExtent"
                           className="form-control" 
                           type="number"
                           onChange={this.props.handleInputChange} /></td>
            </tr>
            <tr>
                <td><label>Label Font Size</label></td>
                <td><input name="labelSize"
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
                <td><label>Arc Thickness</label></td>
                <td><input name="arcThickness"
                           className="form-control" 
                           type="number"
                           onChange={this.props.handleInputChange} /></td>
            </tr>
            <tr>
                <td><label>Arc Color</label></td>
                <td><input name="color" 
                           className="form-control" 
                           type="text"
                           onChange={this.props.handleInputChange} /></td>
            </tr>
            <tr>
                <td><label>Background Color</label></td>
                <td><input name="backgroundColor" 
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

export default DialModernForm;