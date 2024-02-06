const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const stripeRouter = require("./routes/stripe");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

//connection
connectMongoDb(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!!"))
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware - Plugin
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);


app.listen(PORT, () => console.log(`Server Starts at PORT:${PORT}`));
