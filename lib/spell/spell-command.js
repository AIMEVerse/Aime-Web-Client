import SpellUtils from "./spell-utils.js"

export default class SpellCommand {
    constructor() {
        this.id = SpellUtils.guid();
        this.module = null;   //module name to execute
        this.op = null; //op within the module
        this.on_frame = 0;  //frame number/logic to run the command 
        this.on_event = null; //spell event to run run the command
        this.date_created = Date.now()
        this.params = {};
    }
}