import React, {useState, useEffect} from 'react'; 
import {db} from '../config/firebase';
import { setChat } from './features/chatSlice';
import { useDispatch } from 'react-redux'
import { MessageCustomer } from './MessageCustomer';
import FlipMove from 'react-flip-move';
import { setDoc, onSnapshot, query, collection, orderBy, doc, addDoc, getDocs } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { selectChatId, selectChatName } from './features/chatSlice';
import { useSelector } from 'react-redux';
import PhotoSend from './fileSending';
import './MessageView.css';


export const Customer = () => {

    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
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


    const onHandleSubmit = async (event) => {
        event.preventDefault();
        setActive(true);
        const chatName = name;

        
        const d = await addDoc(collection(db, 'chats'), {
            chatName: chatName
        })

        console.log(d.id)

        dispatch(
            setChat({
                chatId: d.id,
                chatName: chatName
            })
        )
    }

    const sendMessage = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'chats', chatId,'messages'), {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: "Anonymous",
            email: email,
            displayName: name

        });
        setInput("");
        setChange(!change);
    }
    

    return (
        <div>
            {!active ? 
            (<div> 
                <p>
                    Welcome to Contacto!
                </p>
                <p>
                    Please put your name and email address to chat with one of our service representatives
                </p>
                <form onSubmit = {onHandleSubmit}>
                    <label>
                        Name: 
                        <input type = "text" name = "Name" onChange = {(e) => setName(e.target.value)}/>
                    </label>
                    <label>
                        Email: 
                        <input type = "text" name = "Email" onChange = {(e) => setEmail(e.target.value)}/>
                    </label>
                    <input type="submit" />

                </form>
            </div>
            )
            
            :
            
            (<div className = "chat"> 
                <div className = "chat__header">
                    <h4>
                        <span className='chat__channelName'>
                            Customer Service
                        </span>
                    </h4>
                </div>
                <div className='chat__messages'>
                    <FlipMove> 
                        {messages.map(({id, data}) => (
                            <MessageCustomer key = {id} contents = {data} />
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
            }
        </div>
    )

}