import React, { Component } from "react";
import MintCardText from "./MintCardText";

import "./App.css";

interface MintCardsProps {
  is_owned: (id: string) => boolean;
  handleonclick: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

class MintCards extends Component<MintCardsProps> {
  render() {
    return (
      <div className="container">
        <h1 className="h1-inter margin0auto mint-overview">Available NFTs:</h1>
        <br />
        <br />
        <div className="mint-row">
          <div className="mint-column">
            <div className="mint-card">
              <img className="card-img-top" src="http://localhost:5000/0.png" alt="Steak" />
              <div className="card-body">
                <h1 className="h1-inter" style={{ fontSize: "35px" }}>Steak</h1>
                <MintCardText
                  is_owned={this.props.is_owned("0")}
                  id="0"
                  handleonclick={this.props.handleonclick}
                />
              </div>
            </div>
          </div>
          <div className="mint-column">
            <div className="mint-card">
              <img className="card-img-top" src="http://localhost:5000/1.png" alt="Burger" />
              <div className="card-body">
                <h1 className="h1-inter" style={{ fontSize: "35px" }}>Burger</h1>
                <MintCardText
                  is_owned={this.props.is_owned("1")}
                  id="1"
                  handleonclick={this.props.handleonclick}
                />
              </div>
            </div>
          </div>
          <div className="mint-column">
            <div className="mint-card">
              <img className="card-img-top" src="http://localhost:5000/2.png" alt="Spread" />
              <div className="card-body">
                <h1 className="h1-inter" style={{ fontSize: "35px" }}>Spread</h1>
                <MintCardText
                  is_owned={this.props.is_owned("2")}
                  id="2"
                  handleonclick={this.props.handleonclick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* New Row */}
        <br />
        <br />

        <div className="mint-row">
          <div className="mint-column">
            <div className="mint-card">
              <img className="card-img-top" src="http://localhost:5000/3.png" alt="Lemons" />
              <div className="card-body">
                <h1 className="h1-inter" style={{ fontSize: "35px" }}>Lemons</h1>
                <MintCardText
                  is_owned={this.props.is_owned("3")}
                  id="3"
                  handleonclick={this.props.handleonclick}
                />
              </div>
            </div>
          </div>
          <div className="mint-column">
            <div className="mint-card">
              <img className="card-img-top" src="http://localhost:5000/4.png" alt="Wine" />
              <div className="card-body">
                <h1 className="h1-inter" style={{ fontSize: "35px" }}>Wine</h1>
                <MintCardText
                  is_owned={this.props.is_owned("4")}
                  id="4"
                  handleonclick={this.props.handleonclick}
                />
              </div>
            </div>
          </div>
          <div className="mint-column">
            <div className="mint-card">
              <img className="card-img-top" src="http://localhost:5000/5.png" alt="Cookies" />
              <div className="card-body">
                <h1 className="h1-inter" style={{ fontSize: "35px" }}>Cookies</h1>
                <MintCardText
                  is_owned={this.props.is_owned("5")}
                  id="5"
                  handleonclick={this.props.handleonclick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MintCards;
