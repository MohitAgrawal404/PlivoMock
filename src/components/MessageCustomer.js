import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
 
 
export const MessageCustomer = forwardRef(({ id, contents: {timestamp, message, uid, email, displayName}}, ref) => {
   const user = useSelector(selectUser);
 
 
   return (
      <div ref = {ref} className = {`message ${email === email && "message__sender"}`}>
           <p>{message}</p>
           <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
       </div>
   )
})