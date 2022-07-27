
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


import SpellModule from "../spell-module"
import * as _SC from "../spell-consts";
import {SpellEventManager,SpellEvents} from  "../spell-event-manager"

import {SpellObjects as HandposeObjects} from "./spell-handpose"


export class SpellAIModule extends SpellModule {


    
    
    constructor(data) {
        const defaults = {
            name:"spell-ai"
        }
        super(data,defaults)

        this.importObjects(HandposeObjects)
    }

  
    
    _load_detector(scmd) {
        
        if(scmd.params["1"]) {
            //console.log(scmd.params);
            const obj = this.create({[_SC.NODES.type]:scmd.params["1"],_id:scmd.params["1"]})
            return obj
        }
       
    }

    
    cmd(cmd) {
        console.log(cmd)
    }

    //expose onFrame method to spell engine
    async onFrame(frame_number) {
        Object.keys(this.om.spell_objects).forEach(key=>{
            const so = this.om.spell_objects[key]
            if(so.onFrame && typeof so.onFrame === 'function') {
                so.onFrame(frame_number)
            }
        })
    }

    
}



export default SpellAIModule
