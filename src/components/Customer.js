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


    const onHandleSubmit = (event) => {
        event.preventDefault();
        setActive(true);
        const chatName = "In-app Customer";

        
        const d = addDoc(collection(db, 'chats'), {
            chatName: chatName
        })

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
            
            (<div> 
                <div>
                    Customer Service
                </div>
                <div>
                    <FlipMove> 
                        {messages.map(({id, data}) => (
                            <MessageCustomer key = {id} contents = {data} />
                        ))}
                    </FlipMove>
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
            }
        </div>
    )

}