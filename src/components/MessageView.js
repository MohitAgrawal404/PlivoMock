import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import db from '../config/firebase';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';
import { Message } from './Message';

export const MessageView = () => {

    const user = useSelector(selectUser)
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)

    useEffect(() => {
        if(chatId) {
            db.collection('chats').doc(chatId).collection('messages').orderBy("timestamp", "desc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }
    }, [chatId])
    
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName

        })
        setInput("")
    }
    return (
        <div>
            <div>
                Customer Service
            </div>
            <div>
                {messages.map(({id, data}) => {
                    <Message id = {id} data = {data} />
                })}
            </div>
        </div>
    )
}