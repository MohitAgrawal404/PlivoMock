import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { UserAuth } from '../context/AuthContext';
import { addDoc } from "firebase/firestore";
import { emailCollection } from '../config/firebase';
import { async } from '@firebase/util';


export const Contact = ({name, email}) => {

  const form = useRef();
  const { user } = UserAuth()
  console.log(name)
  console.log(email)

  const sendEmail = async (e) => {
    e.preventDefault();
    emailjs.sendForm('service_nch5z1m', 'template_d4pw78o', form.current, '-HxLRBDaoyOHPAx85')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    window.location.reload()
  };
  

  return (
    <form ref={form} onSubmit={sendEmail}>
      {/* <div class="form-group">
        <label for="nameInput">Name</label>
        <input type="text" class="form-control" id="nameInput" name="user_name" required/>
      </div> */}
      {/* <div class="form-group">
        <label for="emailInput">Email</label>
        <input type="email" class="form-control" id="emailInput" name="email" required/>
      </div> */}
      <input type="hidden" name="user_name" value={name} />
      <input type="hidden" name="email" value={email}/>
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