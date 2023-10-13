import React, { Component } from "react";

import "./App.css";

interface MintCardTextProps {
  is_owned: boolean;
  id: string;
  handleonclick: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

class MintCardText extends Component<MintCardTextProps> {
  render() {
    return (
      <div>
        {this.props.is_owned ? (
          <h1 className="h1-redhat" style={{ fontSize: "20px" }}>You already own this</h1>
        ) : (
          <h1 className="h1-redhat" style={{ fontSize: "20px" }}>Available for minting</h1>
        )}
        {this.props.is_owned ? (
          <button className="btn btn-danger" disabled>
            Mint Now
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={(event) => {
              this.props.handleonclick(event, this.props.id);
            }}
          >
            Mint Now
          </button>
        )}
      </div>
    );
  }
}

export default MintCardText;
