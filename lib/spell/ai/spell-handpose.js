
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"

import SpellAIObject from "./spell-ai-object.js"

// const STATUS = document.getElementById('status');
// const VIDEO = document.getElementById('webcam');



export class SpellHandpose extends SpellAIObject {


    constructor(data, defaults) {        
        super(data,defaults)
    }
    
    async init() {
        this._tf_model = await handpose.load()
        console.log("handpose model loaded");
        //setInterval(() => { detect(net) }, 100)
    }

    async on_frame(frame_number) {
        
        super.on_frame(frame_number)  // call to propogate to child spells
    }
}




// async function detect(net) {

//     if (videoPlaying) {
//         const video_settings = VIDEO?.srcObject?.getVideoTracks()[0]?.getSettings()
//         //console.log(video_settings)
//         const hands = await net.estimateHands(VIDEO)
//         if (hands.length > 0) console.log(hands.length);
//     }
// }



export class SpellObjects {
    static get_objects() {
        return {
            "handpose":SpellHandpose
        }
    }
}





export default SpellObjects