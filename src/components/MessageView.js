import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import {db} from '../config/firebase';
import firebase from 'firebase/compat/app';
import { selectUser } from './features/userSlice';
import { Message } from './Message';
import { setDoc, onSnapshot, query, collection, orderBy, doc, addDoc, getDocs } from 'firebase/firestore';
import FlipMove from 'react-flip-move';
import './MessageView.css';
import PhotoSend from './fileSending';

export const MessageView = (() => {

    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [change, setChange] = useState(true);
    const chatId = useSelector(selectChatId); 

    useEffect(() => {
        if(chatId) {
            (async () => {
                const q = query(collection(db, 'chats', chatId,'messages'), orderBy("timestamp"));
                const querySnapshot = await getDocs(q);
                if (querySnapshot != null) {
                    let temp = [];
                    querySnapshot.forEach(
                    (snapshot) => {
                        
                        temp.push({
                            id: snapshot.id,
                            data: snapshot.data()
                        })
                        
                    })
                    setMessages(temp);
                    console.log(messages);
                    console.log(chatId);
                }
            })();
            return () => {
            }  
        }
    }, [chatId, change])
    
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
        setChange(!change);
    }
    
    return (
        <div className = "chat">
            <div className = "chat__header">
                <h4>
                    <span className='chat__channelName'>
                        In-App Customer
                    </span>
                </h4>
                
            </div>
            <div className='chat__messages'>
                <FlipMove> 
                    {messages.map(({id, data}) => (
                        <Message key = {id} contents = {data} />
                    ))}
                </FlipMove>
            </div>
            <div className ="chat__input">
                <form onSubmit={sendMessage}>
                    <input 
                        value = {input}
                        placeholder = "send message" 
                        type = "text" 
                        onChange = {(e) => setInput(e.target.value)}
                    />
                    <button onClick = {sendMessage}>Send Message</button>
                </form>
                <PhotoSend/>
            </div>
        </div>
    )
})