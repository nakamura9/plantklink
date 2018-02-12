import React, {Component} from 'react';

import ReactDOM from 'react-dom';

import * as d3 from 'd3';

import AnimatedBar from './bar';

import DialWidget from './dial';

import Indicator from './indicator';

import Valve from './valve';

import AnimatedLineChart from './animatedlinegraph';

ReactDOM.render(<DialWidget width={300} height={300} scaleAngle={270} rangeLower={0} rangeUpper={10} scaleDivisions={5} />, document.getElementById("react-dial"));
ReactDOM.render(<AnimatedBar height={200} width={50} dataMin={0} dataMax={10}/>, document.getElementById("react-root"));

ReactDOM.render(<Indicator width={100}/>, document.getElementById("react-indicator"));


ReactDOM.render(<Valve />, document.getElementById("react-valve"));

ReactDOM.render(<AnimatedLineChart shaded={true} nIntervals={10} xmin={0} xmax={10} ymax={12} ymin={0} width={300} height={150} />, document.getElementById("reactive"));

ReactDOM.render(<AnimatedLineChart shaded={false} nIntervals={10} xmin={0} xmax={10} ymax={12} ymin={0} width={300} height={150} />, document.getElementById("unshaded"));