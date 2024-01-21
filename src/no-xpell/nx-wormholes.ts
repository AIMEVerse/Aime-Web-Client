/*
 Web Wormholes Client - manages wormholes session with Wormholes server
 Author       : Tamir Fridman
 Date Created : 03/05/2022
 Copyright AIME Technologies 2022, all right reserved

 
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */

//import WebSocket from WebSocket;



export const WormholeEvents = {
    WormholeOpen: "wormhole-open",
    WormholeClose: "wormhole-close",
    ResponseDataArrived: "wh-data-res",
}




export enum MessageType {
    Text,
    JSON
}


interface WaitersPack {
    [waiterID: string]: CallableFunction
}


interface WormholeMessage {
    id: string,
    type: MessageType,
    data: string
}

export class WormholeInstance {
    _ws: null | WebSocket
    _ready: boolean
    _data_waiters: WaitersPack
    _listener: void | undefined;

    constructor() {
        this._ws = null;
        this._ready = false
        this._data_waiters = {}
    }

    /**
     * Generates GUID (Globally unique Identifier)
     * @returns {string} 
     */
    private guid() {
        let chars = '0123456789abcdef'.split('');
        let uuid:string[] = [], rnd = Math.random, r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4'; // version 4
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | rnd() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r & 0xf];
            }
        }
        return uuid.join('');
    }


    private createMessage(msg: object, type: MessageType = MessageType.JSON): WormholeMessage {
        const oData: string = this.stringify(msg)
        return {
            id: this.guid(),
            type: type,
            data: oData
        }
    }

    /**
     * Opens a Wormhole to the PAI-BOT on the server (client-to-server wormhole)
     * @param {*} url 
     */
    open(url: string) {

        try {

            this._ws = new WebSocket(url);
        } catch (ex) {
            console.log(ex)
        }

        const sthis = this //strong this for anonymous function

        console.log("Wormhole is opening...");

        document.addEventListener(WormholeEvents.ResponseDataArrived, (e) => {
            const edata =JSON.parse( e["detail"])
            sthis._data_waiters[edata["waiterID"]]?.(edata.data)
        })


        if (this._ws) {
            this._ws.onopen = async () => {
                this._ready = true
                console.log("Wormhole has been created");
                // _xd.variables[WormholeEvents.WormholeOpen] = true
                let event = new CustomEvent(WormholeEvents.WormholeOpen)
                document.dispatchEvent(event)
                // _xem.fire(WormholeEvents.WormholeOpen,{},true)

            }

            this._ws.onmessage = async (evt) => {
                try {
                    let msg = JSON.parse(evt.data.toString())
                    let ddata = msg.data
                    try {
                        ddata = JSON.parse(msg.data)
                    } catch (e) { }
                    const sed = {
                        "waiterID": ddata["eid"],
                        data: ddata
                    }

                    let event = new CustomEvent(WormholeEvents.ResponseDataArrived, { detail: JSON.stringify(sed) })
                    document.dispatchEvent(event)
                    // _xem.fire(WormholeEvents.ResponseDataArrived, {sed: sed })

                } catch (e) {
                    console.error(e);
                }

            };

            this._ws.onclose = async () => {
                // websocket is closed.
                //document.removeEventListener("wh-data-res")
                this._ready = false
                console.log("Wormholer is closed...");
                let event = new CustomEvent(WormholeEvents.WormholeClose)
                document.dispatchEvent(event)
            };
        }
    }

    close() {
        this._ws?.close()
    }

    /**
     * sends the message to the server (asynchronous) and return the result in a callback function
     * @param message - the message to send
     * @param cb - Callback Function (data: string) => void
     * @param type - type of the message MessageType.JSON / MessageType.Text
     */
    send(message: any, cb: CallableFunction, type = MessageType.JSON) {
        if (this._ws) {
            let wormholeMessage = this.createMessage(message, type)


            if (!cb) {
                cb = (data: string) => {
                    console.log("data-waiter got response", data)
                }
            }
            this._data_waiters[wormholeMessage.id] = cb
            try {
                this._ws.send(JSON.stringify(wormholeMessage))
            } catch (ex) {
                console.log("ERROR" + ex);

            }
        }
    }

    /**
     * Sends the message to the server and return the result as a response (synchronous) 
     * @param message - the message to send
     * @param checkXProtocol - check the result for XProtocol (True by default, if false the response will be return as is)
     */
    sendSync(message: any, checkXProtocol = true): Promise<WormholeMessage | any> {
        return new Promise((resolve, reject) => {
            Wormholes.send(message, (data) => {
                // console.log("data-waiter got response", data,checkXProtocol);
                //new addition for xprotocol
                // data = data.data
                let res
                if (!data) {
                    res = "ERROR: No response from server"
                    reject(res)
                } else {
                    if (checkXProtocol) {
                        if (data["_ok"]) {
                            resolve(data["_result"])
                        } else {
                            reject(data["_result"])
                        }
                    } else {
                        resolve(data)
                    }
                }
            })
        })
    }

    private stringify(obj: object, esc = false): string {
        let no = JSON.stringify(obj)
        if (esc) { no = no.replace(/\"/g, "\\\"") }
        return no
    }

    // sendWebMBlob(blob) {
    //     // Create a new FormData object
    //     const formData = new FormData();

    //     // Append the WebM blob to the FormData object
    //     formData.append('blob', blob, 'recording.webm');

    //     // Send the FormData object over the WebSocket
    //     if (this.ws) {
    //         // let wormholeMessage = this.createMessage(message, type)


    //         if (!cb) {
    //             cb = (data: string) => {
    //                 console.log("data-waiter got response", data)
    //             }
    //         }
    //         this.dataWaiters[wormholeMessage.id] = cb
    //         try
    //         {
    //             this.ws.send(formData)
    //         } catch (ex) {
    //             console.log("ERROR" + ex);

    //         }
    //     }
    //   }

}

const Wormholes = new WormholeInstance()

export { Wormholes }

export default Wormholes


