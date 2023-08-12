import React from "react";
import styled from "styled-components";

import HighchartsLibrary from "./highcharts-library";

import EventDispatcher from "./event-dispatcher";

let _highchartsHistogramCount = 0;

class HighchartsHistogram extends React.Component {
    constructor(props) {
        super(props);
        ++HighchartsHistogram.highchartsHistogramCount;
        this.state = {
            id:
                "highcharts-histogram-" + HighchartsHistogram.highchartsHistogramCount,
            loaded: false,
            ready: false
        };

        this.drawHistogram = this.drawHistogram.bind(this);
    }
    static get widgetClassName() {
        return "HighchartsHistogram";
    }
    static get highchartsHistogramCount() {
        return _highchartsHistogramCount;
    }
    static set highchartsHistogramCount(v) {
        _highchartsHistogramCount = v;
    }
    initBarsColorScheme(colors) {
        let el = document.getElementById(this.state.id);
        for (let i = 0; el && i < colors.length; i++) {
            el.style.setProperty("--highcharts-color-0-" + i, colors[i]);
        }
    }
    drawHistogram(Highcharts) {
        const {
            barColors,
            title,
            titleColor,
            ytitleColor,
            xLabelsColor,
            yLabelsColor,
            categories,
            seriesName,
            seriesData,
            gridLineWidth,
            gridLineDashStyle,
            gridLineColor
        } = this.props;
        this.initBarsColorScheme(barColors || []);
        try {
            if (!this.state) {
                return;
            }
            new Highcharts.Chart({
                chart: {
                    type: "column",
                    _backgroundColor: "#fff",
                    renderTo: this.state.id,
                    styledMode: true
                },
                title: {
                    text: title,
                    style: {
                        color: titleColor
                    }
                },
                xAxis: {
                    tickWidth: 0,
                    labels: {
                        style: {
                            color: xLabelsColor
                        }
                    },
                    categories: categories
                },
                yAxis: {
                    gridLineWidth: gridLineWidth,
                    gridLineDashStyle: gridLineDashStyle,
                    gridLineColor: gridLineColor,
                    title: {
                        text: "",
                        style: {
                            color: ytitleColor
                        }
                    },
                    labels: {
                        formatter: function() {
                            return Highcharts.numberFormat(this.value, 0, "", ",") + " mm";
                        },
                        style: {
                            color: yLabelsColor
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    formatter: function() {
                        var point = this.points[0].point,
                            cats = point.series.xAxis.categories;

                        var catIndex = point.index,
                            currCat = cats[catIndex];

                        var s = "";

                        this.points.forEach(function(item, index) {
                            s +=
                                '<div className="highcharts-custom-tooltip"><span style="color:' +
                                barColors[catIndex] +
                                ';">●</span> ' +
                                currCat +
                                "</div><br/>" +
                                item.series.name +
                                ": " +
                                item.y +
                                "m";
                        });

                        return s;
                    },
                    shared: true
                },
                plotOptions: {
                    column: {
                        borderRadius: 0,
                        /*pointPadding: -1.3,*/
                        groupPadding: 0.1
                    }
                },
                series: [
                    {
                        name: seriesName,
                        data: seriesData,
                        dataLabels: {
                            enabled: true,
                            y: 0
                        }
                    }
                ]
            });
        } catch (ex) {
            console.warn && console.warn(ex);
        }
        // assumimg the histogram graph is completely loaded at this stage
        this.setState({ loaded: true });
    }

    updateSideMenuCollapsingState(collapsed) {
        var evt = window.document.createEvent("UIEvents");
        evt.initUIEvent("resize", true, false, window, 0);
        setTimeout(() => window.dispatchEvent(evt), 500);
    }

    componentDidMount() {
        this.setState({ ready: true });

        EventDispatcher.subscribe(
            "alifa.sidemenu.collapsed",
            this.updateSideMenuCollapsingState
        );
    }

    componentWillUnmount() {
        EventDispatcher.unsubscribe(
            "alifa.sidemenu.collapsed",
            this.updateSideMenuCollapsingState
        );
    }

    render() {
        return (
            <HighchartsLibrary callback={this.drawHistogram}>
                <HighchartsWidget id={this.state.id}>
                    {!this.state.loaded ? (
                        <div className="highcharts-custom-loader-wrapper">
                            <div className="highcharts-custom-loader">&nbsp;</div>
                        </div>
                    ) : (
                        <div />
                    )}
                </HighchartsWidget>
            </HighchartsLibrary>
        );
    }
}

const HighchartsWidget = styled.div`
    height: 100%;
    .highcharts-color-0:nth-child(1) {
        fill: var(--highcharts-color-0-0, blue);
    }
    .highcharts-color-0:nth-child(2) {
        fill: var(--highcharts-color-0-1, blue);
    }
    .highcharts-color-0:nth-child(3) {
        fill: var(--highcharts-color-0-2, blue);
    }
`;

export default HighchartsHistogram;
