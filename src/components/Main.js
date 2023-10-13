import React, { Component } from "react";
import DeviceAdd from "./DeviceAdd.js"

class Main extends Component {
    render() {
        return (
            <div id="default">
                { 
                    !this.props.disable_device_add
                    ? <DeviceAdd 
                        update_loading={ this.props.update_loading }
                        update_disable_device_add={ this.props.update_disable_device_add }
                        fetch_pebble_data={ this.props.fetch_pebble_data }
                        validate_imei={ this.props.validate_imei }
                      />
                    : null
                }
            </div>
        );
    }
}

export default Main;