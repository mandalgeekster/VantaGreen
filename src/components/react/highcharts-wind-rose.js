// import React from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";

// import HighchartsLibrary from "./highcharts-library";
// import EventDispatcher from "./event-dispatcher";

// let _highchartsWindRoseCount = 0;

// class HighchartsWindRose extends React.Component {
//     constructor(props) {
//         super(props);
//         ++HighchartsWindRose.highchartsWindRoseCount;
//         this.state = {
//             id: "highcharts-windrose-" + HighchartsWindRose.highchartsWindRoseCount,
//             loaded: false,
//             ready: false
//         };

//         this.drawWindRose = this.drawWindRose.bind(this);
//     }
//     static get widgetClassName() {
//         return "HighchartsWindRose";
//     }
//     static get highchartsWindRoseCount() {
//         return _highchartsWindRoseCount;
//     }
//     static set highchartsWindRoseCount(v) {
//         _highchartsWindRoseCount = v;
//     }
//     initBarsColorScheme(colors) {
//         let el = document.getElementById(this.state.id);
//         for (let i = 0; el && i < colors.length; i++) {
//             el.style.setProperty("--highcharts-color-0-" + i, colors[i]);
//         }
//     }
//     drawWindRose(Highcharts) {
//         const {
//             title,
//             titleColor,
//             barColors,
//             ytitleColor,
//             xLabelsColor,
//             yLabelsColor,
//             categories,
//             series,
//             seriesName,
//             seriesData,
//             gridLineWidth,
//             gridLineDashStyle,
//             gridLineColor
//         } = this.props;
//         //this.initBarsColorScheme(barColors || []);
//         try {
//             if (!this.state.ready) {
//                 return;
//             }
//             new Highcharts.Chart({
//                 chart: {
//                     renderTo: this.state.id,
//                     reflow: true,
//                     polar: true,
//                     type: "column",
//                     events: {
//                         resize: function() {
//                             var chart = this;
//                             //let el = chart.clipRect.element;
//                             //let w = el.width.baseVal.value;
//                             //let h = el.height.baseVal.value;
//                             //chart.setSize(w, h, false);
//                         },
//                         render: function() {
//                             var chart = this,
//                                 middleElement = chart.middleElement;

//                             if (middleElement) {
//                                 middleElement.destroy();
//                             }

//                             chart.middleElement = chart.renderer
//                                 .circle(
//                                     chart.plotSizeX / 2 + chart.plotLeft,
//                                     chart.plotHeight / 2 + chart.plotTop,
//                                     Math.floor(chart.plotHeight * 0.05)
//                                 )
//                                 .attr({
//                                     zIndex: 3,
//                                     fill: "#ffffff"
//                                 })
//                                 .add();
//                         }
//                     }
//                 },

//                 title: {
//                     text: "Wind rose"
//                 },

//                 subtitle: {
//                     text: ""
//                 },

//                 pane: {
//                     size: "85%"
//                 },

//                 legend: {
//                     reversed: true,
//                     align: "right",
//                     verticalAlign: "top",
//                     y: 100,
//                     layout: "vertical"
//                 },

//                 xAxis: {
//                     tickmarkPlacement: "on",
//                     categories: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
//                 },

//                 yAxis: {
//                     min: 0,
//                     endOnTick: false,
//                     showLastLabel: true,
//                     title: {
//                         text: "Freq. (%)"
//                     },
//                     labels: {
//                         formatter: function() {
//                             return this.value + "%";
//                         }
//                     }
//                 },

//                 tooltip: {
//                     valueSuffix: "%",
//                     followPointer: true
//                 },

//                 plotOptions: {
//                     series: {
//                         innerSize: "20%",
//                         stacking: "normal",
//                         shadow: false,
//                         groupPadding: 0,
//                         pointPlacement: "on"
//                     }
//                 },
//                 series: series
//             });
//         } catch (ex) {
//             console.warn && console.warn(ex);
//         }
//         // assumimg the histogram graph is completely loaded at this stage
//         this.setState({ loaded: true });
//     }

//     updateSideMenuCollapsingState(collapsed) {
//         var evt = window.document.createEvent("UIEvents");
//         evt.initUIEvent("resize", true, false, window, 0);
//         setTimeout(() => window.dispatchEvent(evt), 500);
//     }

//     componentDidMount() {
//         this.setState({ ready: true });

//         EventDispatcher.subscribe(
//             "alifa.sidemenu.collapsed",
//             this.updateSideMenuCollapsingState
//         );
//     }

//     componentWillUnmount() {
//         EventDispatcher.unsubscribe(
//             "alifa.sidemenu.collapsed",
//             this.updateSideMenuCollapsingState
//         );
//     }

//     render() {
//         return (
//             <HighchartsLibrary callback={this.drawWindRose}>
//                 <HighchartsWidget id={this.state.id}>
//                     {!this.state.loaded ? (
//                         <div className="highcharts-custom-loader-wrapper">
//                             <div className="highcharts-custom-loader">&nbsp;</div>
//                         </div>
//                     ) : (
//                         <div />
//                     )}
//                 </HighchartsWidget>
//             </HighchartsLibrary>
//         );
//     }
// }

// const HighchartsWidget = styled.div`
//     height: 100%;
//     .highcharts-color-0:nth-child(1) {
//         fill: var(--highcharts-color-0-0, blue);
//     }
//     .highcharts-color-0:nth-child(2) {
//         fill: var(--highcharts-color-0-1, blue);
//     }
//     .highcharts-color-0:nth-child(3) {
//         fill: var(--highcharts-color-0-2, blue);
//     }
// `;

// export default HighchartsWindRose;
