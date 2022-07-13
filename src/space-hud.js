/**
 * SpaceHud
 * @description spell-ui package for spell-dashboard 
 * @author Liad P
 * @since  03/03/2022
 * @copyright AIME Web3 Technologies, all right reserved
 *
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
 *
 */

import { Spell, SpellUtils, SpellData, SpellUI, SpellUIObject, SpellEventManager } from "/lib/spell/index.js";



export class HudWindow extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "hud-window",
            _html_tag: "div",
            class: "d-flex flex-column space-hud",
            _title: "lorem ipsum",
            _id: "som-" + ids,
        }
        super(data, defaults);


        this.vtitle = SpellUI.create({ "_type": "view", "_id": "hud-title-" + ids, text: this._title, "class": "space-hud-label space-hud-title" })
        //  this.ppl_label = SpellUI.create({"_type":"label","_id":"hud-label-"+ids,_data_source: "ppl",_format: "Peoples: $ppl","class":"space-hud-label"}) 
        this.ppl_num = SpellUI.create({ "_type": "view", "_id": "hud-label-" + ids, text: "0", _data_source: "ppl", _format: "$ppl", "class": "space-hud-label space-hud-number" })
        this.ppl_label = SpellUI.create({ "_type": "view", "_id": "hud-label-desc-" + ids, text: "People in the office", "class": "space-hud-label" })

        this.vtitle_light = SpellUI.create({ "_type": "label", "_id": "hud-title-light" + ids, text: "Light switch", "class": "space-hud-label space-hud-title" })
        this.light_button = SpellUI.create({ "_type": "button", "_id": "hud-light-button" + ids, text: "💡 Office Light", "class": "space-hud-button" })
        this.light_button2 = SpellUI.create({ "_type": "button", "_id": "hud-light-button2" + ids, text: "💡 Light 2", "class": "space-hud-button" })
        this.light_button3 = SpellUI.create({ "_type": "button", "_id": "hud-light-button3" + ids, text: "💡 Other light", "class": "space-hud-button" })
        this.light_button4 = SpellUI.create({ "_type": "button", "_id": "hud-light-button4" + ids, text: "💡 More Lights!", "class": "space-hud-button" })
        this.light_button5 = SpellUI.create({ "_type": "button", "_id": "hud-light-button5" + ids, text: "💡 More Lights 2!", "class": "space-hud-button" })

        this.append(this.vtitle)
        this.append(this.ppl_num)
        this.append(this.ppl_label)
        this.append(this.vtitle_light)
        this.append(this.light_button)
        this.append(this.light_button2)
        this.append(this.light_button3)
        this.append(this.light_button4)
        this.append(this.light_button5)


    }

    on_frame(frame_number) {
        //console.log(SpellUI.om);
    }
}

export class HudMenu extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "hud-menu",
            _html_tag: "div",
            class: "d-flex flex-column space-hud",
            _title: "lorem ipsum",
            _id: "som-" + ids,
        }
        super(data, defaults);


        this.vtitle = SpellUI.create({ "_type": "view", "_id": "hud-title-" + ids, text: this._title, "class": "space-hud-label space-hud-title" })

        this.light_button = SpellUI.create({ "_type": "button", "_id": "hud-light-button" + ids, text: "Settings", "class": "space-hud-button" })
        this.light_button2 = SpellUI.create({ "_type": "button", "_id": "hud-light-button2" + ids, text: "Controls", "class": "space-hud-button" })
        this.light_button3 = SpellUI.create({ "_type": "button", "_id": "hud-light-button3" + ids, text: "Statistics", "class": "space-hud-button" })
        this.light_button4 = SpellUI.create({ "_type": "button", "_id": "hud-light-button4" + ids, text: "Contact", "class": "space-hud-button" })
        this.light_button5 = SpellUI.create({ "_type": "button", "_id": "hud-light-button5" + ids, text: "Help", "class": "space-hud-button" })

        this.append(this.vtitle)
        this.append(this.light_button)
        this.append(this.light_button2)
        this.append(this.light_button3)
        this.append(this.light_button4)
        this.append(this.light_button5)


    }

    on_frame(frame_number) {
        //console.log(SpellUI.om);
    }
}

