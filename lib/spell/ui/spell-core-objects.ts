import SpellUtils from "../spell-utils";
import SpellUIObject from "./spell-ui-object";
import Spell from "../spell"
import SpellUI from "./spell-ui"
import * as _SC from "../spell-consts"
import { iSpellObjectData } from "../spell-object";









export class SpellView extends SpellUIObject {
    constructor(data) {
        const defaults =  {
            [_SC.NODES.type] : "view",
            "class":"spell-view"
        };
        super(data,defaults);
    }
}


export class SpellHeader extends SpellUIObject {
    constructor(data:iSpellObjectData) {
        const tag = "header"
        const defaults = {
            [_SC.NODES.type] : tag,
            class:"spell-" + tag,
            _html_tag:tag
        }
        super(data,defaults);
    }
}

export class SpellNavBar extends SpellUIObject {
    constructor(data) {
        const tag = "navbar"
        const defaults = {
            [_SC.NODES.type] : tag,
            class:"spell-" + tag,
            _html_tag:"nav"
        }
        super(data,defaults);
    }
}

export class SpellForm extends SpellUIObject {
    constructor(data) {
        const tag = "form"
        const defaults = {
            [_SC.NODES.type] : tag,
            class:"spell-" + tag,
            _html_tag:tag
        }
        super(data,defaults);
    }
}


export class SpellImage extends SpellUIObject {
   

    constructor(data) {
        const tag = "image"
        const defaults = {
            [_SC.NODES.type] : tag,
            class:"spell-" + tag,
            _html_tag:"img"
        }
        super(data,defaults);
    }
}

export class SpellVideo extends SpellUIObject {
    constructor(data) {
        const tag = "video"
        const defaults = {
            [_SC.NODES.type] : tag,
            class:"spell-" + tag,
            _html_tag:tag
        }
        super(data,defaults);

    }
}

export class SpellWebcam extends SpellUIObject {
    autoplay: boolean;
    muted: boolean;
    _video_constraints: { video: boolean; width: number; height: number; };
    
    constructor(data) {
        const tag = "webcam"
        const defaults = {
            [_SC.NODES.type] : tag,
            class:"spell-" + tag,
            _html_tag:"video"
        }
        super(data,defaults);

        
        super(data,defaults)
        
        this.autoplay = true
        this.muted = true
        this._video_constraints = {
            video: true,
            width: 320,
            height: 280
        };
    }


    /**
     * this method checks if the browser has "getMedia" support for webcam & mic
     * @returns boolean
     */
    isAvailable() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    setSource(video_elem) {

        navigator.mediaDevices.getUserMedia(this._video_constraints).then((stream) => {
            video_elem.srcObject = stream;
            video_elem.addEventListener('loadeddata',async  () => {
                //console.log("media is running");
                // video_playing = true;

                // await load_hands_model()
                // //ENABLE_CAM_BUTTON.classList.add('removed');
                //detect()
                //if ai
                Spell.run("spell-ai handpose detect")
            });
        });
    }

    get isPlaying() {
        const v:any   = this.DOMElementFromHTML
        return !!(v?.currentTime > 0 && !v?.paused && !v?.ended && v?.readyState > 2);
    }

    async pause() {
        const v:any   = this.DOMElementFromHTML
        v?.pause()
        //Spell.run("spell-ai handpose stop-detect")
    }

}


export class SpellTextField extends SpellUIObject {
    constructor(data) {
        const tag = "text"
        const defaults = {
            [_SC.NODES.type] : tag,
            class:"spell-" + tag,
            _html_tag:"input"
        }
        super(data,defaults);
    }

    

}

export class SpellTextArea extends SpellUIObject {
    constructor(data) {
        const defs = {
            [_SC.NODES.type]:"textarea",
            "class":"form-control",
            "_html_tag":"textarea"
        }
        super(data,defs);
    }

    

    getText() {
        return this.text
    }
}

