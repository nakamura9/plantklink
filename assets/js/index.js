import React, {Component} from 'react';

import ReactDOM from 'react-dom';

import * as d3 from 'd3';

import {AnimatedBar, MultipleAnimatedBar} from './bar';

import DialWidget from './dial';

import Indicator from './indicator';

import Valve from './valve';

import AnimatedLineChart from './animatedlinegraph';

import {VerticalSliderWidget, SliderWidget} from "./slider";

import KnobWidget from "./knob";

var vslider = document.getElementById("react-slider2");

if(vslider){
    ReactDOM.render(<VerticalSliderWidget width={40} height={200} min={0} max={100} round={true} />, vslider);
}

var dial = document.getElementById("react-dial");
if(dial){
    ReactDOM.render(<DialWidget width={300} height={300} scaleAngle={90} rangeLower={0} rangeUpper={10} scaleDivisions={5} />, dial);
}

var uniBar = document.getElementById("react-root");
if(uniBar){
    ReactDOM.render(<AnimatedBar height={200} width={50} dataMin={0} dataMax={10}/>, uniBar);
}

var indicator = document.getElementById("react-indicator");
if(indicator){
    ReactDOM.render(<Indicator width={100}/>, indicator);
}

var slider = document.getElementById("react-slider")
if(slider){
    ReactDOM.render(<SliderWidget width={300} height={75} min={0} max={10} round={true} />, slider);
}

var knob = document.getElementById("knob");
if(knob){
    ReactDOM.render(<KnobWidget dia={150} start={0} end={90} min={0} max={10} />, knob);
}

var valve = document.getElementById("react-valve");
if(valve){
    ReactDOM.render(<Valve width={200} height={100} minAngle={30} maxAngle={180} minVal={0} maxVal={10}/>, valve);
}

var line = document.getElementById("reactive");
if(line){
    ReactDOM.render(<AnimatedLineChart shaded={true} nIntervals={10} xmin={0} xmax={10} ymax={12} ymin={0} width={300} height={150} />, line);
}

var aniLine = document.getElementById("unshaded");
if(aniLine){
    ReactDOM.render(<AnimatedLineChart shaded={false} nIntervals={10} xmin={0} xmax={10} ymax={12} ymin={0} width={300} height={150} />, aniLine);
}

var aniBar = document.getElementById("bar-animated");
if(aniBar){
    ReactDOM.render(<MultipleAnimatedBar margin={20} nBars={10} xmin={0} xmax={10} ymax={12} ymin={0} width={300} height={150} />, aniBar);
}