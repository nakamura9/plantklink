import React, {Component} from 'react';

import * as d3 from 'd3';

import ReactDOM from 'react-dom';

class XAxis extends React.Component{
    componentDidMount(){
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.xaxis);
    }

    render(){
        var xtranslate = "translate(0,"+ this.props.height +")";
        return(
            <g className="xaxis" transform={xtranslate}></g>
        )
    }
}

class YAxis extends React.Component{
    componentDidMount(){
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.yaxis);
    }

    render(){
        var ytranslate = "translate(" + this.props.xMargin + ", 0)";
        return(
            <g className="yaxis" transform={ytranslate}></g>
        );
    }
}

export {YAxis, XAxis};