
/**
 * Spell.JS
 * @description Universal User Interface (UI) Engine for Javascript supporting devices & browsers
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

import SpellUtils from "./spell-utils.js"
import SpellData from "./spell-data.js"
import {SpellCLIParser as SpellParser} from "./spell-parser.js"
import SpellModule from "./spell-module.js"
import {SpellEventManager,SpellEvents,SpellEvent} from  "./spell-event-manager.js"





class SpellMainModule extends SpellModule {
    constructor(data) {
        const defaults = {name:"spell"}
        super(data,defaults)
    }

    _info(spell_command) {
        console.log("Spell Engine V:" + Spell.version)
    }

    _load_module(scmd) {
        console.log(scmd.params["name"])
    }
}

class SpellEngine {
    constructor() {
        this.version = 1
        this.engine_id = SpellUtils.guid()
        this.frame_number = 0
        this.fps = 0
        this.fps_mavg = 0
        this.ts = performance.now()
        
        this.modules = {}
        SpellEventManager.fire(SpellEvents.ENGINE_INIT)
        this.load()
    }

    
    load_module(spell_module) {
        //console.log(spell_module)
        if (this.modules.hasOwnProperty(spell_module.name)) {
            console.log("module " + spell_module.name + " already loaded")
        } else {
            this.modules[spell_module.name] = spell_module;
            spell_module.load()
        }
    }



    load() {
        this.load_module(new SpellMainModule())
    }

    info(){
        console.log("Spell Engine Id " + this.engine_id)   
    }


     /**
     * Run textual Spell Command -
     * @param {cmd} - text command
     */

    run(cmd) {
        if(cmd.length>2) {
            let scmd = SpellParser.parse(cmd)
            return this.execute(scmd)
        } else {
            throw "Unable to parse Spell command"
        }
    }

    /**
     * Execute Spell Command 
     * @param {SpellCommand} 
     */
    execute(cmd) {
        if(cmd && cmd.module && this.modules[cmd.module]) {
            return this.modules[cmd.module].execute(cmd)
        } else {
            throw "Spell module " + cmd.module + " not loaded"
        }
    }



    /**
     * Main on_frame method
     * calls all the sub-modules on_frame methods (if implemented)
     */
    on_frame() {     
        this.frame_number++
        Object.keys(this.modules).forEach(mod => {
            if(this.modules[mod].on_frame && typeof this.modules[mod].on_frame === 'function') {
                this.modules[mod].on_frame(this.frame_number)
            }
        })
        
        SpellData.variables["frame-number"] = this.frame_number
        const now = performance.now();
        const diff = now-this.ts
        this.ts = now
        
        this.fps_mavg = .9 * this.fps_mavg + .1 * diff //#stable FPS with moving avarage
        this.fps = Math.floor((1 / this.fps_mavg)*1000)
        
        

        SpellData.variables["fps"] = this.fps
        requestAnimationFrame(() => {Spell.on_frame()})         
    }


    get_module(module_name){
        return this.modules[module_name]
    }

    start() {
        console.log("Starting Spell")
        this.on_frame()
    }

}


const Spell = new SpellEngine()

export default Spell