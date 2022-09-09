import { onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { emailCollection } from '../config/firebase';
import { EmailSidebar } from './EmailSidebar';

export const EmailBar = () => {

    const [emails, setEmails] = useState([]);
    
    useEffect(() => {
        onSnapshot(emailCollection, (snapshot) => {
            setEmails(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    return (
        <div>
            { emails.map(({id}) => (
                <EmailSidebar id={id}/>
            ))}
        </div>
    )
}
