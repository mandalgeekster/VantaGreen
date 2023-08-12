import React from "react";

let allLoaded = false;
let scripts = [];

let Loader = function() {};

Loader.prototype = {
    require: function() {
        let script;
        let args = arguments;
        let doc = document;

        let toLoad = args.length; // load this many scripts
        let lastArgument = (function(args, index) {
            return function() {
                args[index]();
            };
        })(args, toLoad - 1);
        let hasCallback = lastArgument.call; // is the last arg a callback?
        if (hasCallback) {
            toLoad--;
        }

        function onScriptLoaded() {
            let readyState = this && this.readyState;
            if (!readyState || /ded|te/.test(readyState)) {
                loadScript();
            }
        }

        function loadScript() {
            toLoad--;
            if (!toLoad && hasCallback) {
                allLoaded = true;
                //lastArgument();
            }
        }

        function _setInterval(callback, delay) {
            let dateNow = Date.now,
                requestAnimation = window.requestAnimationFrame,
                start = dateNow(),
                stop,
                intervalFn = function() {
                    /* eslint-disable */
                    dateNow() - start < delay || ((start += delay), callback());
                    /* eslint-enable */
                    stop || requestAnimation(intervalFn);
                };
            requestAnimation(intervalFn);
            return {
                clear: function() {
                    stop = 1;
                }
            };
        }

        let interval = _setInterval(() => {
            if (allLoaded) {
                scripts.forEach(fn => {
                    fn();
                });
                interval.clear();
            }
        }, 100);

        for (let i = 0; i < toLoad; i++) {
            let _script = document.querySelector(
                'script[src="' + arguments[i] + '"]'
            );
            if (scripts.indexOf(lastArgument) === -1) {
                scripts.push(lastArgument);
            }
            if (_script) {
                continue;
            }
            script = doc.createElement("script");
            script.src = arguments[i];
            script.async = false;
            script.onload = script.onerror = script.onreadystatechange = onScriptLoaded;
            (doc.head || doc.getElementsByTagName("head")[0]).appendChild(script);
        }
    }
};

export default class HighchartsLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            development: this.props.development || false,
            callback: this.props.callback
        };
    }
    componentDidMount() {
        new Loader().require(
            "https://code.highcharts.com/highcharts.js",
            "https://code.highcharts.com/highcharts-more.js",
            "https://code.highcharts.com/modules/solid-gauge.js",
            "https://code.highcharts.com/modules/exporting.js",
            "https://code.highcharts.com/modules/export-data.js",
            () => {
                if (typeof this.state.callback === "function") {
                    if (window.Highcharts) {
                        this.state.callback(window.Highcharts);
                    }
                }
            }
        );
    }
    render() {
        return <span className="highchart-loader">{this.props.children}</span>;
    }
}
