import { storage } from "../config/firebase.js";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, { useState } from "react";


const Upload2firebase = () => {
    const [file, setFile] = useState("");

    const [percent, setPercent] = useState(0);
    function handleChange(event) {
        setFile(event.target.files[0]);
    }


    const handleUpload = () => {
        if (!file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
    
                setPercent(percent);
            },
            (err) => console.log(err), 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    return (
 
            <form>
                <label>            
                <input type="file" onChange={handleChange}/>
                <button onClick={handleUpload}>Upload</button>
                <p>{percent} "% done"</p>

            </label>
            </form>


    );
}

export default Upload2firebase;







