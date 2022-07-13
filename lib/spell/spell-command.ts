import SpellUtils from "./spell-utils"





export default class SpellCommand {
    id:string
    module: string 
    op:string 
    execute_on_frame: string | number;
    execute_on_event: string ;
    date_created: number;
    params: {};
    
    constructor() {
        this.id = SpellUtils.guid();
        this.execute_on_frame = 0;  //frame number/logic to run the command 
        this.date_created = Date.now()
    }
}