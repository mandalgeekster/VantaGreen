import React, { Component, MouseEvent } from "react";

import "./App.css";

interface MintButtonProps {
  update_show_graphs: (value: boolean) => void;
  update_show_mint: (value: boolean) => void;
}

class MintButton extends Component<MintButtonProps> {
  render() {
    return (
      <>
        <br />
        <div className="button-container">
          <button
            type="submit"
            className="btn btn-primary"
            id="mint-button"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              this.props.update_show_graphs(false);
              this.props.update_show_mint(true);
              event.preventDefault();
            }}
          >
            Mint
          </button>
        </div>
      </>
    );
  }
}

export default MintButton;
