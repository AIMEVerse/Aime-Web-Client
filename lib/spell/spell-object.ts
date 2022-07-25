
import SpellUtils from "./spell-utils"
import * as _SC from "./spell-consts"
import SpellCommand from "./spell-command";

const reserved_words = {  }
const spell_object_html_fields_mapping = { "_id": "id", "css-class": "class", "animation": "xyz", "input-type": "type" };

export interface iSpellObjectData{
    _id?:string | null
    id?:string | null
    name?:string
    _type?:string
    _spells
    
}

export class SpellObject {
    
    _id: string
    id: string | null
    name:string | null
    _ignore:{}

    constructor(data:iSpellObjectData , defaults?:{} ) {
        if (defaults) {
            SpellUtils.mergeDefaultsWithData(data, defaults)
        }
        
        this._id = (data && data._id) ? data._id : "so-" + SpellUtils.guid();
        reserved_words[_SC.NODES.child_spells] = "child spells"
        this[_SC.NODES.type] = null
        this[_SC.NODES.child_spells] = [];
        this._ignore = reserved_words;

        
        if (data) {
            delete data._id
            if (data.hasOwnProperty("_ignore")) {
                this._ignore = SpellUtils.createIgnoreList(data["_ignore"],reserved_words)
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
        console.log(this);
    }


    // /**
    //  * this method triggered after the HTML DOM object has been created and added to the parent element
    //  */
    // async onCreate() {
    // }


    /**
     * triggers from Spell frame
     * @param {int} frame_number 
     * 
     * 
     */
    async onFrame(frame_number:number){
        
        this[_SC.NODES.child_spells].forEach(child => {
            if(child.onFrame && typeof child.onFrame === 'function') {
                child.onFrame(frame_number)
            }})
    }

    async execute(scmd:SpellCommand) {
    }
    
}


export default SpellObject