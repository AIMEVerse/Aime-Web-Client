
import SpellUtils from "./spell-utils"
import SpellParser from "./spell-parser"
import SpellObjectManager from "./spell-object-manager";
import * as _SC from "./spell-consts"
import SpellObject from "./spell-object";
/** Spell Module **/

const SpellModuleOp = (op_name, function_name) => { return { op_name: function_name } }

export default class SpellModule {

    _id:string
    name: string;

    //private object manager instance
    #om = new SpellObjectManager()
    engine: any;  //deprecated remove after spell3d

    constructor(data, defaults = { name: "spell-module" }) {
        if (defaults) {
            if (!data) {
                data = defaults
            } else {
                SpellUtils.mergeDefaultsWithData(data, defaults)
            }
        }
        if (data) {
            let dkey = Object.keys(data);
            dkey.forEach(key => {
                this[key] = data[key];
            })
        }
        this._id = SpellUtils.guid()


    }

    load() {
        console.log("module " + this.name + " loaded")
    }

    /**
     * create new SPELL_OBJECT
     * @static
     * @param data - The data of the new object (JSON)
     * @return {SpellObject|*}
     */
    create(data) {

        let spell_object;
        if (data.hasOwnProperty(_SC.NODES.type)) {
            if (this.#om.hasObjectClass(data[_SC.NODES.type])) {

                let spell_object_class = this.#om.getObjectClass(data[_SC.NODES.type]);
                if (spell_object_class.hasOwnProperty("defaults")) {
                    SpellUtils.mergeDefaultsWithData(data, spell_object_class.defaults);
                }
                spell_object = new spell_object_class(data);
            }
            else {
                throw "Spell object '" + data[_SC.NODES.type] + "' not found";
            }
        }
        else {
            spell_object = new SpellObject(data);
        }

        //await spell_object.init();
        this.#om.addObject(spell_object)
        if (data[_SC.NODES.child_spells]) {
            const sthis = this //strong "this" for anonymous function use
            data[_SC.NODES.child_spells].forEach(async (spell) => {
                let new_spell = sthis.create(spell);
                spell_object.append(new_spell)
            });
        }


        return spell_object;
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
    async run(spell_command) {
        if (spell_command) {
            let str_cmd = spell_command.trim()
            //add module name to run command if not exists (in case of direct call from the module)
            if (!str_cmd.startsWith(this.name)) {
                str_cmd = this.name + " " + str_cmd
            }
            let scmd = SpellParser.parse(str_cmd)
            return await this.execute(scmd)
        } else {
            throw "Unable to parse Spell command"
        }
    }

    /**
     * Run spell command - CLI mode
     * @param {SpellCommand} SpellCommand input (JSON)
     * @returns command execution result
     */
    async execute(spell_command) {


        //search for spell wrapping functions (starts with _ "underscore" example -> _start() , async _spell_async_func() )
        const lop = "_" + spell_command.op.replaceAll('-', '_') //search for local op = lop
        if (this[lop] && typeof this[lop] === 'function') {
            return this[lop](spell_command)
        } 
        else if (this.engine && this.engine.om) //direct spell injection to specific module -> deprecated rem
        {
            console.log("STILL RUNNING FROM ENGINE -- DEPRECATED");
             const o = this.engine.om.getObjectByName(spell_command.op)
            if (o) { o.execute(spell_command) }
            else { throw "Spell Module cant find op:" + spell_command.op }
        }
        else if (this.#om) //direct spell injection to specific module
        {
            const o = this.#om.getObjectByName(spell_command.op)
            //console.log(o);
            if (o) { o.execute(spell_command) }
            else { throw "Spell Module cant find op:" + spell_command.op }
        }
        else {
            throw "Spell Module cant find op:" + spell_command.op
        }


    }

    async onFrame(frame_number) {
        Object.keys(this.#om.spell_objects).forEach(key=>{
            const so = this.#om.spell_objects[key]
            if(so.onFrame && typeof so.onFrame === 'function') {
                so.onFrame(frame_number)
            }
        })
    }


    /**
     * SPELL Object Manager
     */

    //getter for om (object manager) instance
    get om() { return this.#om }

    get object_manager() { return this.#om } //alias
    /**
     * Imports external objects to the engine
     * The object class should be like SpellObjects with static implementation of get_objects() method
     * @param {SpellObjects} objects_class 
     */
    importObjects(objects_class) {
        this.#om.registerObjects(objects_class.get_objects())
    }

    

}


