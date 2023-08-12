import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import HighchartsLibrary from "./highcharts-library";

let _highchartsPlotCount = 0;

class HighchartsPlot extends React.Component {
    constructor(props) {
        super(props);
        ++HighchartsPlot.highchartsPlotCount;
        this.state = {
            id: "highcharts-plot-" + HighchartsPlot.highchartsPlotCount,
            loaded: false
        };

        this.drawPlot = this.drawPlot.bind(this);
    }
    static get highchartsPlotCount() {
        return _highchartsPlotCount;
    }
    static set highchartsPlotCount(v) {
        _highchartsPlotCount = v;
    }

    drawData(series, daily) {
        if (!Array.isArray(series)) {
            series = [];
        }
        console.log(series);
        for (let i = 0; !daily && i < series.length; i++) {
            series[i].name = series[i].name || "Data Group " + (i + 1);
            series[i].data = series[i].data.map((value, index, array) => {
                if (Array.isArray(value) && value[0].getMinutes) {
                    value[0] =
                        // NB: 60000 safelly converts minutes to milliseconds
                        (value[0].getMinutes() > 0 && value[0].getMinutes() < 15) ||
                        (value[0].getMinutes() > 15 && value[0].getMinutes() < 30) ||
                        (value[0].getMinutes() > 30 && value[0].getMinutes() < 45) ||
                        (value[0].getMinutes() > 45 && value[0].getMinutes() < 60)
                            ? new Date(value[0].getTime() + 15 * 60000)
                            : value[0];
                }
                return value;
            });
        }
        return series;
    }

    drawPlot(Highcharts) {
        const {
            lineColors,
            series,
            daily,
            title,
            subTitle,
            xTitle,
            yTitle,
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

        /*this.initBarsColorScheme(barColors || []);*/
        try {
            new Highcharts.Chart({
                chart: {
                    type: "spline",
                    renderTo: this.state.id,
                    styledMode: true
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: subTitle
                },
                xAxis: {
                    /*type:
                        "datetime" ,
                    dateTimeLabelFormats: {
                        // don't display the dummy year
                        month: "%e. %b",
                        year: "%b"
                    },*/
                    title: {
                        text: xTitle || ""
                    }
                },
                yAxis: {
                    title: {
                        text: yTitle || ""
                    }
                },
                tooltip: {
                    headerFormat: "<b>{series.name}</b><br>",
                    pointFormat: "{point.x:%e. %b}: {point.y:.2f} m"
                },

                plotOptions: {
                    series: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                colors: lineColors,
                series: this.drawData(
                    series,
                    daily
                ) /*,
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
                }*/
            });
        } catch (ex) {
            console.log(ex);
        }
        // assumimg the plot graph is completely loaded at this stage
        this.setState({ loaded: true });
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

export default HighchartsPlot;
