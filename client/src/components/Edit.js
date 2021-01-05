import axios from "axios";
import React, { Component } from "react";
import FormEdit from "./FormEdit";
class Edit extends Component {
  state = { id: "", user: null };
  componentDidMount() {
    let path = window.location.href;
    let id = path.split("=")[1].toString();
    axios
      .get(`/order/${id}`)
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ id: id });
  }

  render() {
    let form = this.state.user ? (
      <FormEdit key={this.state.id} content={this.state} />
    ) : (
      <p>Loading...</p>
    );
    return <div>{form}</div>;
  }
}

export default Edit;
