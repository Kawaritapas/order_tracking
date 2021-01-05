import React, { Component } from "react";
import axios from "axios";
import Navbar from "../Reusable/Navbar";
import { Pagination, Icon } from "semantic-ui-react";

class App extends Component {
  state = { orders: null, page: 1, query: null };
  componentDidMount() {
    axios({
      method: "get",
      url: `/orders?page=${this.state.page}&limit=7`,
    })
      .then((res) => {
        if (res && res.data) {
          this.setState({ orders: res.data });
        }
      })
      .catch((err) => {
        console.log({ error: err.message });
      });
  }

  handlePageChange = (e) => {
    e.preventDefault();
    let page = e.target.attributes.value.nodeValue;
    this.setState({ page: page });
    axios({
      method: "get",
      url: `/orders?page=${this.state.page}&limit=7`,
    })
      .then((res) => {
        if (res && res.data) {
          this.setState({ orders: res.data });
        }
      })
      .catch((err) => {
        console.log({ error: err.message });
      });
  };
  searchChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ query: e.target.value });
  };
  handleForm = (e) => {
    e.preventDefault();
    axios({
      method: "get",
      url: `/orders?search=${this.state.query}`,
    })
      .then((res) => {
        if (res) {
          console.log(res.data);
          this.setState({ orders: res.data });
        }
      })
      .catch((err) => {
        console.log({ error: err.message });
      });
  };
  handleDelete = (e) => {
    e.preventDefault();
    axios
      .post(`/delete/${e.target.value}`)
      .then((res) => {
        alert("deleted successfully");
        window.location = "/home";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleEdit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    window.location = `http://localhost:3000/edit/id=${e.target.value}`;
  };
  render() {
    let order = this.state.orders ? (
      this.state.orders.map((order) => (
        <tbody>
          <tr>
            <td>
              <button
                className="ui tiny red button"
                onClick={this.handleDelete}
                value={order._id}
              >
                <i className="trash alternate icon"></i>
              </button>
            </td>
            <td>
              <button
                className="ui tiny green button"
                onClick={this.handleEdit}
                value={order._id}
              >
                <i className="edit icon"></i>
              </button>
            </td>
            <td>{order._id}</td>
            <td>{order.customer_name}</td>
            <td>{order.customer_email}</td>
            <td>{order.product}</td>
            <td>{order.quantity}</td>
          </tr>
        </tbody>
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <div
        style={{
          height: "auto",
          backgroundImage: "linear-gradient(teal,black)",
          minHeight: "600px",
        }}
      >
        <div class="ui three column grid">
          <div class="column" style={{ marginLeft: "35px" }}>
            <Navbar />
          </div>
          <div class="column">
            <div className="ui container">
              <form onSubmit={this.handleForm} style={{ marginTop: "40px" }}>
                <input
                  onChange={this.searchChange}
                  name="search"
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderTop: "aqua",
                    border: "black",
                  }}
                  placeholder="Search by name..."
                  type="text"
                ></input>
                <button
                  style={{ zindex: "1", padding: "7px", borderRadius: "0%" }}
                  class="ui primary button"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <table class="ui  selectable inverted  celled table">
                <thead>
                  <tr>
                    <th class="single line">Delete</th>
                    <th>Edit</th>
                    <th>Order id</th>
                    <th>customer name</th>
                    <th>customer email</th>
                    <th>customer product</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                {order}
              </table>
              <Pagination
                style={{ backgroundColor: "grey" }}
                boundaryRange={0}
                defaultActivePage={1}
                onPageChange={this.handlePageChange}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={5000}
              />
              <a href="/create">
                <button
                  style={{ float: "right", width: "150px" }}
                  className="ui  teal button"
                >
                  Create
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
