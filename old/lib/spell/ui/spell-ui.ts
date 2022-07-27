
/**
 * SpellUI.JS
 * @description Universal User Interface (UI) HTML Engine  for Javascript supporting devices & browsers
 * @author Tamir Fridman <tamirf@yahoo.com>
 * @since  03/05/2022
 * @Copyright AIME Web3 Technologies 2022, all right reserved
 *
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
 *
 */

import SpellUIObject from "./spell-ui-object"
import SpellViewManager from "./spell-view-manager"
import SpellModule from "../spell-module"
import {SpellEventManager,SpellEvents} from  "../spell-event-manager"
import SpellObjects from "./spell-core-objects"
import SpellDashboardObjects from "./spell-dashboard"
import SpellMoveControls  from "./sui-objects/spell-move-controls";
import SpellParser  from "../spell-parser";


export class SpellUIModule extends SpellModule {
    vm: SpellViewManager

    constructor(data) {
        const defaults = {name:"spell-ui"}
        super(data,defaults)
        //this.engine = SpellUI
        this.vm = new SpellViewManager()
        //register default objects
        this.importObjects(SpellObjects)
        //this.importObjects(SpellDashboardObjects)
        //this.importObjects(SpellMoveControls)

        SpellEventManager.fire("spell-ui-loaded")

    }


    

   
    load_app(spell_app) {
        if(spell_app.player && spell_app.player.html_element) {
            this.vm["spell_html_element"] = spell_app.player.html_element
        }
        this.vm.addRawViews(spell_app.views);
        SpellEventManager.fire(SpellEvents.app_loaded)
    }

    open_url(url, target = null) {
        if (!target) {
            document.location = url;
        }
        else {
            window.open(url);
        }
    }



    
    /**
     * plays  Spell program
     * @param spell_program - program to be loaded
     */
    play(spell_program) {
        let cmd = SpellParser.parseSpell(spell_program);
        //console.log(JSON.stringify(cmd));
    }

    
    

    load_control(data) {
        const spell_obj = this.create(data)
        
        const ctrl = spell_obj.getDOMObject()
        const pe = (spell_obj._parent_element) ? spell_obj._parent_element : this.vm["spell_html_element"];
        document.querySelector("#" + pe)?.append(ctrl)
        if(spell_obj.onCreate && typeof spell_obj.onCreate === 'function') {
            spell_obj.onCreate()
        }
        
        
    }

    create_from_template(spell2json) {
        const s = this.create(SpellParser.spellify(spell2json))
        return s
    }

    async onFrame(frame_number) {
        super.onFrame(frame_number) //bubble event to all the active objects in the object manager (om)
        //console.log("frame " + frame_number)
    }
}

export const SpellUI = new SpellUIModule({})

export default SpellUI
export {
    SpellUIObject,
    SpellObjects,
    SpellDashboardObjects,
    SpellMoveControls
}