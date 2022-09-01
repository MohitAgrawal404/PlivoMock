import React, {useState} from 'react'; 
import { collection } from "firebase/firestore"; 
import {db} from '../config/firebase';
import { setChat } from './features/chatSlice';
import { useDispatch } from 'react-redux'


export const Customer = () => {

    const dispatch = useDispatch();
    const [active, setActive] = useState(false);

    const onClick = () => {
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


    return (
        <div>
            {!active ? 
            (<div> not able to chat</div>):
            
            (<div> able to chat</div>)
            }
        </div>
    )

}