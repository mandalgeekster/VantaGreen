import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BreakpointProvider } from "./components/react/breakpoint";
import "./components/Bootstrap.css";

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

class ErrorBoundary extends React.Component {
    state = { error: null, errorInfo: null };
  
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }
  
    render() {
        if(this.state.errorInfo) {
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

const root = document.getElementById("root");
ReactDOM.render(
    <ErrorBoundary>
        <BreakpointProvider queries={queries}>
        <App />
        </BreakpointProvider>
    </ErrorBoundary>,
    root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
