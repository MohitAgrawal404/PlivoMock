const express = require("express");
const cors = require("cors");
// const twilio = require("twilio")(sid);

const accountSid = "ACecaca25eb3d7db1d9c595a901709acd7";
const authToken = "32111758a0f18e8d6cae242e7cd9667c";
const twilio = require("twilio")(accountSid, authToken);
// const client = new twilio(accountSid, authToken);

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

app.get("/send-text", (req, res) => {
  const { recipient, textmessage } = req.query;
  console.log("a");
  twilio.messages
    .create({
      body: textmessage,
      to: "+1" + recipient,
      from: "+18314801108",
    })
    .then((message) => {
      console.log("sented");
      console.log(message.body);
    });
});

app.listen(4003, () => {
  console.log("Running on Port 4000");
});
