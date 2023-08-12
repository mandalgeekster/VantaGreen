import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import HighchartsLibrary from "./highcharts-library";

import EventDispatcher from "./event-dispatcher";

let _highchartsGaugeCount = 0;

class HighchartsGauge extends React.Component {
    constructor(props) {
        super(props);
        ++HighchartsGauge.highchartsGaugeCount;
        this.state = {
            id: "highcharts-gauge-" + HighchartsGauge.highchartsGaugeCount,
            loaded: false,
            ready: false
        };

        this.drawGauge = this.drawGauge.bind(this);
    }
    static get widgetClassName() {
        return "HighchartsGauge";
    }
    static get highchartsGaugeCount() {
        return _highchartsGaugeCount;
    }
    static set highchartsGaugeCount(v) {
        _highchartsGaugeCount = v;
    }
    drawGauge(Highcharts) {
        const {
            title,
            yTitle,
            initialData,
            valueSuffix,
            tickAmount,
            yStop1,
            yStop2,
            yStop3,
            yMin,
            yMax,
            onChange
            //titleColor,
            //ytitleColor,
            //xLabelsColor,
            //yLabelsColor,
            //gridLineWidth,
            //gridLineDashStyle,
            //gridLineColor,
        } = this.props;
        try {
            if (!this.state.ready) {
                return;
            }
            let gaugeChart = new Highcharts.Chart({
                chart: {
                    type: "solidgauge",
                    renderTo: this.state.id
                },

                title: title,

                pane: {
                    center: ["50%", "75%"],
                    size: "100%",
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
                        innerRadius: "60%",
                        outerRadius: "100%",
                        shape: "arc"
                    }
                },

                exporting: {
                    enabled: false
                },

                tooltip: {
                    enabled: false
                },

                // the value axis
                yAxis: {
                    min: yMin,
                    max: yMax,
                    title: {
                        text: yTitle,
                        y: -90
                    },
                    stops: [
                        Array.isArray(yStop1) ? yStop1 : [0.1, "#55BF3B"],
                        Array.isArray(yStop2) ? yStop2 : [0.5, "#DDDF0D"],
                        Array.isArray(yStop3) ? yStop3 : [0.9, "#DF5353"]
                    ],
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickInterval: null,
                    tickAmount: tickAmount || 2,
                    labels: {
                        y: 16
                    }
                },

                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                },

                credits: {
                    enabled: false
                },

                series: [
                    {
                        name: "Speed",
                        data: [initialData],
                        dataLabels: {
                            format:
                                '<div class="highcharts-custom-gauge-label-wrapper">' +
                                '<span class="highcharts-custom-gauge-label-value">{y}</span><br/>' +
                                '<span class="highcharts-custom-gauge-label-suffix">' +
                                (valueSuffix || "%").replace(/^\s+|\s+$/g, "") +
                                "</span>" +
                                "</div>"
                        },
                        tooltip: {
                            valueSuffix: " " + (valueSuffix || "%").replace(/^\s+|\s+$/g, "")
                        }
                    }
                ]
            });
            if (typeof onChange === "function" && gaugeChart) {
                let point = gaugeChart.series[0].points[0];

                const PointWrapper = point => {
                    this.point = point;
                };

                PointWrapper.prototype.update = value => {
                    if (console && console.warn) {
                        if (value < yMin || value > yMax) {
                            console.warn(
                                "Gauge point update function received an outbound value: " +
                                    value
                            );
                        }
                    }
                    return this.point.update(value);
                };

                let pointWrapper = new PointWrapper(point);

                Object.defineProperty(pointWrapper, "y", {
                    get: () => {
                        return point.y;
                    },
                    set: value => {
                        point.y = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                onChange(pointWrapper);
            }
        } catch (ex) {
            console.warn && console.warn(ex);
        }
        // assumimg the gauge graph is completely loaded at this stage
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
            <HighchartsLibrary callback={this.drawGauge}>
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
        fill: var(--highcharts-color-0-0, #6ECB63);
    }
    .highcharts-color-0:nth-child(2) {
        fill: var(--highcharts-color-0-1, #6ECB63);
    }
    .highcharts-color-0:nth-child(3) {
        fill: var(--highcharts-color-0-2, #6ECB63);
    }
`;

HighchartsGauge.propTypes = {
    title: PropTypes.string,
    yTitle: PropTypes.string,
    initialData: PropTypes.number.isRequired,
    valueSuffix: PropTypes.string,
    tickAmount: PropTypes.number,
    yStop1: PropTypes.array,
    yStop2: PropTypes.array,
    yStop3: PropTypes.array,
    yMin: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
    onChange: PropTypes.func
};

export default HighchartsGauge;
