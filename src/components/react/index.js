import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

import "./styles.css";
import "./sidebar.css";
import "./topmenu.css";
import "./drawer.css";
import "./menu.css";
import "./sider.css";

import "./highcharts-style.css";

import "./react-grid-layout.css";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
    layout_lg,
    layout_md,
    layout_sm,
    layout_xs,
    layout_xxs
} from "./react-grid-layouts";

import { BreakpointProvider } from "./breakpoint";
import { useBreakpoint } from "./breakpoint.js";

import Layout from "./layout";

import { Table, Input, Button, Icon, Row, Col } from "antd";

import * as widgets from "./react-grid-widget";

import ThreeTabbedWidget from "./three-tabbed-widget";
import TableWidget from "./table-widget";

import GridLayoutCell from "./react-grid-layout-cell";
import GridLayoutRow from "./react-grid-layout-row";

const queries = {
    xs: "(max-width: 320px)",
    sm: "(max-width: 720px)",
    s1: "(max-width: 920px)",
    s2: "(max-width: 960px)",
    s3: "(max-width: 980px)",
    md: "(max-width: 1024px)",
    m1: "(max-width: 1150px)",
    m2: "(max-width: 1280px)",
    m3: "(max-width: 1450px)",
    or: "(orientation: portrait)" // we can check orientation also
};

let layouts = {
    lg: layout_lg,
    md: layout_md,
    sm: layout_sm,
    xs: layout_xs,
    xxs: layout_xxs
};

let dashboardWidgets = [
    "HighchartsHistogramWidget",
    "HighchartsPlotWidget",
    "HighchartsStepWidget",
    "HighchartsGaugeWidget",
    "HighchartsWindDirectionWidget",
    "HighchartsWindRoseWidget"
];

let HighchartsHistogramWidget = widgets["HighchartsHistogramWidget"];
let HighchartsPlotWidget = widgets["HighchartsPlotWidget"];
let HighchartsStepWidget = widgets["HighchartsStepWidget"];
let HighchartsGaugeWidget = widgets["HighchartsGaugeWidget"];
let HighchartsWindDirectionWidget = widgets["HighchartsWindDirectionWidget"];
let HighchartsWindRoseWidget = widgets["HighchartsWindRoseWidget"];

