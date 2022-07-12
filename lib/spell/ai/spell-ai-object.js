
import SpellUtils from "../spell-utils.js"
import SpellObject from "../spell-object.js"
import * as _SC from "../spell-consts.js"



class SpellAIObject extends SpellObject{

    //private members
   
    constructor(data, defaults) {
       
        super(data,defaults)
       
        this._tf_model = null;
        this._type = "ai";
        this[_SC.NODES.child_spells] = [];
    }


    

    /**
     * occurs on Spell.init
     * @override 
     */
    init() {
        //console.log("init " + this._type ) //DEBUG
    }


   

    /**
     * this method triggered after the HTML DOM object has been created and added to the parent element
     */
    async on_create() {
    }


    /**
     * triggers from Spell frame
     * @param {int} frame_number 
     * 
     * 
     */
    async on_frame(frame_number){
        super.on_frame(frame_number)
    }

    async execute(scmd) {
        //console.log(scmd);
    }
}

export default SpellAIObject