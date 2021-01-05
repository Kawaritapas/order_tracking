import axios from "axios";
import React, { Component } from "react";

class FormEdit extends Component {
  state = { customer_name: "", customer_email: "", product: "", quantity: 0 };
  componentDidMount() {
    const {
      customer_name,
      customer_email,
      product,
      quantity,
    } = this.props.content.user;
    this.setState({
      customer_name: customer_name,
      customer_email: customer_email,
      product: product,
      quantity: quantity,
    });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitForm = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let id = this.props.content.id;
    console.log(this.state);
    var user = {
      customer_name: this.state.customer_name,
      customer_email: this.state.customer_email,
      product: this.state.product,
      quantity: this.state.quantity,
    };
    axios
      .post(`/edit/${id}`, user)
      .then((res) => {
        console.log(res.data);
        alert("updated successfully");
        window.location = "http://localhost:3000/home";
      })
      .catch((err) => {
        console.log(err);
        alert("you are not authorized please sign in");
        window.location = "/home";
      });
  };

  render() {
    return (
      <div style={{ backgroundColor: "yellow", height: "600px" }}>
        <h1 style={{ textAlign: "center" }}>Edit Customer Details</h1>
        <div
          className="ui main text container segment"
          style={{ marginTop: "30px" }}
        >
          <form className="ui form" onSubmit={this.submitForm}>
            <div className="field">
              <label>Customer Name</label>
              <input
                name="customer_name"
                defaultValue={this.props.content.user.customer_name}
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
                type="email"
                placeholder="enter customer email"
                defaultValue={this.props.content.user.customer_email}
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
                defaultValue={this.props.content.user.quantity}
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

export default FormEdit;
