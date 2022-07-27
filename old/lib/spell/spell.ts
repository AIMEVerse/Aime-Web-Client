
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


/** interface */
import SpellCommand from "./spell-command"
import SpellUtils from "./spell-utils"
import SpellData from "./spell-data"
import SpellParser from "./spell-parser"
import SpellModule from "./spell-module"
import {SpellEventManager,SpellEvents,SpellEvent} from  "./spell-event-manager"





class SpellMainModule extends SpellModule {

    

    constructor(data) {
        const defaults = {name:"spell"}
        super(data,defaults)
    }

    _info(spell_command) {
        console.log("Spell Engine V:" + Spell.version)
    }

    _loadModule(scmd) {
        console.log(scmd.params["name"])
    }
}

class SpellEngine {

    version : string
    engine_id: string
    frame_number: number
    fps: number
    fps_mavg: number
    ts: number
    parser: typeof SpellParser
    modules: {}

    constructor() {
        this.version = "1.0.0"
        this.engine_id = SpellUtils.guid()
        this.frame_number = 0
        this.fps = 0
        this.fps_mavg = 0
        this.ts = performance.now()
        this.parser = SpellParser
        this.modules = {}
        SpellEventManager.fire(SpellEvents.ENGINE_INIT)
        this.load()
    }

  

    loadModule(spell_module:SpellModule):void {
        //console.log(spell_module)
        if (this.modules.hasOwnProperty(spell_module.name)) {
            console.log("module " + spell_module.name + " already loaded")
        } else {
            this.modules[spell_module.name] = spell_module;
            spell_module.load()
        }
    }

    loadModules(spell_modules_array:[]):void {
        const sthis = this
        spell_modules_array.forEach(mod => sthis.loadModule(mod))
    }



    load() {
        this.loadModule(new SpellMainModule({}))
    }

    info(){
        console.log("Spell Engine Id " + this.engine_id)   
    }


     /**
     * Run textual Spell Command -
     * @param {cmd} - text command
     */

    run(str_cmd:string) {
        if(str_cmd?.length>2) {
            let scmd = SpellParser.parse(str_cmd)
            return this.execute(scmd)
        } else {
            throw "Unable to parse Spell command"
        }
    }

    /**
     * Execute Spell Command 
     * @param {SpellCommand} 
     */
    execute(cmd:SpellCommand):any {
        if(cmd && cmd.module && this.modules[cmd.module]) {
            return this.modules[cmd.module].execute(cmd)
        } else {
            throw "Spell module " + cmd.module + " not loaded"
        }
    }



    /**
     * Main onFrame method
     * calls all the sub-modules onFrame methods (if implemented)
     */
     onFrame():void {     
        this.frame_number++
        Object.keys(this.modules).forEach(mod => {
            if(this.modules[mod].onFrame && typeof this.modules[mod].onFrame === 'function') {
                this.modules[mod].onFrame(this.frame_number)
            }
        })
        
        SpellData.variables["frame-number"] = this.frame_number
        const now:number = performance.now();
        const diff:number = now-this.ts
        this.ts = now
        
        this.fps_mavg = .9 * this.fps_mavg + .1 * diff //#stable FPS with moving avarage
        this.fps = Math.floor((1 / this.fps_mavg)*1000)
        
        

        SpellData.variables["fps"] = this.fps
        requestAnimationFrame(() => {Spell.onFrame()})         
    }


    getModule(module_name:string):SpellModule{
        return this.modules[module_name]
    }

    start() {
        console.log("Starting Spell")
        this.onFrame()
    }

}


const Spell = new SpellEngine()

export default Spell