export class HudForm extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "hud-form",
            _html_tag: "div",
            class: "d-flex flex-column space-hud",
            _title: "lorem ipsum",
            _id: "som-" + ids,
        }
        super(data, defaults);


        this.vtitle = SpellUI.create({ "_type": "view", "_id": "hud-title-" + ids, text: this._title, "class": "space-hud-label space-hud-title" })
        //  this.ppl_label = SpellUI.create({"_type":"label","_id":"hud-label-"+ids,_data_source: "ppl",_format: "Peoples: $ppl","class":"space-hud-label"}) 
        //    this.ppl_num = SpellUI.create({"_type":"view","_id":"hud-label-"+ids,text: "7","class":"space-hud-label space-hud-number"})
        //    this.ppl_label = SpellUI.create({"_type":"view","_id":"hud-label-"+ids,text: "People in the office","class":"space-hud-label"})

        // this.vtitle_light = SpellUI.create({"_type":"label","_id":"hud-title-light"+ids,text:"Light switch","class":"space-hud-label space-hud-title"})

        this.light_button = SpellUI.create({ "_type": "view", "_html_tag": "input", "_id": "hud-light-button" + ids, placeholder: "Full name", "class": "space-hud-button" })
        this.light_button2 = SpellUI.create({ "_type": "view", "_html_tag": "input", "_id": "hud-light-button2" + ids, placeholder: "Email", "class": "space-hud-button" })
        this.light_button3 = SpellUI.create({ "_type": "view", "_html_tag": "input", "_id": "hud-light-button3" + ids, placeholder: "Organization", "class": "space-hud-button" })
        this.light_button4 = SpellUI.create({ "_type": "view", "_html_tag": "input", "_id": "hud-light-button4" + ids, placeholder: "Contact us", "class": "space-hud-button" })
        this.light_button5 = SpellUI.create({ "_type": "button", "_id": "hud-light-button5" + ids, text: "Send", "class": "space-hud-button" })


        this.append(this.vtitle)
        this.append(this.light_button)
        this.append(this.light_button2)
        this.append(this.light_button3)
        this.append(this.light_button4)
        this.append(this.light_button5)


    }

    on_frame(frame_number) {
        //console.log(SpellUI.om);
    }
}
/*

<input type="checkbox" name="fav-button" id="fav-button-checkbox">
    <label class="fav-button" for="fav-button">♥</label>

    <div class="fav-window">
        <ul>
            <li>AIME's room</li>
            <li>Special AIME</li>
            <li>Back yard</li>
            <li>Portals</li>
        </ul>
    </div>

*/

