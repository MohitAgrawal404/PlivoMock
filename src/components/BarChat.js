import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setChat } from './features/chatSlice';
import {db} from '../config/firebase';
import { collection, orderBy, onSnapshot, query} from "firebase/firestore"; 
import './ConversationBar.css'
export const BarChat = ({ id, chatName}) => {

    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([])
    
    useEffect(() => {

        onSnapshot(query(collection(db, 'chats', id,'messages'), orderBy("timestamp", "desc")), 
        (snapshot) => {
            setChatInfo(snapshot.docs.map(
                (doc) => doc.data()))
        });

    },[id])

    return(
        <div className = "sidebarChat" onClick = { () => {
            dispatch(
                setChat({
                    chatId: id,
                    chatName: chatName
                })
            )
        }}>
            <div className = "sidebarChat__info">
                <h3>
                    {chatName} 
                </h3>
                <p>{chatInfo[0]?.message}</p>
            </div>
            

        </div>
    )
}