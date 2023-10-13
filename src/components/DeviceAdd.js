import React, { Component } from "react";

class DeviceAdd extends Component {
    render() {
        return (
            <div className="div-container">
                <br/>
                <br/>
                <h1 className="h1-inter margin0auto">Add your Pebble Tracker</h1>
                <br/>
                <form 
                    className="form-container"
                    onSubmit={ (event) => {
                        event.preventDefault()
                        this.props.update_disable_device_add(true)
                        this.props.update_loading(true)
                        const imei1 = this.imei2.value
                        const imei2 = this.imei2.value
                        let error1 = this.props.validate_imei(imei1)
                        let error2 = this.props.validate_imei(imei2)
                        if(error1) { window.alert("[Error 1] ", error1) }
                        if(error2) { window.alert("[Error 2] ", error2) }
                        console.log("[Info] Device IMEI 1: ", imei1)
                        console.log("[Info] Device IMEI 2: ", imei2)
                        this.props.fetch_pebble_data(imei1, imei2)
                    }}>
                    <div>
                        <input
                            id="IMEI"
                            type="text"
                            ref={ (input) => { this.imei1 = input } }
                            // style={{ margin: "0 auto" }}
                            className="form-control imei-input margin0auto"
                            placeholder="Enter your first 15-digit IMEI number"
                            required 
                        />
                    </div>
                    <br/>
                    <div>
                        <input
                            id="IMEI"
                            type="text"
                            ref={ (input) => { this.imei2 = input } }
                            // style={{ margin: "0 auto" }}
                            className="form-control imei-input margin0auto"
                            placeholder="Enter your second 15-digit IMEI number"
                            required 
                        />
                    </div>
                    <br/>
                    <div className="margin0auto"><button type="submit" className="btn btn-primary">Add Device</button></div>
                </form>
                <br/>
                <br/>
            </div>
        );
    }
}

export default DeviceAdd;