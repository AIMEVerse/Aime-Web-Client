
import SpellUtils from "../spell-utils.js"
import SpellData from "../spell-data.js"
import SpellObject from "../spell-object.js"
import * as _SC from "../spell-consts.js"

const reserved_words = {  }
const spell_object_html_fields_mapping = { "_id": "id", "css-class": "class", "animation": "xyz", "input-type": "type" };


class SpellUIObject extends SpellObject {

    


    constructor(data, defaults) {
        
        super(data,defaults)
        reserved_words[_SC.NODES.child_spells] = "child spells"
        this._html_tag = "div";
        this._dom_object = null;
        this._type = "view";
        this._html = "";
        this[_SC.NODES.child_spells] = [];
        this.animation = true;
        this._ignore = reserved_words;
        this._base_display = "block"

        if (data) {
            if (data.hasOwnProperty("_ignore")) {
                this._ignore = SpellUtils.create_ignore_list(data["_ignore"])
            }
            this.parse(data, this._ignore);
            //this._dom_object = this.get_dom_object();
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

    get_dom_object() {
        if (!this._dom_object) {
            //console.log("creating " + this._html_tag);
            let dom_object = document.createElement(this._html_tag);
            let fields = Object.keys(this);

            fields.forEach(field => {
                if (this[field] && this.hasOwnProperty(field)) {
                    let f_out = field;
                    if (spell_object_html_fields_mapping.hasOwnProperty(field)) {
                        f_out = spell_object_html_fields_mapping[field];
                    }
                    if (!f_out.startsWith("_") && f_out !== "text") {
                        dom_object.setAttribute(f_out, this[field]);
                    }
                }
            });

            if (this["text"] && this["text"].length > 0) {
                dom_object.innerText = this["text"];
            } else if (this[_SC.NODES.child_spells].length > 0) {
                this[_SC.NODES.child_spells].forEach(child => {
                    const coo = child.get_dom_object()
                    dom_object.appendChild(coo);
                })
            }
            this._dom_object = dom_object;
            this.on_create()
        }
        return this._dom_object;
    }

    get_html() {
        //console.log("html for " + this._id)
        this._html = this.get_dom_object().outerHTML;
        return this._html;
    }

   
    

  

    get dom_element() {
        return document.getElementById(this._id)
    }

    append(spell_object) {
        this[_SC.NODES.child_spells].push(spell_object);
        if (this._dom_object) {
            this.dom_element.appendChild(spell_object.get_dom_object())
        }
    }

    set_text(text)
    {
        this.text = text;
        if(this.dom_element) {
            this.dom_element.innerHTML = text
        }
    }

    set_style(attr, val) {
        this.dom_element.style[attr]= val
    }

    show() {
        this.dom_element.style.display = this._base_display 
    }

    hide() {
        this._base_display = this.dom_element.style.display
        this.dom_element.style.display = "none"
    }

    /**
     * this method triggered after the HTML DOM object has been created and added to the parent element
     */
    async on_create() {
        this._spells.forEach(child => {
            if(child.v && typeof child.on_create === 'function') {
                child.on_create()
            }})
    }

    async on_mount() {
        this[_SC.NODES.child_spells].forEach(child => {
            if(child.on_mount && typeof child.on_mount === 'function') {
                child.on_mount()
            }})
    }


    /**
     * triggers from Spell frame
     * @param {int} frame_number 
     * 
     * object that extends SpellUIObject can override this method and call super.on_frame
     * to bubble the event to child objects (spells)
     */
    async on_frame(frame_number){
        if(this._data_source && !this._on_frame_skip_data_source) {
            if(SpellData.variables[this._data_source]) {
                const ph = "_$"
                if(this._format && this._format.indexOf(ph)>0) {
                    this.set_text(this._format.replace(ph,SpellData.variables[this._data_source]))
                } else {
                    this.set_text(SpellData.variables[this._data_source])
                }
            }
            else if(SpellData.objects[this._data_source]) {
                //console.log("data source");
                const ob = SpellData.objects[this._data_source]
                if(this._format) {
                    const replace_at_plus_one = (str,index, character) => {
                        return str.substr(0, index) + character + str.substr(index +2);
                    };
                    let  trimmed = this._format.trim()

                    let index,start_index=0

                    //to do - optimization point = cache positions
                    while ((index = trimmed.indexOf("_$", start_index)) > -1) {
                        const val = ob[trimmed.substr(index+1,1)].toFixed(2)
                        trimmed = replace_at_plus_one(trimmed,index,val)
                        start_index = index + 1 + val.length;
                    }
                    this.set_text(trimmed)
                } else {
                    this.set_text(ob.toString())
                }
            }
        }
        super.on_frame(frame_number)
        //console.log(this._id + " frame " + frame_number)
    }
}

export default SpellUIObject