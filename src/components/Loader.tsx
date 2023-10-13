import React, { Component } from "react";

interface LoaderProps {
  loading: boolean;
}

class Loader extends Component<LoaderProps> {
  render() {
    return (
      <div className="div-container">
        {this.props.loading ? <br /> : null}
        {this.props.loading ? (
          <div id="loader" className="text-center">
            <a className="text-center">Loading...</a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Loader;
