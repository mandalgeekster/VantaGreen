import React, { Component } from 'react';
import Web3 from 'web3';
import BigNumber from "bignumber.js";

import Main from "./Main.js"
import Loader from "./Loader.js"
import NavBar from "./NavBar.js"
import Graphs from "./Graphs.js"
import Mint from "./Mint.js"

import './App.css';
import NFTContract from '../abis/NFTContract.json'

import axios from "axios";
import protobuf from "protobufjs";
import moment from "moment";

const PEBBLE_PROTO = `
syntax = "proto2";
message SensorData
{
    optional uint32 snr = 1;
    optional uint32 vbat = 2;
    optional int32 latitude = 3;
    optional int32 longitude = 4;
    optional uint32 gasResistance = 5;
    optional uint32 temperature = 6;
    optional uint32 pressure = 7;
    optional uint32 humidity = 8;
    optional uint32 light = 9;
    optional uint32 temperature2 = 10;
    repeated sint32 gyroscope = 11;
    repeated sint32 accelerometer = 12;
    optional string random = 13;
}

message SensorConfig
{
    optional uint32 bulkUpload = 1;
    optional uint32 dataChannel = 2;
    optional uint32 uploadPeriod = 3;
    optional uint32 bulkUploadSamplingCnt = 4;
    optional uint32 bulkUploadSamplingFreq = 5;
    optional uint32 beep = 6;
    optional string firmware = 7; 
}

message SensorState
{
    optional uint32 state = 1;
}

message SensorConfirm {
    optional string owner = 1;
}

message BinPackage
{
    enum PackageType {
        DATA = 0;
        CONFIG = 1;
        STATE = 2;
    }
    required PackageType type = 1;
    required bytes data = 2;
    required uint32 timestamp = 3;
    required bytes signature = 4;
}

message ConfirmPackage {
    required bytes owner = 1;
    required uint32 timestamp = 2;
    required bytes signature = 3;
    required uint32 channel = 4;
}
`;

class App extends Component {
    state: {
        is_account_connected: boolean;
        account: string | null;
        contract: any;
        nfts: string[];
        contract_nfts: any[];
        device_imei: string;
        nft_count: number;
        loading: boolean;
        show_graphs: boolean;
        show_mint: boolean;
        disable_device_add: boolean;
        pebble_data: any[];
    };

    constructor(props: any) {
        super(props);
        this.state = {
            is_account_connected: false,
            account: null,
            contract: null,
            nfts: ["0"],
            contract_nfts: [],
            device_imei: "100000000000036",
            nft_count: 0,
            loading: false,
            show_graphs: false,
            show_mint: false,
            disable_device_add: false,
            pebble_data: [],
        };

        this.fetch_pebble_data = this.fetch_pebble_data.bind(this);
        this.validate_imei = this.validate_imei.bind(this);
        this.update_loading = this.update_loading.bind(this);
        this.update_disable_device_add = this.update_disable_device_add.bind(this);
        this.update_show_graphs = this.update_show_graphs.bind(this);
        this.update_show_mint = this.update_show_mint.bind(this);

        this.load_temperature_data = this.load_temperature_data.bind(this);
        this.load_gas_data = this.load_gas_data.bind(this);
        this.load_humidity_data = this.load_humidity_data.bind(this);
        this.load_light_data = this.load_light_data.bind(this);

        this.handleonclick = this.handleonclick.bind(this);
        this.is_owned = this.is_owned.bind(this);

        this.mint = this.mint.bind(this);
    }

    update_loading(bool: boolean) {
        this.setState({ loading: bool });
    }

    update_disable_device_add(bool: boolean) {
        this.setState({ disable_device_add: bool });
    }

    update_show_graphs(bool: boolean) {
        this.setState({ show_graphs: bool });
    }

