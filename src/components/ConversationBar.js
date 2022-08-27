import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {BarChat} from './BarChat';
import { selectUser } from './features/userSlice';
import { db, auth } from '../config/firebase'
import { collection, doc, setDoc, onSnapshot, addDoc } from "firebase/firestore"; 


export const ConversationBar = () => {

    const user = useSelector(selectUser)
    const [chats, setChats] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, 'chats'), (snapShot) => {
            setChats(snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const addChat = () => {
        const chatName = "temp";
        if(chatName){
            addDoc(collection(db, 'chats'), {
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
            <div>
                { chats.map(({ id, data: { chatName }}) => (
                    <BarChat
                        key = {id}
                        id = {id}
                        chatName = {chatName}
                    />
                ))}
            </div>
        </div>
    )
}