
import SpellUtils from "../spell-utils"
import SpellData from "../spell-data"
import SpellObject from "../spell-object"
import * as _SC from "../spell-consts"

const reserved_words = {  }
const spell_object_html_fields_mapping = { "_id": "id", "css-class": "class", "animation": "xyz", "input-type": "type" };



export class SpellUIObject extends SpellObject {
    _html_tag: string
    private _dom_object: HTMLElement | null
    _type:string  //[_SC.NODES.type]
    _html: string | undefined
    animation: boolean
    _base_display: string  = "block"
    text: string
    _data_source: string | null 
    _on_frame_skip_data_source: any
    _format: string | null
    


    constructor(data, defaults) {
        
        super(data,defaults)
        reserved_words[_SC.NODES.child_spells] = "child spells"
        this._html_tag = "div";
        this._dom_object = null;
        this[_SC.NODES.type] = "view";
        this._html = "";
        this[_SC.NODES.child_spells] = [];
        this.animation = true;
        this._ignore = reserved_words;
        this._base_display = "block"

        if (data) {
            if (data.hasOwnProperty("_ignore")) {
                this._ignore = SpellUtils.createIgnoreList(data["_ignore"],reserved_words)
            }
            this.parse(data, this._ignore);
        }
    }


    /**
     * occurs on Spell.init
     * @override 
     */
    init() {
        
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
        console.log(this.getHTML());
    }

    getDOMObject():HTMLElement | null {
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
                    const coo = child.getDOMObject()
                    dom_object.appendChild(coo);
                })
            }
            this._dom_object = dom_object;
            this.onCreate()
        }
        return this._dom_object;
    }

    getHTML() {
        const dom = this.getDOMObject()
        this._html = dom?.outerHTML;
        return this._html;
    }

   
    

  
    /**
     * return the do
     */
    get DOMElementFromHTML() {
        return document.getElementById(this._id)
    }

    append(spell_object) {
        this[_SC.NODES.child_spells].push(spell_object);
        if (this._dom_object) {
            this.DOMElementFromHTML?.appendChild(spell_object.getDOMObject())
        }
    }

    setText(text)
    {
        this.text = text;
        if(this.DOMElementFromHTML) {
            this.DOMElementFromHTML.innerHTML = text
        }
    }

    setStyle(attr, val) {
        if(this._dom_object) {
            this._dom_object.style[attr]= val
        }
    }

    show() {
        if(this._dom_object) {
            this._dom_object.style.display = this._base_display 
        }
    }

    hide() {
        if(this._dom_object) {
            this._base_display = this._dom_object.style.display
            this._dom_object.style.display = "none"
        }
    }

    /**
     * this method triggered after the HTML DOM object has been created and added to the parent element
     */
    async onCreate() {
        this[_SC.NODES.child_spells].forEach(child => {
            if(child.onCreate && typeof child.onCreate === 'function') {
                child.onCreate()
            }})
    }

    async onMount() {
        this[_SC.NODES.child_spells].forEach(child => {
            if(child.onMount && typeof child.onMount === 'function') {
                child.onMount()
            }})
    }


    /**
     * triggers from Spell frame
     * @param {int} frame_number 
     * 
     * object that extends SpellUIObject can override this method and call super.onFrame
     * to bubble the event to child objects (spells)
     */
    async onFrame(frame_number){
        if(this._data_source && !this._on_frame_skip_data_source) {
            if(SpellData.variables[this._data_source]) {
                const ph = "_$"
                if(this._format && this._format.indexOf(ph)>0) {
                    this.setText(this._format.replace(ph,SpellData.variables[this._data_source]))
                } else {
                    this.setText(SpellData.variables[this._data_source])
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
                    this.setText(trimmed)
                } else {
                    this.setText(ob.toString())
                }
            }
        }
        super.onFrame(frame_number)
        //console.log(this._id + " frame " + frame_number)
    }
}

export default SpellUIObject