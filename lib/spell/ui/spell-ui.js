
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



class SpellUIEngine {

    constructor() {
        this.engine_id = SpellUtils.guid()
        this.vm = new SpellViewManager()
        this.om = new SpellObjectManager()
        //register default objects
        this.om.register_objects(SpellObjects.get_objects())
        this.om.register_objects(SpellDashboardObjects.get_objects())
        this.om.register_objects(SpellMoveControls.get_objects())

        SpellEventManager.fire(SpellEvents.engine_init)
    }

    
    info(){
        console.log("Spell Engine Id " + this.engine_id )
        
    }

   
    /**
     * Imports external objects to the engine
     * The object class should be like SpellObjects with static implementation of get_objects() method
     * @param {SpellObjects} objects_class 
     */
    import_objects(objects_class){
        this.om.register_objects(objects_class.get_objects())
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
     * create new SPELL_OBJECT
     * @static
     * @param data - The data of the new object (JSON)
     * @return {SpellUIObject|*}
     */
    create(data) {

        let ro;
        if (data.hasOwnProperty("_type")) {
            if (this.om.has_object_class(data["_type"])) {

                let spell_object_class = this.om.get_object_class(data["_type"]);
                if (spell_object_class.hasOwnProperty("defaults")) {
                    SpellUtils.merge_defaults_with_data(data, spell_object_class.defaults);
                }
                ro = new spell_object_class(data);
            }
            else {
                throw "Spell object '" + data["_type"] + "' not found";
            }
        }
        else {
            ro = new SpellUIObject(data);
        }

        ro.init();
        this.om.add_object(ro)
        if (data.hasOwnProperty("spells")) {

            data.spells.forEach(spell => {
                //console.log("adding spell - " + JSON.stringify(spell));
                let new_spell = this.create(spell);
                ro.append(new_spell)
            });
        }


        return ro;
    }

    /**
     * plays  Spell program
     * @param spell_program - program to be loaded
     */
    play(spell_program) {
        let cmd = SpellParser.parse_spell(spell_program);
        //console.log(JSON.stringify(cmd));
    }

    //execute spell command
    execute(cmd) {
        console.log(cmd)
    }

    async on_frame(frame_number) {
        Object.keys(this.om.spell_objects).forEach(key=>{
            const so = this.om.spell_objects[key]
            if(so.on_frame && typeof so.on_frame === 'function') {
                so.on_frame(frame_number)
            }
        })
        //console.log("frame " + frame_number)
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

}

export class SpellUIModule extends SpellModule {
    constructor(data) {
        const defaults = {name:"spell-ui"}
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

let SpellUI = new SpellUIEngine()

export default SpellUI
export {
    SpellUI,
    SpellUIObject,
    SpellObjects,
    SpellDashboardObjects,
    SpellMoveControls,
    SpellUIEngine as SpellEngine
}