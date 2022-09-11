import React, { useState } from "react";
import Axios from "axios";
import "./SMS.css";
export default function SMS() {
  const [recipient, setRecipient] = useState("");
  const [textmessage, settextmessage] = useState("");

  const sendText = (e) => {
    // const recipientInput = document.getElementById("recipient");
    // const textmessageInput = document.getElementById("textmessage");

    // recipientInput.value = "";
    // textmessageInput.value = "";
    console.log("send");
    Axios.get(
      `http://localhost:4003/send-text?recipient=${recipient}&textmessage=${textmessage}`
    ).catch((err) => {
      console.log(err);
    });
  };
  return (
    <div className="sms-container">
      <h3>Send Text Message</h3>
      <label>Phone Number</label>
      <input
        id="recipientInput"
        onChange={(e) => {
          setRecipient(e.target.value);
        }}
      ></input>
      <label>Message</label>
      <textarea
        id="textmessage"
        onChange={(e) => settextmessage(e.target.value)}
      ></textarea>
      <button onClick={(e) => sendText(e)}>Send Text</button>
    </div>
  );
}
