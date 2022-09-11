import { getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { useSelector } from 'react-redux'
import { selectEmailId } from './features/emailSlice'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Contact } from './Contact'
import './MessageView.css';

export const FullEmail = () => {

    const [email, setEmail] = useState()
    const [isEmail, setIsEmail] = useState(false)
    const emailId = useSelector(selectEmailId)

    useEffect(() => {
        if(emailId) {
            (async () => {
                const docRef = doc(db, "emails", emailId.id)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()) {
                    setEmail(docSnap.data())
                    console.log(docSnap.data())
                } else {
                    console.log("No such document found")
                }
            })();
            return () => {
            }  
        }
    }, [emailId])

    const handleEmail = () => {
        setIsEmail(!isEmail)
    }

    return (
        <div className = "chat">
            {email? 
            <div>
                <div className = "chat__header"> 
                    <h4>
                        <span className='chat__channelName'>{email.subject}</span>
                    </h4>
                </div>
                
                <div className='chat__messages'>
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold fs-5">{email.name}</p>
                        <p class="fw-light fs-5">{"<" + email.email + ">"}</p>
                        <p class="text-end fs-5">{email.date}</p>
                    </div>
                    <p>{email.body}</p>
                    {isEmail?  <button onClick={handleEmail}>Cancel</button> : <button onClick={handleEmail}>Reply</button>}
                    {isEmail? <Contact name={email.name} email={email.email}/> : ""}
                </div>
                
            </div> 
            : ""}
        </div>
    )
}
