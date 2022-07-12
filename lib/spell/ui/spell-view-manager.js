

/**
 * @class SpellViewManager
 * @description manage views activities
 * */

import * as SE from "../spell-event-manager.js";
import Spell from "../spell.js"
//import * as $ from "/jquery/dist/jquery.js"

let SpellUI = null

class SpellViewManager {

    /**
     * Spell View Manager constructor
     * @member raw_views This object contains the textual JSON representation of views (these are not SpellView objects, uses for caching views before loading)
     * @member views SpellView objects that are ready to use (show, hide...)
     */
    constructor() {
        this.raw_views = {};
        this.views = {};
        this.active_view = null;
        this.active_modal = null;
        this.spell_html_elem = "spell-player" 
        
        this.init();
    }

    init() {
        //handle back functionality for browser
        window.addEventListener('hashchange', this.hashchange)
        SE.SpellEventManager.fire(SE.SpellEvents.vm_loaded)
    }

    /**
     * Creates new SpellView 
     * @description turns view-data (JSON) to a spell object 
     * @param view_data
     * @param auto_add - if true and the view data {view_data} contains a "name" string the new view will be added automatically to the view manager
     * @return {SpellView}
     */
    create_view(view_data, auto_add = true) {

        let new_view = Spell.get_module("spell-ui").create(view_data);
        if (auto_add && view_data.hasOwnProperty("name")) {
            document.querySelector("#" + this.spell_html_element).append(new_view.get_dom_object());
            new_view.on_mount()
            this.add_view(new_view, view_data.name)
        }
        return new_view;
    }


    add_view(view, view_name) {
        this.views[view_name] = view;
    }

    get_view(view_name) {
        return this.views[view_name];
    }

    has_view(view_name) {
        return this.views.hasOwnProperty(view_name)
    }

    add_raw_views(vuz) {
        let rvuz = Object.keys(vuz);
        rvuz.forEach((vu) => this.raw_views[vu] = vuz[vu]);
    }

    add_raw_view(view_name, view_data) {
        this.raw_views[view_name] = view_data
    }

    load_page(default_view_name) {
        let anc = window.location.hash
        if (anc && anc.length > 1) {
            this.active_view = anc.substring(1);
        } else {
            this.active_view = default_view_name;
        }
        this.show_page(this.active_view)
    }


    /**
     * handle the hashchange browser event, used to support Back funcionality.
     */
    hashchange() {
        let anc = window.location.hash
        if (anc && anc.length > 1) {
            let v_name = anc.substring(1);
            if (this.active_view != v_name) {
                Spell.get_module("spell-ui").vm.show_page(v_name)
            }
        }
    }


    
    /**
     * Show view on screen
     * @param {*} view_name 
     */
    show_view(view_name){
        let vu = "", new_view;
        let oncreate = false;
        if (this.has_view(view_name)) {
            new_view = this.get_view(view_name);
        }
        else {
            vu = this.raw_views[view_name];
            vu.name = view_name;
            new_view = this.create_view(vu) //create_view(vu);
            oncreate = true;
        }
        new_view.show()
    }


    /**
     * Show view as page (set as active view and dismiss former active)
     * @param {*} view_name 
     */
    show_page(view_name) {
        let vu = "", new_view;
        let oncreate = false;
        if (this.has_view(view_name)) {
            new_view = this.get_view(view_name);
        }
        else {
            vu = this.raw_views[view_name];
            vu.name = view_name;
            new_view = this.create_view(vu) //create_view(vu);
            oncreate = true;
        }

        //get the active view
        let v_active = this.get_view(this.active_view);
        if (v_active) {
            v_active.hide();
        }
        new_view.show();
        this.active_view = view_name;

        if (oncreate) {
            //temporary should be raplaced with pai-code
            //eval(new_view.oncreate);
        }
        Spell.get_module("spell-ui").open_url("#" + this.active_view);
    }


    /**
     * Show spell modal dialog
     * @param {*} spell_dialog_data 
     */
    show_dialog(spell_dialog_data) {

        if (!spell_dialog_data._id && spell_dialog_data.id) {
            spell_dialog_data._id = "spell-dialog-" + SpellUtils.guid();
        }
        let dialog = new SpellDialog(spell_dialog_data);
        dialog.show()
    }

    hide_dialog(dialog_id) {
        if (!dialog_id) {
            dialog_id = this.active_modal;
        }
        $("#" + dialog_id).modal('hide')
        this.active_modal = null;
    }

}

export default SpellViewManager