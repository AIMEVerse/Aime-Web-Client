
import SpellUtils from "./spell-utils.js"
import SpellParser from "./spell-parser.js"
/** Spell Module **/

const SpellModuleOp = (op_name,function_name) => {return {op_name:function_name} }

export default class SpellModule {
    constructor(data,defaults = {name:"spell-module"}) {
        if (defaults) {
            if(!data) {
                data = defaults
            } else {
                SpellUtils.merge_defaults_with_data(data, defaults)
            }
        }
        if(data) {
            let dkey = Object.keys(data);
            dkey.forEach(key => {
                    this[key] = data[key];
            })
        }
        
        
    }

    load() {
        console.log("module " + this.name + " loaded")
    }


    _info(spell_command) {
        console.log("module info")
    }

    //spell interpreter 
    /**
     * Run spell command - 
     * CLI mode, parse the command to SpellCommand JSON format and call execute method
     * @param {string} SpellCommand input - text 
     * @returns command execution result
     */
    run(spell_command) {
        if(spell_command.length>2) {
            let scmd = SpellParser.parse(spell_command)
            return this.execute(scmd)
        } else {
            throw "Unable to parse Spell command"
        }
    }

    /**
     * Run spell command - CLI mode
     * @param {SpellCommand} SpellCommand input (JSON)
     * @returns command execution result
     */
    execute(spell_command) {
        const lop = "_" + spell_command.op.replaceAll('-', '_')
        if(this[lop]){
            return this[lop](spell_command)
        } else if(this.engine && this.engine.om) //direct spell injection to specific module
        {
            const o = this.engine.om.get_object_by_name(spell_command.module)
            if(o) {o.execute(spell_command)}
            else {throw "Spell Module cant find op:"+spell_command.op}
        }
        else
        {
            throw "Spell Module cant find op:"+spell_command.op
        }
    }

    on_frame(frame_number) {

    }
}


