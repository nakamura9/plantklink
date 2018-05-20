import React, {Component} from 'react';

class LineGraphForm extends Component{
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
                        <td><label>Background Color</label></td>
                        <td><input className="form-control" 
                                    type="text"
                                    name="bgColor"
                                    onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Foreground Color</label></td>
                        <td><input className="form-control" 
                                    type="text"
                                    name="fgColor"
                                    onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Shaded</label></td>
                        <td><input type="checkbox"
                                    name="shaded" 
                                    className="form-control"
                                    onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>X Range - min</label></td>
                        <td><input className="form-control" 
                                   type="number"
                                   name="xmin"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>X Range -max</label></td>
                        <td><input className="form-control" 
                                    type="number"
                                    name="xmax"
                                    onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Y Range - min</label></td>
                        <td><input className="form-control" 
                                    type="number"
                                    name="ymin"
                                    onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Y Range -max</label></td>
                        <td><input className="form-control" 
                                    type="number"
                                    name="ymax"
                                    onChange={this.props.handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Number of Intervals</label></td>
                        <td><input className="form-control" 
                                   type="number"
                                   name="intervals"
                                   onChange={this.props.handleInputChange} /></td>
                    </tr>
                </tbody>
            </table>
                
            </div>
        );
    }
}

export default LineGraphForm;