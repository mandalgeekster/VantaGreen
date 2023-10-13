import React, { Component } from "react";

import "./App.css"
import MintCards from "./MintCards"
import MintButton from "./MintButton"

class Mint extends Component {
    render() {
        return (
            <div className="container">
                {
                    this.props.show_graphs
                    ? <h1 className="h1-redhat margin0auto">Looks like everything's tip-top. Here's your reward: mint an NFT!</h1>
                    : null
                }
                {
                    this.props.show_graphs
                    ? <MintButton
                        update_show_graphs={ this.props.update_show_graphs }
                        update_show_mint={ this.props.update_show_mint }
                      />
                    : null
                }
                <br/>
                <br/>
                <br/>
                <br/>
                {
                    this.props.show_mint && !this.props.loading
                    ? <MintCards 
                        handleonclick={ this.props.handleonclick }
                        is_owned={ this.props.is_owned }
                      />
                    : null
                }
                
            </div>
        )
    }
}

export default Mint;