import React, { PureComponent } from "react";
import config from "./Constants";

class OrgChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      users: [],
      consolidatedTeams: [],
      standaloneTeams: [],
      channels: [],
    };
  }

  componentDidMount() {
    this.getConsolidatedTeams();
    this.getStandaloneTeams();
    this.getChannels();
    this.getUsers();
  }

  getStandaloneTeams() {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");

    fetch(config.STANDALONE_TEAMS_URL, {
      mode: "cors",
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: true,
              standaloneTeams: result,
            },
            () => {
              console.log(this.state);
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  getConsolidatedTeams() {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");

    fetch(config.PRIMARY_CONSOLIDATED_TEAMS_URL, {
      mode: "cors",
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: true,
              consolidatedTeams: result,
            },
            () => {
              console.log(this.state);
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  getChannels() {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");

    fetch(config.CHANNELS_URL, {
      mode: "cors",
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            channels: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  getUsers() {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");

    fetch(config.USERS_URL, {
      mode: "cors",
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: true,
              users: result,
            },
            () => {
              console.log(this.state);
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  renderDirects(directs) {
    return directs.map((direct) => {
      return (
        <div>
          <p>
            <small>
              <b>ID : </b> {direct.id} <b> Name : </b> {direct.name}
            </small>
          </p>
        </div>
      );
    });
  }

  renderSubTeams(team, consolidated) {
    const divStyle = {
      backgroundColor: "slategrey",
      marginLeft: "13%",
      marginRight: "20%",
      marginTop: "3%",
      padding: "3%",
    };
    const pStyle = {
      backgroundColor: "lightgrey",
      padding: "2%",
    };
    if (!consolidated) {
      return;
    }
    const consolidatedTeams = team.consolidated_teams;
    return consolidatedTeams.map((team) => {
      console.log(team);
      return (
        <div style={divStyle}>
          <p style={pStyle}>
            <b>Non Main Consolidated Team </b>
          </p>
          <p>
            {" "}
            <b>Team Name :</b> {team.name}
          </p>
          <p>
            {" "}
            <b>ID :</b>
            {team.id}
          </p>
          <p>
            <b>Directs</b>
          </p>
          {this.renderDirects(team.directs)}
        </div>
      );
    });
  }

  renderTeam(team, consolidated) {
    const main = consolidated ? "Main" : "";
    const teamStyle = {
      backgroundColor: "darkgrey",
      marginLeft: "5%",
      marginRight: "10%",
      padding: "3%",
    };

    return (
      <>
        <div style={teamStyle}>
          <p>
            {" "}
            <b> {main} Team Name</b> - {team.name}
          </p>
          <p> Team ID: {team.id}</p>
          <p>
            <b>Manger</b> - {team.manager.id} - {team.manager.name}
          </p>
          <p>
            <b>Directs</b>
          </p>
          {this.renderDirects(team.directs)}
        </div>
        {this.renderSubTeams(team, consolidated)}
      </>
    );
  }

  renderStandaloneChannels() {
    const { standaloneTeams } = this.state;
    const divStyle = {
      backgroundColor: "lightgrey",
      marginLeft: "5%",
      marginRight: "40%",
      marginTop: "5%",
      marginBottom: "5%",
      padding: "3%",
    };
    const headerStyle = {
      marginLaft: "1%",
      backgroundColor: "white",
      padding: "5%",
    };

    const h1Style = {
      marginRight: "6%",
      backgroundColor: "#00264d",
      padding: "6%",
      color: "white",
      fontSize: "20px",
    };

    const h4Style = {
      marginRight: "8%",
      backgroundColor: "white",
      padding: "2%",
      marginLeft: "3%",
      color: "black",
    };

    return standaloneTeams.map((team) => (
      <>
        <div style={divStyle}>
          <h1 style={headerStyle}>
            <h1 style={h1Style}>
              Channel ID "{team.channel}" - Team/User Info
            </h1>
            <h4 style={h4Style}>Standalone Teams</h4>
            {this.renderTeam(team, false)}
          </h1>
        </div>
      </>
    ));
  }

  renderConsolidatedChannels() {
    const { consolidatedTeams } = this.state;
    const divStyle = {
      backgroundColor: "lightgrey",
      marginLeft: "5%",
      marginRight: "40%",
      marginTop: "5%",
      marginBottom: "5%",
      padding: "3%",
    };
    const headerStyle = {
      marginLeft: "1%",
      backgroundColor: "white",
      padding: "5%",
    };

    const h1Style = {
      marginRight: "6%",
      backgroundColor: "#00264d",
      padding: "6%",
      color: "white",
    };

    const h4Style = {
      marginRight: "8%",
      backgroundColor: "white",
      padding: "2%",
      marginLeft: "3%",
      color: "black",
    };

    return consolidatedTeams.map((team) => (
      <>
        <div style={divStyle}>
          <h1 style={headerStyle}>
            <h1 style={h1Style}>
              Channel ID "{team.channel}" - Team/User Info
            </h1>
            <h4 style={h4Style}>Consolidated Teams</h4>
            {this.renderTeam(team, true)}
          </h1>
        </div>
      </>
    ));
  }

  render() {
    return (
      <section>
        {this.renderConsolidatedChannels()}
        {this.renderStandaloneChannels()}
      </section>
    );
  }
}

export default OrgChart;
