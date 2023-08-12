import React from "react";

import HighchartsGauge from "./highcharts-gauge";
import HighchartsHistogram from "./highcharts-histogram";
import HighchartsPlot from "./highcharts-plot";
import HighchartsStep from "./highcharts-step";
import HighchartsWindDirection from "./highcharts-wind-direction";
import HighchartsWindRose from "./highcharts-wind-rose";

const withSizing = function(WrappedWidgetComponent) {
    return class extends React.Component {
        static get reactGridLayoutBounds() {
            return getReactGridLayoutBounds(WrappedWidgetComponent);
        }
        static get reactGridLayoutLargeBound() {
            return getReactGridLayoutBound("lg");
        }
        static get reactGridLayoutMediumBound() {
            return getReactGridLayoutBound("md");
        }
        static get reactGridLayoutSmallBound() {
            return getReactGridLayoutBound("sm");
        }
        static get reactGridLayoutExtraSmallBound() {
            return getReactGridLayoutBound("xs");
        }
        static get reactGridLayoutExtraExtraSmallBound() {
            return getReactGridLayoutBound("xxs");
        }
        render() {
            // Returns the widget component in a container, without mutating it.
            return <WrappedWidgetComponent {...this.props} />;
        }
    };
};

const getReactGridLayoutBound = function(sz) {
    let columns = 12;
    switch (sz) {
        case "lg":
            columns = 12;
            break;
        case "md":
            columns = 9;
            break;
        case "sm":
            columns = 8;
            break;
        case "xs":
            columns = 4;
            break;
        case "xxs":
            columns = 4;
            break;
        default:
            columns = 12;
    }
    return columns;
};

const getReactGridLayoutBounds = function(clazz) {
    if (!clazz || !("widgetClassName" in clazz)) {
        return {};
    }

    let bounds = null;
    let clazzName = clazz.widgetClassName;

    switch (clazzName) {
        case (clazzName.match(/histogram$/i) || {}).input:
        case (clazzName.match(/gauge$/i) || {}).input:
        case (clazzName.match(/step$/i) || {}).input:
        case (clazzName.match(/(wind)(direction)$/i) || {}).input:
        case (clazzName.match(/(tabbed)/i) || {}).input:
            bounds = {
                lg: { w: 3, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 2 },
                md: { w: 3, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 2 },
                sm: { w: 4, h: 2, minW: 4, maxW: 4, minH: 2, maxH: 2 },
                xs: { w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 2 },
                xxs: { w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 2 }
            };
            break;
        case (clazzName.match(/plot$/i) || {}).input:
        case (clazzName.match(/(wind)(rose)$/i) || {}).input:
            bounds = {
                lg: { w: 6, h: 2, minW: 4, maxW: 6, minH: 2, maxH: 2 },
                md: { w: 6, h: 2, minW: 4, maxW: 6, minH: 2, maxH: 2 },
                sm: { w: 4, h: 2, minW: 4, maxW: 4, minH: 2, maxH: 2 },
                xs: { w: 4, h: 2, minW: 4, maxW: 6, minH: 2, maxH: 2 },
                xxs: { w: 4, h: 2, minW: 4, maxW: 6, minH: 2, maxH: 2 }
            };
            break;
        default:
            bounds = {
                lg: { w: 3, h: 2, minW: 3, maxW: 3, minH: 2, maxH: 2 },
                md: { w: 3, h: 2, minW: 3, maxW: 3, minH: 2, maxH: 2 },
                sm: { w: 4, h: 2, minW: 4, maxW: 4, minH: 2, maxH: 2 },
                xs: { w: 4, h: 2, minW: 4, maxW: 4, minH: 2, maxH: 2 },
                xxs: { w: 4, h: 2, minW: 4, maxW: 4, minH: 2, maxH: 2 }
            };
            break;
    }

    return bounds;
};

const HighchartsGaugeWidget = withSizing(HighchartsGauge);
const HighchartsHistogramWidget = withSizing(HighchartsHistogram);
const HighchartsPlotWidget = withSizing(HighchartsPlot);
const HighchartsStepWidget = withSizing(HighchartsStep);
const HighchartsWindDirectionWidget = withSizing(HighchartsWindDirection);
const HighchartsWindRoseWidget = withSizing(HighchartsWindRose);

export {
    HighchartsGaugeWidget,
    HighchartsHistogramWidget,
    HighchartsPlotWidget,
    HighchartsStepWidget,
    HighchartsWindDirectionWidget,
    HighchartsWindRoseWidget
};
