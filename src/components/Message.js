import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './Message.css'
 
export const Message = forwardRef(({ id, contents: {timestamp, message, uid, email, displayName}}, ref) => {
   const user = useSelector(selectUser);
 
 
   return (
      <div ref = {ref} className = {`message ${user.email === email && "message__sender"}`}>
           <p>{message}</p>
       </div>
   )
})