    update_show_mint(bool: boolean) {
        this.setState({ show_mint: bool });
    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Non-Ethereum browser detected. Please install MetaMask.");
        }
    }

    async loadBlockchainData() {
        this.setState({ loading: true });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });

        const network_id = await web3.eth.getChainId();
        switch (network_id.toString()) {
            case "4690":
                this.setState({ is_account_connected: true });
                break;
            default:
                window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: "0x1252",
                            chainName: "IOTEX Testnet",
                            nativeCurrency: {
                                name: "IOTEX",
                                symbol: "IOTX",
                                decimals: 18,
                            },
                            rpcUrls: ["https://babel-api.testnet.iotex.io"],
                            blockExplorerUrls: ["https://testnet.iotexscan.io/"],
                        },
                    ],
                });
                break;
        }

        const network_data = NFTContract.networks[network_id];
        if (network_data) {
            const address = network_data.address;
            const abi = NFTContract.abi;
            const contract = new web3.eth.Contract(abi, address, {
                transactionConfirmationBlocks: 1,
            });
            this.setState({ contract: contract });

            const nft_count = await contract.methods.nft_count().call();
            this.setState({ nft_count: nft_count });
        } else {
            console.error("Network data is undefined");
            window.alert(
                "NFTContract contract not deployed to the detected network. Did you run 'truffle migrate --reset'?"
            );
        }

        this.setState({ loading: false });
    }

    async fetch_pebble_data(imei1: string, imei2: string) {
        const pebble_proto_def = await protobuf.parse(PEBBLE_PROTO).root;
        var data1: any[] = [];
        var data2: any[] = [];
        var data: any[] = [];

        axios({
            method: "GET",
            url: `https://5000-viroy-vantagreen-mzvrpegrqk4.ws-us103.gitpod.io/fetch_data?imei=${imei1}`,
        }).then(async (query_result) => {
            for (var index in query_result.data.data.deviceRecords) {
                const data_point = query_result.data.data.deviceRecords[index];
                const encoded_telemetry = data_point.raw.replace(/0x/g, "");
                const sensor_data = pebble_proto_def.lookupType("SensorData");
                const telemetry = sensor_data.decode(Buffer.from(encoded_telemetry, "hex"));

                data1.push({
                    owner: this.state.account,
                    gyroscope: telemetry.gyroscope,
                    accelerometer: telemetry.accelerometer,
                    snr: telemetry.snr,
                    vbat: telemetry.vbat,
                    latitude: telemetry.latitude,
                    longitude: telemetry.longitude,
                    gasResistance: telemetry.gasResistance,
                    temperature: telemetry.temperature,
                    temperature2: telemetry.temperature2,
                    pressure: telemetry.pressure,
                    humidity: telemetry.humidity,
                    light: telemetry.light,
                    random: telemetry.random,
                    timestamp: parseInt(data_point.timestamp),
                });
            }

            if (data1.length === 0) {
                window.alert(`No data found for IMEI 1: ${imei1}`);
            }

            const first_length = data1.length;

            axios({
                method: "GET",
                url: `http://localhost:5000/fetch_data?imei=${imei2}`,
            }).then(async (query_result) => {
                for (var index in query_result.data.data.deviceRecords) {
                    const data_point = query_result.data.data.deviceRecords[index];
                    const encoded_telemetry = data_point.raw.replace(/0x/g, "");
                    const sensor_data = pebble_proto_def.lookupType("SensorData");
                    const telemetry = sensor_data.decode(Buffer.from(encoded_telemetry, "hex"));

                    data2.push({
                        owner: this.state.account,
                        gyroscope: telemetry.gyroscope,
                        accelerometer: telemetry.accelerometer,
                        snr: telemetry.snr,
                        vbat: telemetry.vbat,
                        latitude: telemetry.latitude,
                        longitude: telemetry.longitude,
                        gasResistance: telemetry.gasResistance,
                        temperature: telemetry.temperature,
                        temperature2: telemetry.temperature2,
                        pressure: telemetry.pressure,
                        humidity: telemetry.humidity,
                        light: telemetry.light,
                        random: telemetry.random,
                        timestamp: parseInt(data_point.timestamp),
                    });
                }

                for (var i = 0; i < data2.length; i += 1) {
                    data1.push(data2[i]);
                }

                data1 = data1.sort((a, b) => {
                    return a.timestamp - b.timestamp;
                });

                for (var i = 0; i < data1.length; i += 1) {
                    data.push({
                        owner: data1[i].owner,
                        gyroscope: data1[i].gyroscope,
                        accelerometer: data1[i].accelerometer,
                        snr: data1[i].snr,
                        vbat: data1[i].vbat,
                        latitude: data1[i].latitude,
                        longitude: data1[i].longitude,
                        gasResistance: data1[i].gasResistance,
                        temperature: data1[i].temperature,
                        temperature2: data1[i].temperature2,
                        pressure: data1[i].pressure,
                        humidity: data1[i].humidity,
                        light: data1[i].light,
                        random: data1[i].random,
                        timestamp: moment.unix(data1[i].timestamp).format("YYYY-MM-DD-HH-mm"),
                    });
                }

                if (data.length === first_length) {
                    window.alert(`No data found for IMEI 2: ${imei2}`);
                }

                this.setState({ pebble_data: data });
                this.setState({ show_graphs: true });
                this.setState({ loading: false });
            }).catch((error) => {
                console.error(`[IMEI Error 2] ${error}`);
            });
        }).catch((error) => {
            console.error(`[Error] ${error}`);
        });
    }

    load_temperature_data() {
        const temp = this.state.pebble_data;
        var temp_data: any[] = [];
        for (var i = 0; i < temp.length; i += 1) {
            var d = temp[i];
            var time = d.timestamp.split("-");
            const year = time[0];
            const month = time[1];
            const date = time[2];
            const hour = time[3];
            const min = time[4];
            const value = d.temperature;

            temp_data.push([
                Date.UTC(year, month, date, hour, min),
                value,
            ]);
        }
        return temp_data;
    }

    load_gas_data() {
        const temp = this.state.pebble_data;
        var temp_data: any[] = [];
        for (var i = 0; i < temp.length; i += 1) {
            var d = temp[i];
            var time = d.timestamp.split("-");
            const year = time[0];
            const month = time[1];
            const date = time[2];
            const hour = time[3];
            const min = time[4];
            const value = d.gasResistance;

            temp_data.push([
                Date.UTC(year, month, date, hour, min),
                value,
            ]);
        }
        return temp_data;
    }

    load_humidity_data() {
        const temp = this.state.pebble_data;
        var res = 0;
        for (var i = 0; i < temp.length; i += 1) {
            res += temp[i].humidity;
        }
        res = Math.trunc(res / temp.length);
        console.log("Average Humidity: ", res);
        return res;
    }

    load_light_data() {
        const temp = this.state.pebble_data;
        var res = 0;
        for (var i = 0; i < temp.length; i += 1) {
            res += temp[i].light;
        }
        res = Math.trunc(res / temp.length);
        console.log("Average Light: ", res);
        return res;
    }

    validate_imei(value: string) {
        let error: string | undefined;
        if (!value) {
            error = "IMEI is required";
        } else if (value.length !== 15) {
            error = "Expected IMEI number to be 15 digits";
        } else if (!(new BigNumber(value).toNumber())) {
            error = "IMEI should only contain digits";
        }
        if (error) {
            error += ". Try again.";
        }
        return error;
    }

    handleonclick(event: React.MouseEvent, id: string) {
        event.preventDefault();
        this.mint(id);
    }

    is_owned(id: string) {
        return this.state.nfts.indexOf(id) > -1;
    }

    async mint(id: string) {
        this.setState({ loading: true });
        console.log(`Minting ${id}...`);
        console.log("This is the Contract: ", this.state.contract);

        const contract = this.state.contract;

        if (contract) {
            try {
                const hello = await contract.methods.mint(id).send({
                    from: this.state.account,
                });
                this.setState({ loading: false });
                this.setState({
                    nfts: [...this.state.nfts, id],
                });
                console.log("Done setting state");
                console.log("Loading now: ", this.state.loading);
            } catch (error) {
                this.setState({ loading: false });
                window.alert("[Transaction Error] ", error);
            }
        } else {
            console.log("OMG, Contract is none");
            console.log("Inside `mint(id)`, contract is ", this.state.contract);
        }

        console.log("At the end of the mint() function");
    }

    render() {
        return (
            <>
                <NavBar account={this.state.account} />
                <div>
                    {this.state.loading ? (
                        <Loader loading={this.state.loading} />
                    ) : (
                        <Main
                            disable_device_add={this.state.disable_device_add}
                            update_loading={this.update_loading}
                            update_disable_device_add={this.update_disable_device_add}
                            fetch_pebble_data={this.fetch_pebble_data}
                            validate_imei={this.validate_imei}
                        />
                    )}
                    {this.state.show_graphs ? (
                        <Graphs
                            load_temperature_data={this.load_temperature_data}
                            load_gas_data={this.load_gas_data}
                            load_humidity_data={this.load_humidity_data}
                            load_light_data={this.load_light_data}
                            pebble_data={this.state.pebble_data}
                        />
                    ) : null}

                    <Mint
                        update_show_graphs={this.update_show_graphs}
                        show_graphs={this.state.show_graphs}
                        update_show_mint={this.update_show_mint}
                        show_mint={this.state.show_mint}
                        loading={this.state.loading}
                        handleonclick={this.handleonclick}
                        is_owned={this.is_owned}
                    />
                </div>
            </>
        );
    }
}

export default App;
