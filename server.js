let express = require("express");
let app = express();
let mongoose = require("mongoose");
let Order = require("./models/order");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
let cookieSession = require("cookie-session");
let passport = require("passport");
require("./passport_setup");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/order_tracker");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "order-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//authentication apis
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
app.get("/failed", function (req, res) {
  res.send("failed");
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("http://localhost:3000/home");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

//order apis
app.get("/orders", isLoggedIn, function (req, res) {
  if (req.query.search) {
    console.log(req.query.search);
    let regex = new RegExp(Regex(req.query.search));
    Order.find({ customer_name: regex }, function (err, data) {
      if (err) {
        res.status(400).json({ error: "error getting the orders" });
      } else {
        res.status(200).json(data);
      }
    });
  } else {
    Order.find()
      .sort({ _id: -1 })
      .find(function (err, data) {
        if (err) {
          res.status(400).json({ error: "error getting the orders" });
        } else {
          const page = req.query.page;
          const limit = req.query.limit;

          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;

          const resultData = data.slice(startIndex, endIndex);
          res.status(200).json(resultData);
        }
      });
  }
});

app.post("/create", isLoggedIn, (req, res) => {
  let customer_name = req.body.customer_name;
  let customer_email = req.body.customer_email;
  let product = req.body.product;
  let quantity = req.body.quantity;
  Order.create(
    {
      customer_name: customer_name,
      customer_email: customer_email,
      product: product,
      quantity: quantity,
    },
    function (err, data) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    }
  );
});

app.get("/order/:id", function (req, res) {
  Order.findById(req.params.id, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});
app.get("/edit/:id", isLoggedIn, function (req, res) {
  Order.findById(req.params.id, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});
app.post("/edit/:id", function (req, res) {
  Order.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) {
      res.status(400).json({ error: "error while editing" });
    } else {
      res.status(200).json({ message: "successfully updated" });
    }
  });
});

app.post("/delete/:id", function (req, res) {
  Order.findByIdAndDelete(req.params.id, function (err, data) {
    if (err) {
      res.status(400).json({ error: "could not delete the error" });
    } else {
      res.status(200).json({ message: "deleted successfully" });
    }
  });
});

app.get("/user", function (req, res) {
  res.status(200).json(req.user);
});

function Regex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
app.listen(3002, function (req, res) {
  console.log("server is starting");
});
