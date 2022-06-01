
    import * as tf from "@tensorflow/tfjs"
    import * as handpose from "@tensorflow-models/handpose"

    const STATUS = document.getElementById('status');
    const VIDEO = document.getElementById('webcam');



    let videoPlaying = false

    function hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    async function load_model() {
        const net = await handpose.load()
        setInterval(() => { detect(net) },100)
    }

    function enableCam() {
        if (hasGetUserMedia()) {
            // getUsermedia parameters.
            const constraints = {
                video: true,
                width: 640,
                height: 480
            };

            // Activate the webcam stream.
            navigator.mediaDevices.getUserMedia(constraints).then( (stream) => {
                VIDEO.srcObject = stream;
                VIDEO.addEventListener('loadeddata', function () {
                    videoPlaying = true;
                    ENABLE_CAM_BUTTON.classList.add('removed');
                    //detect()
                });
            });
        } else {
            console.warn('getUserMedia() is not supported by your browser');
        }
    }
    console.log(VIDEO);
    load_model()
    ENABLE_CAM_BUTTON.addEventListener('click', enableCam);

    async function detect(net) {
        
        if(videoPlaying) {
            const video_settings = VIDEO?.srcObject?.getVideoTracks()[0]?.getSettings()
            //console.log(video_settings)
            const hands = await net.estimateHands( VIDEO)
            if(hands.length>0) console.log(hands.length);
        }
    }