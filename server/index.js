const express = require("express");
const cors = require("cors");
// const twilio = require("twilio")(sid);

const accountSid = "ACecaca25eb3d7db1d9c595a901709acd7";
const authToken = "2ca1ced35d9351cea884c0f43f3381fa";
const twilio = require("twilio")(accountSid, authToken);
// const client = new twilio(accountSid, authToken);

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

app.get("/send-text", (req, res) => {
  const { recipient, textmessage } = req.query;

  twilio.messages
    .create({
      body: textmessage,
      to: "+1" + recipient,
      from: "+18314801108",
    })
    .then((message) => {
      console.log(message.body);
    });
});

app.listen(4001, () => {
  console.log("Running on Port 4000");
});
