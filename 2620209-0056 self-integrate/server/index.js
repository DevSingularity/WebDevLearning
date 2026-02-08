import express from "express";

const app = express();

const PORT = 5000;

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// above is needed when no proxy set

app.use("/api/hello", (req, res) => {
  res.json({ message: `This is a custom message from port: ${PORT}` });
});

app.use("/api", (req, res) => {
  res.json("The server is running");
});

app.listen(PORT, (req, res) => {
  console.log(`The server is running on ${PORT}`);
});
