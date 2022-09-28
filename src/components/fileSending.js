import React, { useRef, useEffect, useState }from 'react';
import Upload2firebase from './firebaseUploader';
import Camera from './camera';
import './Dashboard.css';
function PhotoSend() {
    const [showCamera, setShowCamera] = useState(false)
    const [showFile, setShowFile] = useState(false)
    const onClick = () => setShowCamera(true)
    const onClick1 = () => setShowFile(true)
    
    return (
        <body>
        <div className='f'>
            <div>
            { showCamera ? ( 
                <>
                     
                    <button onClick={() => {setShowCamera(false)}} > X </button> 
                    <Camera/>
                </>
                ): ( 
                <>
                        
                    <button onClick={() => {setShowCamera(true)}} className = 'button'> Camera </button>
                </>)}
            
            </div>
            <div>
            
            { showFile ?( 
                <>
                <button onClick={() => {setShowFile(false)}} > X </button> 
                <Upload2firebase />
                </>
             ): (<button onClick={() => {setShowFile(true)}} className = 'button'> File</button>) }
            </div>
            </div>
        </body>
    )
};
export default PhotoSend;

