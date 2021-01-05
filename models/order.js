let mongoose = require("mongoose");

let order = new mongoose.Schema({
    customer_name: String,
    customer_email: String,
    product: String,
    quantity:Number,
  });
  let Order = mongoose.model("Order", order);
  module.exports = Order;