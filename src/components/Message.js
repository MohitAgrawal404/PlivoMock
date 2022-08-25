import React from 'react';

export const Message = (({ id, data: {timestamp, displayName, email, uid, message}}, ref) => {

    const user = useSelector(selectUser);


    return (
       <div ref = {ref} className = {`message ${user.email === email && "message__sender"}`}>
            <p>{message}</p>
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
    )
})