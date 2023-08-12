import React from "react";
import styled from "styled-components";

import HighchartsLibrary from "./highcharts-library";
import EventDispatcher from "./event-dispatcher";

let _highchartsWindirCount = 0;

class HighchartsWindDirection extends React.Component {
    constructor(props) {
        super(props);
        ++HighchartsWindDirection.highchartsGaugeCount;
        this.state = {
            id: "highcharts-windir-" + HighchartsWindDirection.highchartsWindirCount,
            loaded: false,
            ready: false,
            dataValue: this.props.dataValue
        };

        this.drawWindir = this.drawWindir.bind(this);
    }
    static get widgetClassName() {
        return "HighchartsWindDirection";
    }
    static get highchartsWindirCount() {
        return _highchartsWindirCount;
    }
    static set highchartsWindirCount(v) {
        _highchartsWindirCount = v;
    }
    static addGaugeSeriesStyle(css) {
        let element = document.createElement("style");
        element.setAttribute("type", "text/css");

        if ("textContent" in element) {
            element.textContent = css;
        } else {
            element.styleSheet.cssText = css;
        }

        document.getElementsByTagName("head")[0].appendChild(element);
    }
    static polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        let _angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
            x: centerX + radius * Math.cos(_angleInRadians),
            y: centerY + radius * Math.sin(_angleInRadians)
        };
    }
    static buildFlag(dialOpts) {
        return dialOpts.endAngle - dialOpts.startAngle <= 180 ? "0" : "1";
    }
    static buildPath(start, end, dialOpts, flag) {
        return [
            "M",
            start.x,
            start.y,
            "A",
            dialOpts.radius,
            dialOpts.radius,
            0,
            flag,
            0,
            end.x,
            end.y,
            "L",
            dialOpts.cx,
            dialOpts.cy,
            "Z"
        ].join(" ");
    }

    drawWindir(Highcharts) {
        const {
            // title,
            // yTitle,
            // initialData,
            // valueSuffix,
            // tickAmount,
            dataValue,
            yMin,
            yMax,
            onChange
        } = this.props;

        try {
            if (!this.state.ready) {
                return;
            }
            let windirChart = new Highcharts.Chart({
                chart: {
                    renderTo: this.state.id,
                    type: "gauge",
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    events: {
                        resize: function() {
                            let chart = this,
                                largeArcFlag,
                                start,
                                end,
                                d,
                                dialOpts = {
                                    cx: 0,
                                    cy: 0,
                                    radius: 0,
                                    startAngle: 0,
                                    endAngle: 0
                                };

                            let pane = chart.seriesGroup.element.parentNode.getElementsByClassName(
                                "highcharts-pane-group"
                            );

                            let dial = chart.seriesGroup.element.getElementsByClassName(
                                "highcharts-dial"
                            );

                            let paneRect = pane[0].getBoundingClientRect();

                            dialOpts.radius = Math.floor(paneRect.height / 2);

                            dialOpts.startAngle = 90 - 11.25;
                            dialOpts.endAngle = 90 + 11.25;

                            start = HighchartsWindDirection.polarToCartesian(
                                dialOpts.cx,
                                dialOpts.cy,
                                dialOpts.radius,
                                dialOpts.endAngle
                            );

                            end = HighchartsWindDirection.polarToCartesian(
                                dialOpts.cx,
                                dialOpts.cy,
                                dialOpts.radius,
                                dialOpts.startAngle
                            );

                            largeArcFlag = HighchartsWindDirection.buildFlag(dialOpts);

                            d = HighchartsWindDirection.buildPath(
                                start,
                                end,
                                dialOpts,
                                largeArcFlag
                            );

                            dial[0].attributes["d"].value = d;
                        },
                        load: function() {
                            let chart = this,
                                largeArcFlag,
                                start,
                                end,
                                d,
                                dialOpts = {
                                    cx: 0,
                                    cy: 0,
                                    radius: 0,
                                    startAngle: 0,
                                    endAngle: 0
                                };

                            //http://snowfence.umn.edu/Components/winddirectionanddegrees.htm

                            //https://codepen.io/massimo-cassandro/pen/rWpEEV
                            //https://codepen.io/smlsvnssn/pen/FolaA

                            let pane = chart.seriesGroup.element.parentNode.getElementsByClassName(
                                "highcharts-pane-group"
                            );

                            let dial = chart.seriesGroup.element.getElementsByClassName(
                                "highcharts-dial"
                            );

                            let paneRect = pane[0].getBoundingClientRect();

                            dialOpts.radius = Math.floor(paneRect.height / 2);

                            dialOpts.startAngle = 90 - 11.25;
                            dialOpts.endAngle = 90 + 11.25;

                            start = HighchartsWindDirection.polarToCartesian(
                                dialOpts.cx,
                                dialOpts.cy,
                                dialOpts.radius,
                                dialOpts.endAngle
                            );

                            end = HighchartsWindDirection.polarToCartesian(
                                dialOpts.cx,
                                dialOpts.cy,
                                dialOpts.radius,
                                dialOpts.startAngle
                            );

                            largeArcFlag = HighchartsWindDirection.buildFlag(dialOpts);

                            d = HighchartsWindDirection.buildPath(
                                start,
                                end,
                                dialOpts,
                                largeArcFlag
                            );

                            dial[0].attributes["d"].value = d;

                            let yAxis = chart.yAxis[0],
                                minorTick,
                                key;

                            for (key in yAxis.minorTicks) {
                                minorTick = yAxis.minorTicks[key];
                                if (
                                    minorTick.pos < 40 ||
                                    (minorTick.pos > 50 && minorTick.pos < 90) ||
                                    (minorTick.pos > 90 && minorTick.pos < 130) ||
                                    (minorTick.pos > 140 && minorTick.pos < 180) ||
                                    (minorTick.pos > 180 && minorTick.pos < 220) ||
                                    (minorTick.pos > 230 && minorTick.pos < 270) ||
                                    (minorTick.pos > 270 && minorTick.pos < 310) ||
                                    (minorTick.pos > 320 && minorTick.pos < 360)
                                ) {
                                    minorTick.mark.attr({ stroke: "transparen" });
                                } else {
                                    minorTick.mark.attr({ stroke: "#ccc" });
                                }
                            }
                        }
                    }
                },

                title: {
                    text: null
                },

                pane: {
                    center: ["50%", "50%"],
                    size: "60%",
                    startAngle: 0,
                    endAngle: 360,
                    background: [
                        {
                            _addRoundCorners: true,
                            borderWidth: 1,
                            backgroundColor: "#fff"
                        }
                    ]
                },

                // the value axis
                yAxis: {
                    min: 0,
                    max: 360,
                    tickWidth: 1,
                    tickPosition: "outside",
                    tickLength: 20,
                    tickColor: "#999",
                    tickInterval: 45,
                    labels: {
                        distance: 10,
                        x: 0,
                        y: 0,

                        rotation: "auto",
                        formatter: function() {
                            if (this.value === 360) {
                                return "N";
                            } else if (this.value === 45) {
                                return "NE";
                            } else if (this.value === 90) {
                                return "E";
                            } else if (this.value === 135) {
                                return "SE";
                            } else if (this.value === 180) {
                                return "S";
                            } else if (this.value === 225) {
                                return "SW";
                            } else if (this.value === 270) {
                                return "W";
                            } else if (this.value === 315) {
                                return "NW";
                            }
                        }
                    },
                    title: {
                        text: "Wind Direction"
                    }
                },

                plotOptions: {
                    gauge: {
                        dial: {
                            radius: "100%",
                            backgroundColor: "#597ef7",
                            baseWidth: 1,
                            topWidth: 40,
                            baseLength: "0", // pct of radius
                            rearLength: "0"
                        },
                        pivot: {
                            radius: 0
                        }
                    }
                },

                tooltip: {
                    style: {},
                    formatter: (dataValue => {
                        return function() {
                            return (
                                '<span style="color:' +
                                this.series.color +
                                '">' +
                                this.series.name +
                                "</span>: <b>" +
                                dataValue
                            );
                        };
                    })(this.state.dataValue)
                },

                series: [
                    {
                        name: "Wind Direction",
                        data: [
                            (dataValue => {
                                this.setState({ dataValue: dataValue });
                                let _dataValue = [0, 0];
                                if (dataValue === 0) _dataValue = [0, 0];
                                else if (dataValue > 0 && dataValue <= 22.5)
                                    _dataValue = [0, 22.5];
                                else if (dataValue >= 22.5 && dataValue < 45)
                                    _dataValue = [22.5, 45];
                                else if (dataValue >= 45 && dataValue < 67.5)
                                    _dataValue = [45, 67.5];
                                else if (dataValue >= 67.5 && dataValue < 90)
                                    _dataValue = [67.5, 90];
                                else if (dataValue >= 90 && dataValue < 112.5)
                                    _dataValue = [90, 112.5];
                                else if (dataValue >= 112.5 && dataValue < 135)
                                    _dataValue = [112.5, 135];
                                else if (dataValue >= 135 && dataValue < 157.5)
                                    _dataValue = [135, 157.5];
                                else if (dataValue >= 157.5 && dataValue < 180)
                                    _dataValue = [157.5, 180];
                                else if (dataValue >= 180 && dataValue < 202.5)
                                    _dataValue = [180, 202.5];
                                else if (dataValue >= 202.5 && dataValue < 225)
                                    _dataValue = [202.5, 225];
                                else if (dataValue >= 225 && dataValue < 247.5)
                                    _dataValue = [225, 47.5];
                                else if (dataValue >= 247.5 && dataValue < 270)
                                    _dataValue = [247.5, 270];
                                else if (dataValue >= 270 && dataValue < 292.5)
                                    _dataValue = [270, 292.5];
                                else if (dataValue >= 292.5 && dataValue < 315)
                                    _dataValue = [292.5, 315];
                                else if (dataValue >= 315 && dataValue < 337.5)
                                    _dataValue = [315, 337.5];
                                else if (dataValue >= 337.5 && dataValue < 360)
                                    _dataValue = [337.5, 360];
                                else _dataValue = [360, 360];
                                if (dataValue <= _dataValue[0] + 11.25) {
                                    return _dataValue[0];
                                }
                                return _dataValue[1];
                            })(dataValue)
                        ],
                        tooltip: {
                            valueSuffix: " °"
                        }
                    }
                ]
            });
            if (typeof onChange === "function" && windirChart) {
                let point = windirChart.series[0].points[0];

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
            <HighchartsLibrary callback={this.drawWindir}>
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
    & .highcharts-dial {
        fill: #567ef7 !important;
    }
    & .highcharts-data-labels {
        display: none !important;
    }
    & .highcharts-grid-line {
        stroke: #ccc !important;
    }
    .highcharts-color-0:nth-child(2) {
        fill: var(--highcharts-color-0-1, blue);
    }
    .highcharts-color-0:nth-child(3) {
        fill: var(--highcharts-color-0-2, blue);
    }
`;

/*HighchartsWindDirection.propTypes = {
    title: PropTypes.string,
    yTitle: PropTypes.string,
    initialData: PropTypes.number.isRequired,
    valueSuffix: PropTypes.string,
    tickAmount: PropTypes.number,
    yMin: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
    onChange: PropTypes.func
};*/

export default HighchartsWindDirection;
