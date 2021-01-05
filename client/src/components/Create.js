import axios from "axios";
import React, { Component } from "react";
import Navbar from "../Reusable/Navbar";

class Create extends Component {
  state = { customer_name: "", customer_email: "", product: "", quantity: 0 };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  submitForm = (e) => {
    e.preventDefault();
    var user = {
      customer_name: this.state.customer_name,
      customer_email: this.state.customer_email,
      product: this.state.product,
      quantity: this.state.quantity,
    };
    axios
      .post("/create", user)
      .then((res) => {
        alert("successfully added new record");
        window.location = "/home";
      })
      .catch((err) => {
        console.log(err);
        alert("you are not authorized please sign in");
        window.location = "/home";
      });
  };
  render() {
    return (
      <div style={{ backgroundColor: "orange", height: "600px" }}>
        <h1 style={{ textAlign: "center" }}>Add Customer</h1>
        <div
          className="ui main text container segment"
          style={{ marginTop: "30px" }}
        >
          <form className="ui form" onSubmit={this.submitForm}>
            <div className="field">
              <label>Customer Name</label>
              <input
                name="customer_name"
                defaultValue={this.state.customer_name}
                placeholder="enter customer name"
                type="text"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Customer Email</label>
              <input
                name="customer_email"
                placeholder="enter customer email"
                type="email"
                defaultValue={this.state.customer_email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div class="field">
              <label>Product</label>
              <select
                class="ui fluid dropdown"
                onChange={this.handleChange}
                name="product"
              >
                <option value="choose product">Choose Product</option>
                <option name="product" value="Product 1">
                  Product 1
                </option>
                <option name="product" value="Product 2">
                  Product 2
                </option>
                <option name="product" value="Product 3">
                  Product 3
                </option>
                <option name="product" value="Product 4">
                  Product 4
                </option>
              </select>
            </div>
            <div className="field">
              <label>Quantity</label>
              <input
                name="quantity"
                defaultValue={this.state.quantity}
                placeholder="enter product quantity "
                type="number"
                onChange={this.handleChange}
                required
              />
            </div>
            <button className="ui primary button" type="submit">
              submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
