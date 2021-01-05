import React from "react";
import { Icon } from "semantic-ui-react";
const Auth = () => {
  return (
    <div>
      <div
        className="ui main text container segment"
        style={{ marginTop: "80px" }}
      >
        <h1 style={{ textAlign: "center" }}>Welcome To Order Tracker</h1>
        <a href="http://localhost:3002/google">
          <button style={{ marginLeft: "36%" }} className="ui blue button">
            <Icon disabled name="google" /> Sign in with Google
          </button>
        </a>
      </div>
    </div>
  );
};

export default Auth;
