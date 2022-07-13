
import SpellObject from "../spell-object"
import * as _SC from "../spell-consts"



class SpellAIObject extends SpellObject{

    //private members
   
    constructor(data, defaults) {
       
        super(data,defaults)
       
        this._tf_model = null;
        this[_SC.NODES.type] = "ai";
        this[_SC.NODES.child_spells] = [];
    }


    

    /**
     * occurs on Spell.init
     * @override 
     */
    init() {
        
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
    async onFrame(frame_number){
        super.onFrame(frame_number)
    }

    async execute(scmd) {
        //console.log(scmd);
    }
}

export default SpellAIObject