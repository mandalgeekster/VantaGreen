import React, { useState, useLayoutEffect } from "react";

//import GridLayout from "react-grid-layout";
import RGL, { WidthProvider } from "react-grid-layout";

import { Row, Col } from "antd";

const ReactGridLayout = WidthProvider(RGL);

/*const documentIsFinishedLoading = () => {
    return /^complete|^i|^c/.test(document.readyState);
};*/

/*const doWhenDocumentReadyStateIsComplete = doWork => {
    let intervalId;

    if (documentIsFinishedLoading()) {
        doWork();
    } else {
        intervalId = setInterval(() => {
            if (documentIsFinishedLoading()) {
                doWork();
                clearInterval(intervalId);
            }
        }, 250);
    }
};*/

const GridLayoutRow = props => {
    //const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        /*doWhenDocumentReadyStateIsComplete(() => {
            let wrap = document.querySelectorAll("#react-grid-layout-wrap");
            wrap &&
                setDimensions({
                    width: wrap[0].offsetWidth,
                    height: wrap[0].offsetHeight
                });
        });*/
        var evt = window.document.createEvent("UIEvents");
        evt.initUIEvent("resize", true, false, window, 0);
        setTimeout(() => window.dispatchEvent(evt), 100);
    }, []);

    return (
        <Row type="flex" justify="space-around" align="middle">
            <Col
                id="react-grid-layout-wrap"
                lg={props.lg}
                md={props.md}
                sm={props.sm}
                xs={props.xs}
            >
                {
                    <ReactGridLayout
                        items={props.items}
                        layout={props.layout}
                        onLayoutChange={props.onChange}
                    >
                        {props.children}
                    </ReactGridLayout>
                }
            </Col>
        </Row>
    );
};

export default GridLayoutRow;
