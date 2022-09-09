import { collection, getDoc, onSnapshot, query, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { db } from '../config/firebase';
import { setEmail } from './features/emailSlice';

export const EmailSidebar = ( id ) => {

    const dispatch = useDispatch();
    const [emailInfo, setEmailInfo] = useState();

    useEffect(() => {
        const fetchDoc = async () => {
            const docRef = doc(db, "emails", id.id)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()) {
                setEmailInfo(docSnap.data())
            } else {
                console.log("No such document found")
            }
        }
        fetchDoc()
    }, [id])

    return (
        <div onClick = { () => {
            dispatch(
                setEmail({
                    emailId: id
                })
            )
        }}>
            <div>
                <h3>
                    {emailInfo?.name} 
                </h3>
                <p>{emailInfo?.subject}</p>
            </div>
            

        </div>
    )
}
