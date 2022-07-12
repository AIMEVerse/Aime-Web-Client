
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

import SpellUIObject from "./spell-ui-object.js"
import SpellObjectManager  from "../spell-object-manager.js";
import SpellViewManager from "./spell-view-manager.js"
import SpellModule from "../spell-module.js"
import SpellUtils from "../spell-utils.js";
import {SpellEventManager,SpellEvents} from  "../spell-event-manager.js"
import SpellObjects from "./spell-core-objects.js"
import SpellDashboardObjects from "./spell-dashboard.js"
import SpellMoveControls  from "./sui-objects/spell-move-controls.js";
import SpellParser  from "../spell-parser.js";


export class SpellUIModule extends SpellModule {
    constructor(data) {
        const defaults = {name:"spell-ui"}
        super(data,defaults)
        //this.engine = SpellUI
        this.vm = new SpellViewManager(this)
        //register default objects
        this.import_objects(SpellObjects)
        //this.import_objects(SpellDashboardObjects)
        //this.import_objects(SpellMoveControls)

        SpellEventManager.fire(SpellEvents.engine_init)

    }


    

   
    load_app(spell_app) {
        if(spell_app.player && spell_app.player.html_element) {
            this.vm.spell_html_element = spell_app.player.html_element
        }
        
        this.vm.add_raw_views(spell_app.views);
        //const v = (spell_app.defaults && spell_app.defaults.view) ? spell_app.defaults.view : this.vm.raw_views[0].name
        // this.vm.load_page(v);
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
        let cmd = SpellParser.parse_spell(spell_program);
        //console.log(JSON.stringify(cmd));
    }

    
    

    load_control(data) {
        const spell_obj = this.create(data)
        
        const ctrl = spell_obj.get_dom_object()
        const pe = (spell_obj._parent_element) ? spell_obj._parent_element : this.vm.spell_html_element;
        document.querySelector("#" + pe).append(ctrl)
        if(spell_obj.on_create && typeof spell_obj.on_create === 'function') {
            spell_obj.on_create()
        }
        
        
    }

    create_from_template(spell2json) {
        const s = this.create(SpellParser.spellify(spell2json))
        return s
    }

    async on_frame(frame_number) {
        super.on_frame(frame_number) //bubble event to all the active objects in the object manager (om)
        //console.log("frame " + frame_number)
    }
}

export const SpellUI = new SpellUIModule()

export default SpellUI
export {
    SpellUIObject,
    SpellObjects,
    SpellDashboardObjects,
    SpellMoveControls
    //SpellUIEngine as SpellEngine
}