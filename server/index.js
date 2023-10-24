const express = require("express");
const app = express();
const userRouter = require("./routes/userRote");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/user", userRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

const port = process.env.PORT || 5000;

app.listen(port, (req, res)=>{
    console.log(`Server app listening at http://localhost:${port}`);
});
