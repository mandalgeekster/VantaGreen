import React from "react";
import styled from "styled-components";

import HighchartsLibrary from "./highcharts-library";
import EventDispatcher from "./event-dispatcher";

let _highchartsPlotCount = 0;

class HighchartsPlot extends React.Component {
    constructor(props) {
        super(props);
        ++HighchartsPlot.highchartsPlotCount;
        this.state = {
            id: "highcharts-plot-" + HighchartsPlot.highchartsPlotCount,
            loaded: false,
            ready: false,
            collapsed: false
        };

        this.drawPlot = this.drawPlot.bind(this);
        //this.updateSideMenuCollapsingState = this.updateSideMenuCollapsingState.bind(
        //    this
        //);
    }
    static get widgetClassName() {
        return "HighchartsPlot";
    }
    static get highchartsPlotCount() {
        return _highchartsPlotCount;
    }
    static set highchartsPlotCount(v) {
        _highchartsPlotCount = v;
    }
    drawDataChild(series) {
        return series.map((value, index, array) => {
            let _value = [];

            if (!value || !Array.isArray(value) || isNaN(value[0])) {
                return value;
            }

            let date = new Date(value[0]);

            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            _value[0] = Date.UTC(
                year,
                month,
                day,
                hours - 1,
                minutes > 0 && minutes < 15
                    ? 15
                    : minutes > 15 && minutes < 30
                    ? 30
                    : minutes > 30 && minutes < 45
                    ? 45
                    : minutes > 45 && minutes < 60
                    ? 60
                    : minutes
            );
            _value[1] = value[1];

            return _value;
        });
    }

    drawData(series, daily) {
        if (!Array.isArray(series)) {
            series = [];
        }
        //return daily ? this.drawDataChild(series) : series.slice(0);
        return series.slice(0);
    }

    drawPlot(Highcharts) {
        const {
            lineColors,
            series,
            daily,
            title,
            subTitle,
            yTitle
        } = this.props;
        try {
            if (!this.state.ready) {
                return;
            }
            new Highcharts.chart(this.state.id, {
                chart: {
                    reflow: true,
                    zoomType: "x"
                },
                colors: lineColors,
                title: {
                    text: title
                },
                subtitle: {
                    text: subTitle
                },
                xAxis: {
                    type: "datetime",
                    dateTimeLabelFormats: daily
                        ? {
                                day: "%H"
                            }
                        : {},
                    tickInterval: 3600 * 1000
                },
                yAxis: {
                    title: {
                        text: yTitle
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [
                                    1,
                                    Highcharts.Color(Highcharts.getOptions().colors[0])
                                        .setOpacity(0)
                                        .get("rgba")
                                ]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [
                    {
                        type: "area",
                        name: "...",
                        data: this.drawData(series, daily)
                    }
                ],

                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                plotOptions: {
                                    series: {
                                        marker: {
                                            radius: 2.5
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            });
        } catch (ex) {
            console.warn && console.warn(ex);
        }
        // assumimg that the plot graph is completely loaded at this stage
        this.setState({ loaded: true });
    }

    updateSideMenuCollapsingState(collapsed) {
        setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
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
            <HighchartsLibrary callback={this.drawPlot}>
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
`;

export default HighchartsPlot;
