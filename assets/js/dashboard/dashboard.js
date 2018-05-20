import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {RowForm, WidgetForm, WidgetCard} from './dashforms';
import {Button} from 'react-bootstrap';
//REMEMBER TO SPECIFY WIDGET TYPE!!!

class GridDesigner extends Component{
    constructor(props){
        super(props);
        /**
         * The GDaddy of the designer app.
         * the rows variable defines all the properties needed
         * to build a dashboard
         * the name key is used to name the dashboard
         * canCreate is used to disable the 'Create Dashboard' button
         * the rowShow is used to toggle the row form modal view 
         */
        this.state = {
            rowShow: false,
            rows: [],
            canCreate: false,
            name: "",
        };
    }
    populateWidget(row, col, data){
        console.log(data);
        var newRows = this.state.rows;
        newRows[row].cols[col].widget = data;
        newRows[row].cols[col].hasWidget = true;
        console.log(newRows);
        this.setState({rows: newRows});
    }

    showRow(){
        //toggles the row form modal
        this.setState({rowShow: !(this.state.rowShow)});
    }

    handleMeta(event){
        /**
         * sets the name for the dashboard 
         * and determines where enough data has been proided to enable the 
         * 'create dashboard' button namely the existance of at least one row
         * and input value != "".
         */
        this.setState({
            name: event.target.value,
            canCreate: (this.state.rows.length > 0 && event.target.value !== "")
        });
    }

    handleCreate(){
        //sends the entered data to the server
        console.log(this.state);
        $.ajax({
            url: "/dashboard/create",
            method: "POST",
            data: {data: JSON.stringify(this.state),
                csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken'").val()},
            async: false,
            success: function(){
                window.location.replace("/dashboard/list");
            }
        });
    }

    addRow(childState){
        /**
         * uses data 
         */
        var cols = [];
        var i;
        var val = childState.cols.length;
        for(i=0; i< val; i++){
            var col = {
                id: i,
                width: childState.cols[i].width,
                hasWidget: false,
                widget: {}
            };
            cols.push(col);
        }
        var row_id = this.state.rows.length
        var newRows = this.state.rows;
        newRows.push({
            id: row_id,
            cols: cols
        });
        console.log(this.state.rows);
        this.setState({
            rows: newRows
        });    
    }

    render(){
        return(
            <div>
                <DashGrid contents={this.state.rows}
                          populateWidget={this.populateWidget.bind(this)} />    
                <div className="well">
                    <center>
                        <button onClick={this.showRow.bind(this)} 
                                className="btn btn-primary btn-large" >Add Row</button>
                    </center>
                </div>
                <DashboardMetaForm condition={this.state.canCreate}
                                    handler={this.handleMeta.bind(this)}
                                handleCreate={this.handleCreate.bind(this)}/>    
                <RowForm toggleVar={this.state.rowShow} 
                        modalCloser={this.showRow.bind(this)} 
                        handleSubmit={this.addRow.bind(this)}/>
                
            </div>
        );
    }
}

class DashboardMetaForm extends Component{
    render(){
        return(
            <div className="panel panel-default ">
                <div className="panel-body pull-right">
                <label htmlFor="dashboard-name">Dashboard Name:</label>
                <input type="text" 
                        name='dashboard-name' 
                        className="form-control"
                        onChange={this.props.handler} />
                <hr />
                <button disabled={!(this.props.condition)} 
                        className="btn btn-primary pull-right"
                        onClick={this.props.handleCreate}>Create Dashboard</button>
                </div>
            </div>
        );
    }
}

class DashGrid extends Component{
    constructor(props){
        super(props);
        this.state = {
            contents: props.contents
        }
    }
    render(){
        return(
            <div className="container">
            {this.state.contents.map((row, i) => (
                <DashRow populateWidget={this.props.populateWidget} 
                        key={i} 
                        row={i}
                        contents={row.cols} />
            ))}
            </div>
        );
    }
}

class DashRow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row">
                {this.props.contents.map((col, i) => (
                    <DashCol populateWidget={this.props.populateWidget} 
                             key={i} row={this.props.row} col={i} width={col.width} />
                ))}
            </div>
        )
    }
}

class DashCol extends Component{
    constructor(props){
        super(props);
        this.state = {
            widgetFormShow: false,
            widget: false,
            details: {name: ""}
        }
    }
    initializeWidget(){
        this.setState({widgetFormShow:true});
    }

    addWidget(formData){
        this.setState({
            widgetFormShow: !this.state.widgetFormShow,
            widget:true,
            details: formData
        });
        this.props.populateWidget(this.props.row, 
            this.props.col, formData);
    }

    removeWidget(){
        this.setState({
            widget:false,
            details:{name: ""}
        });

    }

    render(){
        return(
            <div className={"well col-sm-" + this.props.width } >
                {this.state.widget ? 
                    <WidgetCard 
                        remove={this.removeWidget.bind(this)}
                        name={this.state.details.name}/> : 
                        <center>
                            <Button onClick={this.initializeWidget.bind(this)} 
                                    className="btn-primary">Add Widget</Button>
                        </center>}
                
                <WidgetForm submit={this.addWidget.bind(this)} toggleVar={this.state.widgetFormShow}/>    
            </div>
        )
    }
}

export default GridDesigner;