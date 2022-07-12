
import SpellUtils from "./spell-utils.js"
import * as _SC from "./spell-consts.js"
const reserved_words = {  }
const spell_object_html_fields_mapping = { "_id": "id", "css-class": "class", "animation": "xyz", "input-type": "type" };

export class SpellObject {

    //#_id 

    constructor(data, defaults) {
        if (defaults) {
            SpellUtils.merge_defaults_with_data(data, defaults)
        }
        
        this._id = (data && data._id) ? data._id : "so-" + SpellUtils.guid();
        reserved_words[_SC.NODES.child_spells] = "child spells"
        this._type = null
        this[_SC.NODES.child_spells] = [];
        this._ignore = reserved_words;

        
        if (data) {
            delete data._id
            if (data.hasOwnProperty("_ignore")) {
                this._ignore = SpellUtils.create_ignore_list(data["_ignore"])
            }
            this.parse(data, this._ignore);
        }
    }


    //get _id() {return this.#_id}

    /**
     * occurs on Spell.init
     * must override
     */
    init() {
        throw "init method not implemented"
    }


    parse(data, ignore = reserved_words) {
        let cdata = Object.keys(data);
        cdata.forEach(field => {
            if (!ignore.hasOwnProperty(field) && data.hasOwnProperty(field)) {
                this[field] = data[field];
            }
        });
    }

    log() {
        let keys = Object.keys(this);
        keys.forEach(key => {
            if (this[key]) {
                console.log(key + ":" + this[key]);
            }
        });
        console.log(this.get_html());
    }


    // /**
    //  * this method triggered after the HTML DOM object has been created and added to the parent element
    //  */
    // async on_create() {
    // }


    /**
     * triggers from Spell frame
     * @param {int} frame_number 
     * 
     * 
     */
    async on_frame(frame_number){
        
        this[_SC.NODES.child_spells].forEach(child => {
            if(child.on_frame && typeof child.on_frame === 'function') {
                child.on_frame(frame_number)
            }})
    }

    async execute(scmd) {
        //console.log(scmd);
    }
    
}


export default SpellObject