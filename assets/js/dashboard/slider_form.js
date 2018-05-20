import React, {Component} from 'react';

class SliderForm extends Component{
    
    
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
                        <td><label>Orientation</label></td>
                        <td><select name="orientation" 
                                    className="form-control"
                                    onChange={this.props.handleInputChange}>
                            <option value="vertical">Vertical</option>
                            <option value="horizontal">Horizontal</option>    
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Round slider</label></td>
                        <td><input className="form-control" 
                                   type="checkbox"
                                   name="round"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Width</label></td>
                        <td><input name="width"
                                   className="form-control" 
                                   type="number"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Height</label></td>
                        <td><input name='height'
                                   className="form-control" 
                                   type="number"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Maximum Value</label></td>
                        <td><input name="max"
                                   className="form-control" 
                                   type="number"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Minimum Value</label></td>
                        <td><input name="min"
                                   className="form-control" 
                                   type="number"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                </tbody>
            </table>
                
            </div>
        );
    }
}

export default SliderForm;