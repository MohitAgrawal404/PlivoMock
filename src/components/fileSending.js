import React, { useRef, useEffect, useState }from 'react';
import Upload2firebase from './firebaseUploader';
import Camera from './camera';
function PhotoSend() {
    const [showCamera, setShowCamera] = useState(false)
    const [showFile, setShowFile] = useState(false)
    const onClick = () => setShowCamera(true)
    const onClick1 = () => setShowFile(true)
    
    return (
        <body>
        <div>
            <div>
            <button onClick={() => {setShowCamera(true)}} > Camera </button>
            { showCamera ? <Camera/> : null }
            </div>
            <div>
            <button onClick={() => {setShowFile(true)}}> File</button>
            { showFile ? <Upload2firebase /> : null }
            </div>
            </div>
        </body>
    )
};
export default PhotoSend;