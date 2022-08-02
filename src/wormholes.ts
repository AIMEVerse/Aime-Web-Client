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

 //import WebSocket from WebSocket;


 export const  WormholeEvents = {
     ResponseDataArrived:"wh-data-res"
 }
 
 const guid = () =>  {
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
 
 
 export enum MessageType{ 
     Text,
     JSON
 }
 
 
 interface WaitersPack {
     [waiterID:string]:CallableFunction
 }
 

 interface WormholeMessage {
    id:string,
    type:MessageType,
    data:string
 }
 
 class WormholeInstance {
     ws: null | WebSocket
     ready: boolean
     dataWaiters: WaitersPack
     listener: void | undefined;
 
     constructor() {
         this.ws = null;
         this.ready = false 
         this.dataWaiters = {}
     }
 
 
 
     private createMessage(msg:object, type:MessageType = MessageType.JSON) : WormholeMessage {
        const oData:string = this.stringify(msg)
         return {
             id: guid(),
             type: type,
             data: oData
         }
     }
 
     /**
      * Opens a Wormhole to the PAI-BOT on the server (client-to-server wormhole)
      * @param {*} url 
      */
     open(url:string) {
 
         this.ws = new WebSocket(url);
         
         const sthis = this //strong this for anonymous function
         
 
         this.listener = document.addEventListener(WormholeEvents.ResponseDataArrived, (e:any) => {
             const edata = JSON.parse(e.detail)
             sthis.dataWaiters[edata.data["eid"]]?.(edata.data)
         })
 
         this.ws.onopen = function () {
             sthis.ready = true
             console.log("Wormhole has been created");
             let event = new CustomEvent("wormhole-open")
             document.dispatchEvent(event)
          
         }
 
         this.ws.onmessage = function (evt) {
             try {
                 let msg = JSON.parse(evt.data.toString())
                 let ddata = msg.data
                 try {
                     ddata = JSON.parse(msg.data)
                 } catch (e) { }
                 const sed = {
                     "waiterID": msg["eid"],
                     data: ddata
                 }
 
                let event = new CustomEvent(WormholeEvents.ResponseDataArrived,{ detail: JSON.stringify(sed) })
                document.dispatchEvent(event)

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
 
     close() {
         this.ws?.close()
     }
 
     send(message:object, cb:CallableFunction , type = MessageType.JSON) {
         if (this.ws) {
             let wormholeMessage = this.createMessage(message, type)
 
 
             if (!cb) {
                 cb = (data:string) => {
                     console.log("data-waiter got response", data)
                 }
             }
             this.dataWaiters[wormholeMessage.id] = cb
             
             this.ws.send(JSON.stringify(wormholeMessage))
         }
     }
 
     private stringify(obj:object, esc = false):string {
         let no = JSON.stringify(obj)
         if (esc) { no = no.replace(/\"/g, "\\\"") }
         return no
     }
 }
 
 const Wormholes = new WormholeInstance()
 
 export {Wormholes}
 
 export default Wormholes
 
 
 