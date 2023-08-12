import React, { Component } from "react";

import "./App.css"

class MintButton extends Component {
    render() {
        return (
            <>
            <br/>
                <div className="button-container">
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        id="mint-button"
                        onClick={ (event) => {
                                this.props.update_show_graphs(false)
                                this.props.update_show_mint(true)
                                event.preventDefault()
                            }
                        }
                    >
                        Mint
                    </button>
                </div>
            </>
        )
    }
}

export default MintButton;