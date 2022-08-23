import React, { useRef, useEffect }from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

function Camera() {

    let videoRef = useRef(null)

    let photoRef = useRef(null)

    // get access to user webcamera

    const getUserCamera = () => {
        navigator.mediaDevices.getUserMedia({
            video:true
        })
            .then((stream) => {
                // attach the stream to the video tag

                let video = videoRef.current

                video.srcObject = stream

                video.play()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const takePicture = () =>{
        // width and height

        let width = 500
        let height = width / (16/9)

        let photo = photoRef.current
        let video = videoRef.current

        // set the photo wifth and height

        photo.width = width
        photo.height = height

        let ctx = photo.getContext('2d')
        ctx.drawImage(video, 0,0, photo.width, photo.height)
    }


    useEffect(() => {
        getUserCamera()
    }, [videoRef])

    return (
        <div className='container'>
            <h1 className='text-center'> Selfie</h1>
            <video className='container' ref={videoRef}></video>
            <button onClick={takePicture} className='btn btn-danger container'> Take Photo</button>
            <canvas ref={photoRef}></canvas>
        </div>
    )
}
export default  Camera;