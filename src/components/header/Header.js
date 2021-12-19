import React, { PureComponent } from "react";

export class Header extends PureComponent {
  render() {
    const headerStyle = {
      backgroundColor: "white",
      padding: "1%",
      marginLeft: "12%",
      fontSize: "48px",
    };
    return <h1 style={headerStyle}>Kona Teams Org Chart</h1>;
  }
}
