import React, { Component } from "react";
import DeviceAdd from "./DeviceAdd";

interface MainProps {
  disable_device_add: boolean;
  update_loading: (bool: boolean) => void;
  update_disable_device_add: (bool: boolean) => void;
  fetch_pebble_data: (imei1: string, imei2: string) => void;
  validate_imei: (value: string) => string | undefined;
}

class Main extends Component<MainProps> {
  render() {
    return (
      <div id="default">
        {!this.props.disable_device_add ? (
          <DeviceAdd
            update_loading={this.props.update_loading}
            update_disable_device_add={this.props.update_disable_device_add}
            fetch_pebble_data={this.props.fetch_pebble_data}
            validate_imei={this.props.validate_imei}
          />
        ) : null}
      </div>
    );
  }
}

export default Main;
