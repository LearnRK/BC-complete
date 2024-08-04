const express = require("express");
const cors = require("cors");
const { router } = require("./charts");
const { Message } = require("./db");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  return res.json({ msg: "successfully conneced to the server" });
});

app.post("/appointme", async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    await Message.create(body);
  } catch (error) {
    console.log("failed to create message -> ", error);
    return res.status(500).json({ msg: "failed to create message" });
  }
  return res.status(200).json({ msg: "message sent successfully" });
});

app.listen(port);
