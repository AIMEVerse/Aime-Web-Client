/*
 Web Wormholes Client - manages wormholes session with Wormholes server
 Author       : Captain Crypto
 Date Created : 03/05/2022
 Copyright AIME Web3 Technologies 2022, all right reserved

 
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */

import SpellUtils from "../spell/spell-utils";
import {SpellEventManager,SpellEvent} from "../spell/spell-event-manager";

export class Wormholes_Engine {
    constructor() {
        this.ws = null;
        this.ready = false 
        this.data_waiters = {}
    }



    create_wormhole_msg(msg, type) {
        return {
            id: SpellUtils.guid(),
            type: type,
            msg: msg
        }
    }

    /**
     * Opens a Wormhole to the PAI-BOT on the server (client-to-server wormhole)
     * @param {*} ws_url 
     */
    open_wormhole(ws_url) {

        this.ws = new WebSocket(ws_url);
        
        const sthis = this
        const wss = this.ws;
        const whmsg = this.create_wormhole_msg
        const whdw = this.data_waiters



        this.listener = document.addEventListener("wh-data-res", (e) => {
            const edata = JSON.parse(e.detail)
            whdw[edata["waiter-id"]]?.(edata.data)
        })

        this.ws.onopen = function () {
            sthis.ready = true
            console.log("Wormhole has been created");
        };

        this.ws.onmessage = function (evt) {
            try {
                //console.log("wormhole message",evt)
                let msg = JSON.parse(evt.data)
                let ddata = msg.data
                try {
                    ddata = JSON.parse(msg.data)
                } catch (e) { }
                const sed = {
                    "waiter-id": msg["waiter-id"],
                    data: ddata
                }

                if (msg.id && msg.id == "spell-event") {
                    //let se = new SpellEvent()
                    SpellEventManager.fire(msg.name, { detail: JSON.stringify(sed) });
                }
            } catch (e) {
                console.error(e);
            }

        };

        this.ws.onclose = function () {
            // websocket is closed.
            //document.removeEventListener("wh-data-res")
            console.log("Connection is closed...");
        };
    }

    close_wormhole() {
        this.ws.close()
    }

    send_wh_message(msg, cb = null, type = "json") {
        if (this.ws) {
            let wh_msg = this.create_wormhole_msg(msg, type)


            if (!cb) {
                cb = (data) => {
                    console.log("data-waiter got response", data)
                }
            }
            this.data_waiters[wh_msg.id] = cb
            this.ws.send(JSON.stringify(wh_msg))
        }
    }

    stringify(obj, esc = true) {
        let no = JSON.stringify(obj)
        if (esc) { no = no.replace(/\"/g, "\\\"") }
        return no
    }
}

const Wormholes = new Wormholes_Engine()

export {Wormholes}

export default Wormholes


