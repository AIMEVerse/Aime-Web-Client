
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"

import SpellAIObject from "./spell-ai-object.js"
import SpellData from "../spell-data.js"

// const STATUS = document.getElementById('status');
// const VIDEO = document.getElementById('webcam');



export class SpellHandpose extends SpellAIObject {


    constructor(data, defaults) {
        super(data, defaults)
        this._model_loaded = false
    }

    async init() {
        try {
            this._tf_model = await handpose.load()
            this._model_loaded = true
            console.log("handpose model loaded");
        } catch (ex) {
            console.log("unable to load handpose model");
        }
        
        
        //setInterval(() => { detect(net) }, 100)
    }

    async on_frame(frame_number) {
        //console.log(frame_number);
        if(this._enable_detection && this._model_loaded && this._media_source_tag) {
            if(!this._media_source) {
                this._media_source = document.getElementById(this._media_source_tag)
            }
            else
            {
                const hands = await this._tf_model.estimateHands(this._media_source)
                if (hands.length > 0) {
                    SpellData.objects["handpose"] = hands
                    //console.log(SpellData.objects["handpose"]);
                }
            }
        }
        super.on_frame(frame_number)  // call to propagate to child spells
    }

    async execute(scmd) {
        const sop = scmd?.params["1"]
        if (sop) {

            if (sop == "set-source") {
                const sid = scmd.params["video-tag"]
                if(sid) {
                    this._media_source_tag = sid 
                }
                else {
                    this._media_source_tag = null
                }
                
                
            }
            else if (sop == "detect") {
                this._enable_detection = true
            }
            else if (sop == "stop-detect") {
                this._enable_detection = false
            }
        }



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
            "handpose": SpellHandpose
        }
    }
}





export default SpellObjects