export class HudFavorites extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "hud-favorites",
            _html_tag: "div",
            class: "hud-favorite",
            _title: "Favorites",
            _id: "som-" + ids,
            _items: []
        }
        super(data, defaults);

        this._controls_loaded = false
        this._ids = ids;
        this.fav_top_section = SpellUI.create({ "_type": "view", "_id": "hud-section-" + ids, "class": "hud-section" })
        this.vtitle = SpellUI.create({ "_type": "label", "_id": "hud-title-" + ids, text: this._title, "class": "space-hud-label" })
        
        // this.add_to_fav = SpellUI.create({ "_type": "label", "_id": "hud-plus-" + ids, text: "+", "class": "space-hud-plus" })
        this.add_to_fav = SpellUI.create({ "_type": "view", "_html_tag": "label", "_id": "hud-plus-" + ids, "class": "space-hud-plus", text: "+"})

        this.chk_box = SpellUI.create({ "_type": "view", "_html_tag": "input", "_id": "fav-button-checkbox" + ids, "class": "fav-button-checkbox", type: "checkbox" })
        this.fav_button = SpellUI.create({ "_type": "view", "_html_tag": "label", "_id": "fav-button" + ids, "class": "fav-button", for: "fav-button-checkbox" + ids })
        

        this.fav_window = SpellUI.create({ "_type": "view", "_id": "fav-window" + ids, "class": "fav-window" })
        this.fav_window_list = SpellUI.create({ "_type": "view", "_id": "fav-list" + ids, "_html_tag":"ul" })


        this._items.forEach(item => {
            item._for_label = "fav-button-checkbox" + ids 
            this.add_item(item)                
        })
        // const item = SpellUI.create({ "_type": "view", "_id": "fav-list-item-" + SpellUtils.guid(), "_html_tag":"label", text:item.title,_data :item.data, for: "fav-button-checkbox" + ids })
        // this.fav_window_list.append(item)

        // const fav_window_list_item = SpellUI.create({ "_type": "view", "_id": "fav-list-item" + ids, "_html_tag":"li", text:"AIME's Room" })
        // const fav_window_list_item2 = SpellUI.create({ "_type": "view", "_id": "fav-list-item2" + ids, "_html_tag":"li", text:"Special AIME" })
        // this._items_views = [fav_window_list_item, fav_window_list_item2]
        // this.fav_window_list.append(fav_window_list_item)
        // this.fav_window_list.append(fav_window_list_item2)


        
        
        // Retreive local storage fav list
        // for (let [key, value] of Object.entries(localStorage)) {
        //     console.log(`${key}: ${value}`);
        // }
        
        this.append(this.chk_box)
        this.append(this.fav_button)
        this.append(this.fav_window)
        this.fav_window.append(this.fav_top_section)
        this.fav_window.append(this.fav_window_list)
        this.fav_top_section.append(this.vtitle)
        this.fav_top_section.append(this.add_to_fav)

        // this.append(this.vtitle)


    }
    add_new_items(item){
        const item_id = "fav-list-item-" + SpellUtils.guid()
        let input = prompt("How would you like to call the new location?", "New location")
        if (input == null) {
            // console.log("null");
            return
        }
        if (input.length > 0) {
            item.title = input
            this.add_item(item)
            
            // Add to local storage
            localStorage.setItem(item.title, item.data)
            console.log("Adding item " + item.title,"Adding data " + JSON.stringify(item.data));
        }
        
    }
    
    // Build favorites list
    add_item(item){
        const item_id = "fav-list-item-" + SpellUtils.guid()
        const item_view = SpellUI.create({ "_type": "view", "_id": item_id, "_html_tag":"label", text:item.title, _data:item.data,for: item._for_label })
        //    const item_view = SpellUI.create({ "_type": "view", "_id": item_id, "_html_tag":"input", type: "text", text:item.title, _data:item.data,for: item._for_label })
        //this._items_views.push(item_view)
        item._view = item_view
        this.fav_window_list.append(item_view)


       if(this._controls_loaded) {
           document.getElementById(item_id).onclick = () => {
            SpellEventManager.fire("fav-click",{detail:item._view._data})
        }
       }
   }

    on_create(){

        // Add a new favorite item
        document.getElementById(this.add_to_fav._id).onclick = () => {
            SpellEventManager.fire("fav-add-item",{detail:this.add_to_fav._data})
        }

        this._items.forEach( item => {
            document.getElementById(item._view._id).onclick = () => {
                SpellEventManager.fire("fav-click",{detail:item._view._data})
            }
        })
        this._controls_loaded = true
    }
}


export class SpaceHudObjects {
    static get_objects() {
        return {
            "hud-window": HudWindow,
            "hud-menu": HudMenu,
            "hud-form": HudForm,
            "hud-favorites": HudFavorites
        }
    }
}





export default SpaceHudObjects