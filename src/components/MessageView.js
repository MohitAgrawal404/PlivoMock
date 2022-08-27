import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import {db} from '../config/firebase';
import firebase from 'firebase/compat/app';
import { selectUser } from './features/userSlice';
import { Message } from './Message';
import { setDoc, onSnapshot, query, collection, orderBy, doc, addDoc } from 'firebase/firestore';

export const MessageView = (() => {

    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatId = useSelector(selectChatId);

    useEffect(() => {
        if(chatId) {
            onSnapshot(query(collection(db, 'chats', chatId,'messages'), orderBy("timestamp", "desc")), 
            (snapshot) => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
                ))
            })
        }
    }, [chatId])
    
    const sendMessage = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'chats', chatId,'messages'), {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName

        });
        setInput("");
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
            <div className ="chat__input">
                <form>
                    <input 
                        value = {input}
                        placeholder = "!message" 
                        type = "text" 
                        onChange = {(e) => setInput(e.target.value)}
                    />
                    <button onClick = {sendMessage}>Send Message</button>
                </form>
            </div>
        </div>
    )
})