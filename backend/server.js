import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// connect to mongoose
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/ARepoxyart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//components
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.get("/", (req, res) => {
  res.send("Server-ul rulează");
});

// error catcher
app.use((err, req, res, next) => {
  res.status(500).send({ meessage: err.message });
});

//binding port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servește la http://localhost:${port}`);
});
