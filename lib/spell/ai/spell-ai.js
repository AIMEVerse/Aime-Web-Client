
/**
 * SpellAI.JS
 * @description Universal User Interface (UI) HTML Engine  for Javascript supporting devices & browsers
 * @author Tamir Fridman <tamirf@yahoo.com>
 * @since  03/06/2022
 * @Copyright AIME Web3 Technologies 2022, all right reserved
 *
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
 *
 */


import SpellModule from "../spell-module.js"
import SpellUtils from "../spell-utils.js";
import {SpellEventManager,SpellEvents} from  "../spell-event-manager.js"

import {SpellObjects as HandposeObjects} from "./spell-handpose.js"


// export class SpellAIEngine {

//     constructor() {
//         this.#engine_id = SpellUtils.guid()
//         this.#engine_name = "spell-ai"
//         this.#om = new SpellObjectManager()
//         //register default objects
//         //this.#om.register_objects(SpellObjects.get_objects())
        
//         SpellEventManager.fire("")
//     }

    
//     info(){
//         console.log("Spell Engine " + this.#engine_name + " Id " + this.#engine_id )
        
//     }

   
//     /**
//      * Imports external objects to the engine
//      * The object class should be like SpellObjects with static implementation of get_objects() method
//      * @param {SpellObjects} objects_class 
//      */
//     import_objects(objects_class){
//         this.#om.register_objects(objects_class.get_objects())
//     }
    
  


//     async on_frame(frame_number) {
        
//         //console.log("frame " + frame_number)
//     }

     

// }

export class SpellAIModule extends SpellModule {


    
    
    constructor(data) {
        const defaults = {
            name:"spell-ai"
        }
        super(data,defaults)

        this.import_objects(HandposeObjects)
    }

  
    
    _load_detector(scmd) {
        
        if(scmd.params["1"]) {
            //console.log(scmd.params);
            const obj = this.create({_type:scmd.params["1"],_id:scmd.params["1"]})
            return obj
        }
       
    }

    
    cmd(cmd) {
        console.log(cmd)
    }

    //expose on_frame method to spell engine
    async on_frame(frame_number) {
        //this.engine.on_frame(frame_number)
        // console.log(frame_number);
        Object.keys(this.om.spell_objects).forEach(key=>{
            const so = this.om.spell_objects[key]
            if(so.on_frame && typeof so.on_frame === 'function') {
                so.on_frame(frame_number)
            }
        })
    }

    
}



export default SpellAIModule
