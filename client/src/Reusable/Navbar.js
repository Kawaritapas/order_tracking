import React, { Component } from "react";
import axios from "axios";

class Navbar extends Component {
  state = { user: null };
  componentDidMount() {
    axios({
      method: "get",
      url: "/user",
    })
      .then((res) => {
        if (res && res.data) {
          this.setState({ user: res.data });
        }
      })
      .catch((err) => {
        console.log({ error: err.message });
      });
  }
  handleLogout = (e) => {
    e.preventDefault();
    axios
      .get("/logout")
      .then((res) => {
        window.location = "http://localhost:3000/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    setTimeout(() => {
      if (!this.state.user) {
        window.location = "/";
      }
    }, 10);
    let menu = this.state.user ? (
      <div
        class="ui vertical menu"
        style={{ backgroundImage: "linear-gradient(blue,black)" }}
      >
        <a class="item">
          <img
            class="ui small circular image"
            src={this.state.user._json.picture}
          />
        </a>
        <a class="item">
          <h4 class="ui header" style={{ color: "white" }}>
            Name
          </h4>
          <p style={{ color: "white" }}>{this.state.user.displayName}</p>
        </a>
        <a class="item">
          <h4 class="ui header" style={{ color: "white" }}>
            Email
          </h4>
          <p style={{ color: "white" }}>{this.state.user._json.email}</p>
          <button onClick={this.handleLogout} className="ui red button">
            Logout
          </button>
        </a>
      </div>
    ) : (
      <p>Loading...</p>
    );
    return <div style={{ marginTop: "100px" }}>{menu}</div>;
  }
}

export default Navbar;
