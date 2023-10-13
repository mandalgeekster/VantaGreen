import React, { Component, FormEvent, RefObject } from "react";

interface DeviceAddProps {
    update_disable_device_add: (value: boolean) => void;
    update_loading: (value: boolean) => void;
    validate_imei: (imei: string) => string | undefined;
    fetch_pebble_data: (imei1: string, imei2: string) => void;
}

class DeviceAdd extends Component<DeviceAddProps> {
    private imei1Ref: RefObject<HTMLInputElement> = React.createRef();
    private imei2Ref: RefObject<HTMLInputElement> = React.createRef();

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        this.props.update_disable_device_add(true);
        this.props.update_loading(true);

        const imei1 = this.imei1Ref.current?.value || "";
        const imei2 = this.imei2Ref.current?.value || "";

        const error1 = this.props.validate_imei(imei1);
        const error2 = this.props.validate_imei(imei2);

        if (error1) {
            window.alert("[Error 1] " + error1);
        }
        if (error2) {
            window.alert("[Error 2] " + error2);
        }

        console.log("[Info] Device IMEI 1: " + imei1);
        console.log("[Info] Device IMEI 2: " + imei2);

        this.props.fetch_pebble_data(imei1, imei2);
    };

    render() {
        return (
            <div className="div-container">
                <br />
                <br />
                <h1 className="h1-inter margin0auto">Add your Pebble Tracker</h1>
                <br />
                <form className="form-container" onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            id="IMEI1"
                            type="text"
                            ref={this.imei1Ref}
                            className="form-control imei-input margin0auto"
                            placeholder="Enter your first 15-digit IMEI number"
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <input
                            id="IMEI2"
                            type="text"
                            ref={this.imei2Ref}
                            className="form-control imei-input margin0auto"
                            placeholder="Enter your second 15-digit IMEI number"
                            required
                        />
                    </div>
                    <br />
                    <div className="margin0auto">
                        <button type="submit" className="btn btn-primary">
                            Add Device
                        </button>
                    </div>
                </form>
                <br />
                <br />
            </div>
        );
    }
}

export default DeviceAdd;
