import React, { Component } from 'react';

import * as widgets from "./react/react-grid-widget";
import GridLayoutCell from "./react/react-grid-layout-cell";
import GridLayoutRow from "./react/react-grid-layout-row";

import "./Bootstrap.css"

import {
    layout_lg,
    layout_md,
    layout_sm,
    layout_xs,
    layout_xxs
} from "./react/react-grid-layouts";

/* CSS */
import "antd/dist/antd.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./react/styles.css";
import "./react/sidebar.css";
import "./react/topmenu.css";
import "./react/drawer.css";
import "./react/menu.css";
import "./react/sider.css";
import "./react/highcharts-style.css";
import "./react/react-grid-layout.css"; 
import "./App.css";

let HighchartsPlotWidget = widgets["HighchartsPlotWidget"];
let HighchartsGaugeWidget = widgets["HighchartsGaugeWidget"];

const isMobile = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1;
const headerFontSize = isMobile ? "27px" : "16px";
const headerHeight = isMobile ? "44px" : "25px";
let layouts = {
    lg: layout_lg,
    md: layout_md,
    sm: layout_sm,
    xs: layout_xs,
    xxs: layout_xxs
};
let dashboardWidgets = [
    "HighchartsPlotWidget",
    "HighchartsStepWidget",
    "HighchartsGaugeWidget",
];
dashboardWidgets.forEach((widget, i) => {
    ["lg", "md", "sm", "xs", "xxs"].forEach(sz => {
        // console.log(sz);
        let x = 0,
            y = 0,
            k = i,
            r = 2,
            c =
                widgets[widget][
                    "reactGridLayout" +
                        {
                            lg: "Large",
                            md: "Medium",
                            sm: "Small",
                            xs: "ExtraSmall",
                            xxs: "ExtraExtraSmall"
                        }[sz] + "Bound"
                ];

        while(--k >= 0) {
            x += layouts[sz][k].w;
            if (x >= c) {
                x -= c;
                y += r;
            }
        }
        layouts[sz][i].x = x;
        layouts[sz][i].y = y;
        layouts[sz][i] = Object.assign(
            layouts[sz][i],
            widgets[widget].reactGridLayoutBounds[sz]
        );
    });
});

class Graphs extends Component {
    render() {
        return ( 
            <div className="container container-fluid mt-5 align-items-center">
                <br/>
                <br/>
                <br/>
                <h1 
                    style={{ fontSize: "45px"}} 
                    className="h1-inter margin0auto"
                >
                    Here's an overview of your Pebble Device Data
                </h1>
                <br/>
                <br/>
                <GridLayoutRow
                    lg={{ span: 22, offset: 0 }}
                    md={{ span: 22, offset: 0 }}
                    sm={{ span: 22, offset: 0 }}
                    xs={{ span: 22, offset: 0 }}
                    _rowHeight={200}
                    layouts={layouts}
                >

                    <div key="a">
                        <div className="highcharts-custom-plot-wrapper">
                            <GridLayoutCell
                                headerClassName={"grid-layout-item-header graph-item-header"}
                                headerLinesColor={"#ccc"}
                                headerLinesPadding={"1rem"}
                                headerFontSize={headerFontSize}
                                headerHeight={headerHeight}
                                headerTitle={"Temperature over Time"}
                                headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                headerBackgroundColor={"rgba(250,250,250,1)"}
                                contentBackgroundColor={"#fff"}
                            >
                                <HighchartsPlotWidget
                                    lineColors={["#0F9D58"]}
                                    series={ this.props.load_temperature_data() }
                                    daily={true}
                                    title=""
                                    subTitle=""
                                    xTitle=""
                                    yTitle=""
                                />
                            </GridLayoutCell>
                        </div>
                    </div>
                    
                    <div key="b">
                        <div className="highcharts-custom-plot-wrapper">
                            <GridLayoutCell
                                headerClassName={"grid-layout-item-header graph-item-header"}
                                headerLinesColor={"#ccc"}
                                headerLinesPadding={"1rem"}
                                headerFontSize={headerFontSize}
                                headerHeight={headerHeight}
                                headerTitle={"Gas Resistance"}
                                headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                headerBackgroundColor={"rgba(250,250,250,1)"}
                                contentBackgroundColor={"#fff"}
                            >
                                <HighchartsPlotWidget
                                    lineColors={["#0F9D58"]}
                                    series={ this.props.load_gas_data() }
                                    daily={true}
                                    title=""
                                    subTitle=""
                                    xTitle=""
                                    yTitle=""
                                />
                            </GridLayoutCell>
                        </div>
                    </div>

                    <div key="c">
                        <div className="highcharts-custom-step-wrapper">
                            <GridLayoutCell
                                headerClassName={"grid-layout-item-header graph-item-header"}
                                headerLinesColor={"#ccc"}
                                headerLinesPadding={"1rem"}
                                headerFontSize={headerFontSize}
                                headerHeight={headerHeight}
                                headerTitle={"Average Humidity"}
                                headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                headerBackgroundColor={"rgba(250,250,250,1)"}
                                contentBackgroundColor={"#fff"}
                            >
                                <HighchartsGaugeWidget
                                    title={"Humidity"}
                                    yTitle={"Humidity"}
                                    yMin={0}
                                    yMax={100}
                                    initialData={this.props.load_humidity_data()}
                                />
                            </GridLayoutCell>
                        </div>
                    </div>
                    
                    <div key="d">
                        <div className="highcharts-custom-step-wrapper">
                            <GridLayoutCell
                                headerClassName={"grid-layout-item-header graph-item-header"}
                                headerLinesColor={"#ccc"}
                                headerLinesPadding={"1rem"}
                                headerFontSize={headerFontSize}
                                headerHeight={headerHeight}
                                headerTitle={"Average Luminosity"}
                                headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                headerBackgroundColor={"rgba(250,250,250,1)"}
                                contentBackgroundColor={"#fff"}
                            >
                                <HighchartsGaugeWidget
                                    title={"Luminosity"}
                                    yTitle={"Luminosity"}
                                    yMin={0}
                                    yMax={100}
                                    initialData={this.props.load_light_data()}
                                />
                            </GridLayoutCell>
                        </div>
                    </div>
                </GridLayoutRow>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Graphs;