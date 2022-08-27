import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { UserAuth } from '../context/AuthContext';
import { addDoc } from "firebase/firestore";
import { emailCollection } from '../config/firebase';
import { async } from '@firebase/util';


export default function Contact(handleEmail) {

  const form = useRef();
  const { user } = UserAuth()

  const sendEmail = async (e) => {
    e.preventDefault();
    emailjs.sendForm('service_nch5z1m', 'template_d4pw78o', form.current, '-HxLRBDaoyOHPAx85')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    addDoc(emailCollection, {
      name: form.current[0].value,
      email: form.current[1].value,
      subject: form.current[2].value,
      message: form.current[3].value
    })
    window.location.reload()
  };
  

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div class="form-group">
        <label for="nameInput">Name</label>
        <input type="text" class="form-control" id="nameInput" name="user_name" required/>
      </div>
      <div class="form-group">
        <label for="emailInput">Email</label>
        <input type="email" class="form-control" id="emailInput" name="email" required/>
      </div>
      <div class="form-group">
        <label for="subjectInput">Subject</label>
        <input type="text" class="form-control" id="subjectInput" name="subject" required/>
      </div>
      <div class="form-group">
        <label for="messageInput">Message</label>
        <input type="text" class="form-control" id="messageInput" name="message" required/>
      </div>
      <button type="submit" class="btn btn-primary mb-2">Send</button>
    </form>
  );
}