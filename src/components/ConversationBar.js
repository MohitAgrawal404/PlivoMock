import React from 'react';
import { useSelector } from 'react-redux';

export const ConversationBar = () => {

    const addChat = () =>{
        const chatName = useSelector(selectUser);
        if(chatName){
             db.collection('chats').add({
                chatName: chatName
            })
        }
    }

    return (
        <div>
            Conversation
            <button onClick = {addChat}>
                Add Chat
            </button>
        </div>
    )
}