dashboardWidgets.forEach((widget, i) => {
    ["lg", "md", "sm", "xs", "xxs"].forEach(sz => {
        console.log(sz);
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
                        }[sz] +
                        "Bound"
                ];

        while (--k >= 0) {
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

class ErrorBoundary extends React.Component {
    state = { error: null, errorInfo: null };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

const App = () => {
    const breakpoints = useBreakpoint();

    //const [step, setStep] = useState(1);
    //const [data, setData] = useState();

    const pull = breakpoints["s1"]
        ? 3
        : breakpoints["s2"]
        ? 2
        : breakpoints["s3"]
        ? 1
        : 0;

    const isMobile =
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1;

    const headerFontSize = isMobile ? "27px" : "16px";

    const headerHeight = isMobile ? "44px" : "25px";

    return (
        <Layout hasWarning={true}>
            <div className="dataloggers-form">
                <div className="dataloggers-form-inner">
                    <Row id="dashboard-form-banner-wrapper" gutter={0}>
                        <Col span={24}>
                            <div id="dashboard-form-banner">Bocca d'Arno</div>
                        </Col>
                    </Row>
                    <Row className="dataloggers-form-initial-spacing" />
                    <GridLayoutRow
                        lg={{ span: 22, offset: 0 }}
                        md={{ span: 22, offset: 0 }}
                        sm={{ span: 22, offset: 0 }}
                        xs={{ span: 22, offset: 0 }}
                        _rowHeight={200}
                        layouts={layouts}
                        onChange={layout => {
                            console.log(layout);
                        }}
                    >
                        <div key="a">
                            <GridLayoutCell
                                headerClassName={"grid-layout-item-header graph-item-header"}
                                headerLinesColor={"#ccc"}
                                headerLinesPadding={"1rem"}
                                headerFontSize={headerFontSize}
                                headerHeight={headerHeight}
                                headerTitle={"a. Rain"}
                                headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                headerBackgroundColor={"rgba(250,250,250,1)"}
                                contentBackgroundColor={"#fff"}
                            >
                                <div className="highcharts-custom-histogram-wrapper">
                                    <HighchartsHistogramWidget
                                        barColors={["#597ef7", "#bae637"]}
                                        title="Rain"
                                        titleColor="#fff"
                                        ytitleColor="#333"
                                        xLabelsColor="#333"
                                        yLabelsColor="#333"
                                        categories={["Month", "Year"]}
                                        seriesName="Period Rain"
                                        seriesData={[8.9, 3.6]}
                                        gridLineWidth={0.5}
                                        gridLineDashStyle="dash"
                                        gridLineColor="black"
                                    />
                                </div>
                            </GridLayoutCell>
                        </div>
                        <div key="b">
                            <div className="highcharts-custom-plot-wrapper">
                                <GridLayoutCell
                                    headerClassName={"grid-layout-item-header graph-item-header"}
                                    headerLinesColor={"#ccc"}
                                    headerLinesPadding={"1rem"}
                                    headerFontSize={headerFontSize}
                                    headerHeight={headerHeight}
                                    headerTitle={"b. Barometer"}
                                    headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                    headerBackgroundColor={"rgba(250,250,250,1)"}
                                    contentBackgroundColor={"#fff"}
                                >
                                    <HighchartsPlotWidget
                                        lineColors={["#597ef7"]}
                                        series={[
                                            [Date.UTC(2020, 0, new Date().getDate(), 0, 32), 30.25],
                                            [Date.UTC(2020, 0, new Date().getDate(), 1, 22), 30.74],
                                            [Date.UTC(2020, 0, new Date().getDate(), 1, 25), 30.6],
                                            [Date.UTC(2020, 0, new Date().getDate(), 1, 32), 30.62],
                                            [Date.UTC(2020, 0, new Date().getDate(), 2, 31), 30.81],
                                            [Date.UTC(2020, 0, new Date().getDate(), 2, 32), 30],
                                            [Date.UTC(2020, 0, new Date().getDate(), 2, 40), 30.68],
                                            [Date.UTC(2020, 0, new Date().getDate(), 2, 42), 30.41],
                                            [Date.UTC(2020, 0, new Date().getDate(), 3, 12), 30.5],
                                            [Date.UTC(2020, 0, new Date().getDate(), 3, 14), 30.39],
                                            [Date.UTC(2020, 0, new Date().getDate(), 3, 32), 30.6],
                                            [Date.UTC(2020, 0, new Date().getDate(), 5, 23), 30.85],
                                            [Date.UTC(2020, 0, new Date().getDate(), 6, 10), 30.99],
                                            [Date.UTC(2020, 0, new Date().getDate(), 6, 39), 30.64],
                                            [Date.UTC(2020, 0, new Date().getDate(), 7, 59), 30.55],
                                            [Date.UTC(2020, 0, new Date().getDate(), 8, 12), 30.3],
                                            [Date.UTC(2020, 0, new Date().getDate(), 8, 22), 30.49],
                                            [Date.UTC(2020, 0, new Date().getDate(), 8, 42), 30.27],
                                            [Date.UTC(2020, 0, new Date().getDate(), 10, 24), 30.67],
                                            [Date.UTC(2020, 0, new Date().getDate(), 12, 13), 30.18],
                                            [Date.UTC(2020, 0, new Date().getDate(), 19, 27), 30],
                                            [Date.UTC(2020, 0, new Date().getDate(), 20, 52), 30.56],
                                            [Date.UTC(2020, 0, new Date().getDate(), 22, 32), 30.77],
                                            [Date.UTC(2020, 0, new Date().getDate(), 23, 32), 30.62]
                                        ]}
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
                                    headerTitle={"c. Barometer"}
                                    headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                    headerBackgroundColor={"rgba(250,250,250,1)"}
                                    contentBackgroundColor={"#fff"}
                                >
                                    <HighchartsStepWidget
                                        lineColors={["#597ef7"]}
                                        series={[
                                            [Date.UTC(2020, 0, new Date().getDate(), 0, 32), 30.25],
                                            [Date.UTC(2020, 0, new Date().getDate(), 1, 22), 30.74],
                                            [Date.UTC(2020, 0, new Date().getDate(), 1, 25), 30.6],
                                            [Date.UTC(2020, 0, new Date().getDate(), 1, 32), 30.62],
                                            [Date.UTC(2020, 0, new Date().getDate(), 2, 31), 30.81],
                                            [Date.UTC(2020, 0, new Date().getDate(), 2, 32), 30],
                                            [Date.UTC(2020, 0, new Date().getDate(), 2, 40), 30.68],
                                            [Date.UTC(2020, 0, new Date().getDate(), 2, 42), 30.41],
                                            [Date.UTC(2020, 0, new Date().getDate(), 3, 12), 30.5],
                                            [Date.UTC(2020, 0, new Date().getDate(), 3, 14), 30.39],
                                            [Date.UTC(2020, 0, new Date().getDate(), 3, 32), 30.6],
                                            [Date.UTC(2020, 0, new Date().getDate(), 5, 23), 30.85],
                                            [Date.UTC(2020, 0, new Date().getDate(), 6, 10), 30.99],
                                            [Date.UTC(2020, 0, new Date().getDate(), 6, 39), 30.64],
                                            [Date.UTC(2020, 0, new Date().getDate(), 7, 59), 30.55],
                                            [Date.UTC(2020, 0, new Date().getDate(), 8, 12), 30.3],
                                            [Date.UTC(2020, 0, new Date().getDate(), 8, 22), 30.49],
                                            [Date.UTC(2020, 0, new Date().getDate(), 8, 42), 30.27],
                                            [Date.UTC(2020, 0, new Date().getDate(), 10, 24), 30.67],
                                            [Date.UTC(2020, 0, new Date().getDate(), 12, 13), 30.18],
                                            [Date.UTC(2020, 0, new Date().getDate(), 19, 27), 30],
                                            [Date.UTC(2020, 0, new Date().getDate(), 20, 52), 30.56],
                                            [Date.UTC(2020, 0, new Date().getDate(), 22, 32), 30.77],
                                            [Date.UTC(2020, 0, new Date().getDate(), 23, 32), 30.62]
                                        ]}
                                        daily={true}
                                        title=""
                                        subTitle=""
                                        xTitle=""
                                        yTitle=""
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
                                    headerTitle={"d. Humidity"}
                                    headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                    headerBackgroundColor={"rgba(250,250,250,1)"}
                                    contentBackgroundColor={"#fff"}
                                >
                                    <HighchartsGaugeWidget
                                        title={"Humidity"}
                                        yTitle={"Humidity"}
                                        yMin={0}
                                        yMax={100}
                                        onChange={point => {
                                            setInterval(() => {
                                                point.update(
                                                    Math.floor(Math.random() * (90 - 70 + 1) + 70)
                                                );
                                            }, 5000);
                                        }}
                                        initialData={80}
                                    />
                                </GridLayoutCell>
                            </div>
                        </div>
                        <div key="e">
                            <div className="highcharts-custom-windir-wrapper">
                                <GridLayoutCell
                                    headerClassName={"grid-layout-item-header graph-item-header"}
                                    headerLinesColor={"#ccc"}
                                    headerLinesPadding={"1rem"}
                                    headerFontSize={headerFontSize}
                                    headerHeight={headerHeight}
                                    headerTitle={"e. Wind Direction"}
                                    headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                    headerBackgroundColor={"rgba(250,250,250,1)"}
                                    contentBackgroundColor={"#fff"}
                                >
                                    <HighchartsWindDirectionWidget dataValue={207} />
                                </GridLayoutCell>
                            </div>
                        </div>
                        <div key="f">
                            <div className="highcharts-custom-windrose-wrapper">
                                <GridLayoutCell
                                    headerClassName={"grid-layout-item-header graph-item-header"}
                                    headerLinesColor={"#ccc"}
                                    headerLinesPadding={"1rem"}
                                    headerFontSize={headerFontSize}
                                    headerHeight={headerHeight}
                                    headerTitle={"f. Wind Rose"}
                                    headerBackgroundHoverColor={"rgba(250,250,250,0.5)"}
                                    headerBackgroundColor={"rgba(250,250,250,1)"}
                                    contentBackgroundColor={"#fff"}
                                >
                                    <HighchartsWindRoseWidget
                                        series={[
                                            {
                                                name: "0.50 - 1.50 m/s",
                                                _pointPadding: 0,
                                                _groupPadding: 0,
                                                data: [0.88, 1, 4.33, 9.55, 0.88, 0.44, 0.22, 1.22],
                                                _colorIndex: 0
                                            },
                                            {
                                                name: "1.50 - 2.50 m/s",
                                                _pointPadding: 0,
                                                _groupPadding: 0,
                                                data: [1, 1.55, 14.22, 14.88, 0.44, 0.88, 0, 1.11],
                                                _colorIndex: 1
                                            },
                                            {
                                                name: "2.50 - 3.50 m/s",
                                                _pointPadding: 0,
                                                _groupPadding: 0,
                                                data: [0.66, 0.44, 15.88, 15.44, 0.11, 0, 0, 0.66],
                                                _colorIndex: 2
                                            },
                                            {
                                                name: ">= 3.50 m/s",
                                                _pointPadding: 0,
                                                _groupPadding: 0,
                                                data: [0, 0, 10.88, 2.33, 0, 0, 0, 0],
                                                _colorIndex: 3
                                            }
                                        ]}
                                    />
                                </GridLayoutCell>
                            </div>
                        </div>
                    </GridLayoutRow>
                    {/**/}
                    {/*<Row>
                        <Col
                            lg={{ span: 22, offset: 1 }}
                            md={{ span: 22, offset: 1 }}
                            sm={{ span: 22, offset: 1 }}
                            xs={{ span: 22, offset: 0 }}
                        >
                            <GridLayout
                                className="layout"
                                layout={layout}
                                cols={12}
                                rowHeight={100}
                                width={
                                    breakpoints["xs"]
                                        ? 480
                                        : breakpoints["sm"]
                                        ? 1024
                                        : breakpoints["md"]
                                        ? 1550
                                        : 3800
                                }
                            >
                                <div key="a">
                                    <GridLayoutCell
                                        headerLinesColor={"#ccc"}
                                        headerLinesPadding={"1rem"}
                                        headerHeight={"10px"}
                                        headerTitle={"Rain"}
                                        headerBackgroundColor={"#fafafa"}
                                        contentBackgroundColor={"#fff"}
                                    />
                                </div>
                                <div key="b">b</div>
                                <div key="c">c</div>
                            </GridLayout>
                        </Col>
                    </Row>*/}

                    {/*<Row>
                        <Col
                            lg={{ span: 22, offset: 1 }}
                            md={{ span: 22, offset: 1 }}
                            sm={{ span: 22, offset: 1 }}
                            xs={{ span: 22, offset: 0 }}
                        >
                            <FormRowWrapper>
                                <Row gutter={16}>
                                    <Col
                                        xs={{ span: 24, offset: 1 }}
                                        sm={{ span: 24, offset: 0 }}
                                        md={{ span: 8, offset: 0 }}
                                        lg={{ span: 8, offset: 0 }}
                                    >
                                        <div className="field username-field">
                                            <label className="placeholder-label" htmlFor="username">
                                                Rain
                                            </label>
                                            <div className="highcharts-custom-histogram-wrapper">
                                                <HighchartsHistogram
                                                    barColors={["#597ef7", "#bae637"]}
                                                    title="Rain"
                                                    titleColor="#fff"
                                                    ytitleColor="#333"
                                                    xLabelsColor="#333"
                                                    yLabelsColor="#333"
                                                    categories={["Month", "Year"]}
                                                    seriesName="Period Rain"
                                                    seriesData={[8.9, 3.6]}
                                                    gridLineWidth={0.5}
                                                    gridLineDashStyle="dash"
                                                    gridLineColor="black"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col
                                        xs={{ span: 24, offset: 1 }}
                                        sm={{ span: 24, offset: 0 }}
                                        md={{ span: 8, offset: 0 }}
                                        lg={{ span: 8, offset: 0 }}
                                    >
                                        <div className="field username-field">
                                            <label className="placeholder-label" htmlFor="username">
                                                Wind Rose
                                            </label>
                                            <div className="dashboard-windrose-widget-container">
                                                &nbsp;
                                            </div>
                                        </div>
                                    </Col>
                                    <Col
                                        xs={{ span: 24, offset: 1 }}
                                        sm={{ span: 24, offset: 0 }}
                                        md={{ span: 8, offset: 0 }}
                                        lg={{ span: 8, offset: 0 }}
                                    >
                                        <div className="field">
                                            <label className="placeholder-label" htmlFor="username">
                                                Air Temperature
                                            </label>
                                            <div className="dashboard-tabbed-widget-container">
                                                <ThreeTabbedWidget
                                                    label1="3h"
                                                    label2="12h"
                                                    label3="24h"
                                                    text1="21.9°"
                                                    text2="20°"
                                                    text3="19°"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col
                                        xs={{ span: 24, offset: 1 }}
                                        sm={{ span: 24, offset: 0 }}
                                        md={{ span: 8, offset: 0 }}
                                        lg={{ span: 8, offset: 0 }}
                                    >
                                        <div className="field">
                                            <label className="placeholder-label" htmlFor="username">
                                                Barometer
                                            </label>
                                            <div className="highcharts-custom-plot-wrapper">
                                                <HighchartsPlot
                                                    lineColors={["#597ef7" ]}
                                                    series={[
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 0, 32),
                                                            30.25
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 1, 22),
                                                            30.74
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 1, 25),
                                                            30.6
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 1, 32),
                                                            30.62
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 2, 31),
                                                            30.81
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 2, 32),
                                                            30
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 2, 40),
                                                            30.68
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 2, 42),
                                                            30.41
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 3, 12),
                                                            30.5
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 3, 14),
                                                            30.39
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 3, 32),
                                                            30.6
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 5, 23),
                                                            30.85
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 6, 10),
                                                            30.99
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 6, 39),
                                                            30.64
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 7, 59),
                                                            30.55
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 8, 12),
                                                            30.3
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 8, 22),
                                                            30.49
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 8, 42),
                                                            30.27
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 10, 24),
                                                            30.67
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 12, 13),
                                                            30.18
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 19, 27),
                                                            30
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 20, 52),
                                                            30.56
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 22, 32),
                                                            30.77
                                                        ],
                                                        [
                                                            Date.UTC(2020, 0, new Date().getDate(), 23, 32),
                                                            30.62
                                                        ]
                                                    ]}
                                                    daily={true}
                                                    title=""
                                                    subTitle=""
                                                    xTitle=""
                                                    yTitle=""
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col
                                        xs={{ span: 24, offset: 1 }}
                                        sm={{ span: 24, offset: 0 }}
                                        md={{ span: 8, offset: 0 }}
                                        lg={{ span: 8, offset: 0 }}
                                    >
                                        <div className="field username-field">
                                            <label className="placeholder-label" htmlFor="username">
                                                Rainfall Stats
                                            </label>
                                            <div className="dashboard-table-widget-container">
                                                <TableWidget />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col
                                        xs={{ span: 24, offset: 1 }}
                                        sm={{ span: 24, offset: 0 }}
                                        md={{ span: 8, offset: 0 }}
                                        lg={{ span: 8, offset: 0 }}
                                    >
                                        <div className="field username-field">
                                            <label className="placeholder-label" htmlFor="username">
                                                Battery Health Check
                                            </label>
                                            <div className="dashboard-battery-widget-container">
                                                &nbsp;
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </FormRowWrapper>
                        </Col>
                    </Row>*/}
                </div>
            </div>
        </Layout>
    );
};

/*
const dataSource = [
    {
        key: "1",
        name: "Temperatura Aria",
        category: "Generico",
        aggregation: "Aritmetica",
        widget: "Sì"
    },
    {
        key: "2",
        name: "Temperatura Aria",
        category: "Generico",
        aggregation: "Aritmetica",
        widget: "Sì"
    }
];
*/
/*
const columns = [
    {
        title: "Nome Misura",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Categoria",
        dataIndex: "category",
        key: "category"
    },
    {
        title: "Aggregazione",
        dataIndex: "aggregation",
        key: "aggregation"
    },
    {
        title: "Widget",
        dataIndex: "widget",
        key: "widget"
    }
];
*/
const rootElement = document.getElementById("root");
ReactDOM.render(
    <ErrorBoundary>
        <BreakpointProvider queries={queries}>
            <App />
        </BreakpointProvider>
    </ErrorBoundary>,
    rootElement
);
