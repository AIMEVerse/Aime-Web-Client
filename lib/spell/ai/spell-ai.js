
/**
 * SpellAI.JS
 * @description Universal User Interface (UI) HTML Engine  for Javascript supporting devices & browsers
 * @author Tamir Fridman <tamirf@yahoo.com>
 * @since  03/09/2022
 * @Copyright AIME Web3 Technologies 2022, all right reserved
 *
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
 *
 */

import SpellObjectManager  from "../spell-object-manager.js";
import SpellModule from "../spell-module.js"
import SpellUtils from "../spell-utils.js";
import {SpellEventManager,SpellEvents} from  "../spell-event-manager.js"




class SpellAIEngine {

    constructor() {
        this.engine_id = SpellUtils.guid()
        this.engine_name = "Spell-AI"
        this.om = new SpellObjectManager()
        //register default objects
        //this.om.register_objects(SpellObjects.get_objects())
        
        SpellEventManager.fire(SpellEvents.engine_init)
    }

    
    info(){
        console.log("Spell Engine " + this.engine_name + " Id " + this.engine_id )
        
    }

   
    /**
     * Imports external objects to the engine
     * The object class should be like SpellObjects with static implementation of get_objects() method
     * @param {SpellObjects} objects_class 
     */
    import_objects(objects_class){
        this.om.register_objects(objects_class.get_objects())
    }
    
  
    //execute spell command
    execute(cmd) {
        console.log(cmd)
    }

    async on_frame(frame_number) {
        
        //console.log("frame " + frame_number)
    }

     

}

export class SpellUIModule extends SpellModule {
    constructor(data) {
        const defaults = {name:"spell-ai"}
        super(data,defaults)
        this.engine = SpellUI
    }


    _create(scmd) {
        return this.engine.create(scmd)
    }

    _load_app(scmd) {
        console.log(scmd)
    }

    //expose on_frame method to spell engine
    on_frame(frame_number) {
        this.engine.on_frame(frame_number)
    }
}

let SpellAI = new SpellAIEngine()

export default SpellAI
export {
    SpellAI,
    SpellAIEngine
}