export class SpellLink extends SpellUIObject {
    
    constructor(data:iSpellObjectData) {
        const tag = "link"
        const defaults = {
            [_SC.NODES.type] : tag,
            class:"spell-" + tag,
            _html_tag:"a"
        }
        super(data,defaults);
    }
}

export class SpellLabel extends SpellUIObject {
    
    constructor(data) {
        const defaults = {
            [_SC.NODES.type]:"label",
            _html_tag:"label",
            class:"spell-label"
        }
        super(data,defaults);
    }

    

   
}

export class SpellButton extends SpellUIObject {
    onClick: CallableFunction;
    constructor(data) {
        const defs = {
            [_SC.NODES.type] : "button",
            class:"spell-button",
            _html_tag :"button"
        }
        super(data,defs);        
    }

  

    setOnclick(fun:CallableFunction)
    {
        this.onClick = fun;
    }
}


export class SpellList extends SpellUIObject {
    _items: any;
    constructor(data) {
    
        const defaults = {
            [_SC.NODES.type]:"list",
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




// /******* Spell Modal *******/

// export class SpellDialog extends SpellUIObject {
    
//     binded : boolean
    
//     constructor(data) {
//         const defaults =  {
//             [_SC.NODES.type]:"dialog",
//             class:"modal fade",
//             "aria-hidden":"true",
//             _header:{}, 
//             _body:{},
//             _footer:{},
//         };         
//         super(data,defaults);
        
        
//         this.binded = false;

//         let md = new SpellView({"_id":"spell-modal-dialog","class":"modal-dialog"});
//         let mc = new SpellView({"_id":"spell-modal-content","class":"modal-content"});
//         if(data._header){
//             let dialog_header = new SpellDialogHeader(data._header)
//             mc.append(dialog_header);
//         }

//         let modal_body = new SpellView({"_id":"spell-modal-body","class":"modal-body"});
//         if(data._body[_SC.NODES.type]){
//             let internal_view = SpellUI.create(data._body)
//             modal_body.append(internal_view)
//         }

//         mc.append(modal_body);

//         if(data._footer._buttons) {
//             let modal_footer = new SpellDialogFooter({"_id":"spell-modal-footer","_buttons":data._footer._buttons});
//             mc.append(modal_footer)
//         }
        
//         md.append(mc)
//         this.append(md);
        
        
//     }

//     bind(element) {
//         $(element).append(this.getHTML())
//         this.binded = true;
//         $("#"+this._id).on('hidden.bs.modal', function (e) {
//             //TO-DO handle modal close event
//             console.log("hiding modal")
//           })
//     }

//     close() {
//         $("#"+this._id).modal('hide')
//         Spell.vm.active_modal=this._id;
//     }

//     show() {
//         if(!this.binded) {this.bind(spell_element)}
//         Spell.vm.active_modal=this._id;
//         $("#"+this._id).modal('show')
//     }
// }

// export class SpellDialogHeader extends SpellUIObject {
//     constructor(data) {
//         const defaults={
//             [_SC.NODES.type]:"dialog-header",
//             class:"modal-header"            
//         };
//         super(data,defaults);
//         let h5 = new SpellView({"_id":"spell-modal-title","class":"modal-title","text":data.title,_html_tag : "h5"});
//         let btn_modal_close = new SpellButton({"class":"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})
//         this.append(h5);
//         this.append(btn_modal_close);
//     }
// }

// export class SpellDialogFooter extends SpellUIObject {
//     constructor(data) {
//         const defaults={
//             [_SC.NODES.type]:"dialog-footer",
//             _buttons:[], //Array of SpellButtons
//             class:"modal-footer"            
//         };
//         super(data,defaults);
//         data._buttons.forEach(button => {
//             let btn_modal = new SpellButton(button);
//             this.append(btn_modal);
//         })
        
        
//     }
// }



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
            "webcam":SpellWebcam
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


