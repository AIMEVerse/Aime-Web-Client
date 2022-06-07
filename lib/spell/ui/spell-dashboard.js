/**
 * SpellDashboard
 * @description spell-ui package for spell-dashboard 
 * @author Tamir Fridman <tamirf@yahoo.com>
 * @since  03/05/2022
 * @Copyright AIME Web3 Technologies 2022, all right reserved
 *
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
 *
 */

import SpellUtils from "../spell-utils.js";
import SpellUIObject from "./spell-ui-object.js";
import {
    SpellButton,
    SpellLabel,
    SpellView,
    SpellTextField
} from "./spell-core-objects.js"

export class SpellObjectManagerList extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "spell-om-list",
            _html_tag: "div",
            class: "d-flex flex-column spell-om-list",
            _title: "",
            _om: null,
            _id: "som-" + ids,
            _show_cameras: true,
            _show_lights: false
        }
        super(data, defaults);

        const title = new SpellLabel({
            _id: "som-title-" + ids,
            text: this.title,
            class: "view-title"
        })
        this.append(title)
        const accordion = new SpellView({
            _id: "som-acc-" + ids,
            class: "d-flex flex-column spell-om-acc"
        })


        if (this._om) {
            this.event_listener = document.addEventListener("spell-on-change", (event) => {
                // TO do update the ui with the changes of the event manger
                //console.log(event)
            }, false)

            const lst = this._om.spell_objects
            Object.keys(lst).forEach(key => {
                const so = lst[key]
                if (
                    (this._show_cameras && so._is_camera) ||
                    (this._show_lights && so._is_light) ||
                    (!so._is_light && !so._is_camera)) {

                    const sv = {
                        _id: "eo-" + so._id,
                        _type: "view",
                        text: so.name,
                        class: "spell-om-list-item",
                        onclick: "displayModal('" + so._id + "')"
                        // onclick: "console.log('" + so._id + "')"
                    }
                    const si = new SpellView(sv)
                    //console.log(so)
                    accordion.append(si)
                }

            })
        }

        this.append(accordion)
    }
}



export class SpellObjectManagerInventory extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "spell-om-inventory",
            _html_tag: "div",
            class: "d-flex flex-column spell-object-prop",
            _title: "",
            _om: null,
            _id: "som-" + ids,
            _show_cameras: true,
            _show_lights: false
        }
        super(data, defaults);




        const title = new SpellLabel({
            _id: "som-title-" + ids,
            text: this.title,
            class: "view-title"
        })
        this.append(title)
        const accordion = new SpellView({
            _id: "som-acc-" + ids,
            class: "d-flex flex-column spell-om-acc"
        })

        if (this._om) {
            const lst = this._om.object_classes
            Object.keys(lst).forEach(key => {
                const so = lst[key]
                if (
                    (this._show_cameras && so._is_camera) ||
                    (this._show_lights && so._is_light) ||
                    (!so._is_light && !so._is_camera)) {
                    const ssname = (so.descriptor().name) ? so.descriptor().name : so.name
                    const sv = {
                        _id: "eo-" + so._id,
                        _type: "view",
                        text: ssname,
                        class: "spell-om-list-item",
                        onclick: "add_object('" + JSON.stringify(so.descriptor()) + "')"
                    }
                    const si = new SpellView(sv)
                    accordion.append(si)
                }

            })
        }

        this.append(accordion)
    }
}


export class SpellPropsPair extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "spell-props",
            class: "d-flex flex-row sop-row",
            _id: "sop-" + ids,
            _title: "",
            _value: ""

        }
        super(data, defaults);

        const title = new SpellLabel({
            _id: "sop-lbl-" + ids,
            text: this._title,
            class: "sop-label"
        })
        this.append(title)
        const sv = {
            _id: "sop-txt-" + ids,
            _type: "text",
            value: this._value,
            class: "sop-text"
        }
        const si = new SpellTextField(sv)
        this.append(si)
    }
}

export class SpellDashboard extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "spell-dashboard",
            class: "spell-dashboard",
            style:"display:none",
            _id: "spell-dashboard-" + ids,

        }
        super(data, defaults);

        const fps_lable = new SpellLabel({
            _id: "fps-label",
            _type: "label",
            _data_source: "fps",
            _format: "FPS $fps",
            style: "color:white;position:fixed;left:20px;top:20px"
        })
        this.append(fps_lable)
    }

    on_create() {
        //console.log("dashboard created")
        const sid = this._id
        document.addEventListener('keydown', async (event) => {

            console.log("sid ",sid);
            if (event.key.toLocaleLowerCase() == "~" && event.shiftKey) {
                event.preventDefault()
                event.stopPropagation()
                const player = $("#" +sid)

                player.toggle()
                if (player.is(":visible")) {
                    $("#spell-command").focus();
                }
                return 

            }
            if (event.key == "Enter") {
                event.preventDefault()
                //send_command()
                return;
            }
        }
    )}
    
}









export class SpellDashboardObjects {
    static get_objects() {
        return {
            "spell-om-list": SpellObjectManagerList,
            "spell-props-pair": SpellPropsPair,
            "spell-om-inventory": SpellObjectManagerInventory,
            "spell-dashboard":SpellDashboard
        }
    }
}





export default SpellDashboardObjects