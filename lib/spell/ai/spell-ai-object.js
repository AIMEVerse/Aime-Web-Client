
import SpellUtils from "../spell-utils.js"
import SpellData from "../spell-data.js"

const reserved_words = { "spells": "child spells" }
const spell_object_html_fields_mapping = { "_id": "id", "css-class": "class", "animation": "xyz", "input-type": "type" };


class SpellAIObject {

    //private members
   
    constructor(data, defaults) {
        if (defaults) {
            SpellUtils.merge_defaults_with_data(data, defaults)
        }
        this._id = (data && data._id) ? data._id : "so-" + SpellUtils.guid();
        this._tf_model = null;
        this._type = "ai";
        this._spells = [];
        this._ignore = reserved_words;

        
        if (data) {
            if (data.hasOwnProperty("_ignore")) {
                this._ignore = SpellUtils.create_ignore_list(data["_ignore"])
            }
            this.parse(data, this._ignore);
        }
    }


    

    /**
     * occurs on Spell.init
     * @override 
     */
    init() {
        //console.log("init " + this._type ) //DEBUG
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
        
        //if(this._spells?.length>0) console.log(this.spells)
        this._spells.forEach(child => {
            if(child.on_frame && typeof child.on_frame === 'function') {
                child.on_frame(frame_number)
            }})
        //console.log(this._id + " frame " + frame_number)
    }

    async execute(scmd) {
        //console.log(scmd);
    }
}

export default SpellAIObject