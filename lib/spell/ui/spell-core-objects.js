import SpellUtils from "../spell-utils.js";
import SpellUIObject from "./spell-ui-object.js";


export class SpellView extends SpellUIObject {
    constructor(data) {
        const defaults =  {
            _type : "view",
            "class":"pai-view"
        };
        super(data,defaults);
    }
}


export class SpellHeader extends SpellUIObject {
    constructor(data) {
        data["_type"] = "header";
        super(data);
    }
}

export class SpellNavBar extends SpellUIObject {
    constructor(data) {
        data["_type"] = "navbar";
        super(data);
        this._html_tag = "nav";
    }
}

export class SpellForm extends SpellUIObject {
    constructor(data) {
        data["_type"] = "form";
        super(data);
        this._html_tag = "form";
    }
}


export class SpellImage extends SpellUIObject {
    static get defaults() {
        return  {
            _type : "image",
        };
    }

    constructor(data) {
        data["_type"] = "image";
        super(data);
        this._html_tag = "img";
    }
}
export class SpellVideo extends SpellUIObject {
    constructor(data) {
        data["_type"] = "video";
        super(data);
        this._html_tag = "video";

    }
}

export class SpellTextField extends SpellUIObject {
    constructor(data) {
        data["_type"] = "text";
        super(data);
        this._html_tag = "input";
    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.val(text);
    }
}

export class SpellTextArea extends SpellUIObject {
    constructor(data) {
        const defs = {
            "_type":"textarea",
            "class":"form-control",
            "_html_tag":"textarea"
        }
        super(data,defs);
    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.val(text);
    }

    get_text() {
        return this.text
    }
}

export class SpellLink extends SpellUIObject {
    static get  defaults()  {
        let oid = "link-" + SpellUtils.guid();
        let def = {
            _id: oid,
            name: oid,
            text: oid,
            style: "",
            class:"pai-link"
        }
        return def;
    }

    constructor(data) {
        data["_type"] = "link";
        super(data);
        this._html_tag = "a";
    }
}

export class SpellLabel extends SpellUIObject {
    
    constructor(data) {
        const defaults = {
            _type:"label",
            _html_tag:"label",
            class:"spell-label"
        }
        super(data,defaults);
    }

    

   
}

export class SpellButton extends SpellUIObject {
    constructor(data) {
        const defs = {
            _type : "button",
            class:"pai-button",
            _html_tag :"button"
        }
        super(data,defs);        
    }

  

    set_onclick(fun)
    {
        this.onclick = fun;
    }
}


export class SpellList extends SpellUIObject {
    constructor(data) {
    
        const defaults = {
            _type:"list",
            _html_tag:"div",
            class:"spell-list",
            _items:[]
        }
        super(data,defaults);
        if(this._items.length>0) {
            this._items.forEach(item => {
                const si = new SpellView(item)
                this.append(si)
            });
        }
    }
}




/******* Spell Modal *******/

export class SpellDialog extends SpellUIObject {
    
    
    constructor(data) {
        const defaults =  {
            _type:"dialog",
            class:"modal fade",
            "aria-hidden":"true",
            _header:{}, 
            _body:{},
            _footer:{},
        };         
        super(data,defaults);
        
        
        this.binded = false;

        let md = new SpellView({"_id":"spell-modal-dialog","class":"modal-dialog"});
        let mc = new SpellView({"_id":"spell-modal-content","class":"modal-content"});
        if(data._header){
            let dialog_header = new SpellDialogHeader(data._header)
            mc.append(dialog_header);
        }

        let modal_body = new SpellView({"_id":"spell-modal-body","class":"modal-body"});
        if(data._body._type){
            let internal_view = Spell.create(data._body)
            modal_body.append(internal_view)
        }

        mc.append(modal_body);

        if(data._footer._buttons) {
            let modal_footer = new SpellDialogFooter({"_id":"spell-modal-footer","_buttons":data._footer._buttons});
            mc.append(modal_footer)
        }
        
        md.append(mc)
        this.append(md);
        
        
    }

    bind(element) {
        $(element).append(this.get_html())
        this.binded = true;
        $("#"+this._id).on('hidden.bs.modal', function (e) {
            //TO-DO handle modal close event
            console.log("hiding modal")
          })
    }

    close() {
        $("#"+this._id).modal('hide')
        Spell.vm.active_modal=this._id;
    }

    show() {
        if(!this.binded) {this.bind(spell_element)}
        Spell.vm.active_modal=this._id;
        $("#"+this._id).modal('show')
    }
}

export class SpellDialogHeader extends SpellUIObject {
    constructor(data) {
        const defaults={
            _type:"dialog-header",
            class:"modal-header"            
        };
        super(data,defaults);
        let h5 = new SpellView({"_id":"spell-modal-title","class":"modal-title","text":data.title,_html_tag : "h5"});
        let btn_modal_close = new SpellButton({"class":"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})
        this.append(h5);
        this.append(btn_modal_close);
    }
}

export class SpellDialogFooter extends SpellUIObject {
    constructor(data) {
        const defaults={
            _type:"dialog-footer",
            _buttons:[], //Array of SpellButtons
            class:"modal-footer"            
        };
        super(data,defaults);
        data._buttons.forEach(button => {
            let btn_modal = new SpellButton(button);
            this.append(btn_modal);
        })
        
        
    }
}



export class SpellObjects {
    static get_objects() {
        return {
            "view":SpellView,
            "label":SpellLabel,
            "link" :SpellLink,
            "button" :SpellButton,
            "text" : SpellTextField,
            "textarea":SpellTextArea,
            "video" : SpellVideo,
            "image" : SpellImage,
            "list": SpellList,
            "form":SpellForm,
            // "grid" : SpellGrid,
            // "table":SpellTable,
            // "air-cursor":SpellAirCursor,
            // "air-button":SpellAirButton,
            // "three-object":SpellThreeObject,
            // "swiper":SpellSwiper
        }
    }
}





export default SpellObjects


