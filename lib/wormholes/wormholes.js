/*
 Node JS Wormhole Server & Client
 Author       : Captain Crypto
 Date Created : 03/03/2022
 Copyright AIME Web3 Technologies 2022, all right reserved

 This file is a Wormhole server
    V1 -> TCP
    V2 -> Websockets

 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */




 
 

import path from "path"
import fs from "fs"
import net from "net"

const _DEFAULTS = {
    "server": {
        "tcp-port":9999
    }
}
 
const _WH_VERIFIED_PCS = "_vps"

let c_force_ssl = false;
 
 

 class Wormholes {
    constructor(){
        this.wormholes = {} //wormholes
        this.wid_pid = {} //wid - process-id index
        this.archive = { //archive 
            wormholes:{} //archived wormholes connection (without the socket)
        }
        this.status = "New"
        this.tcp_server = null,
        this.on_message = null
        this.settings = _DEFAULTS
        
         
    }


    start(on_message) {
        this.on_message = on_message
        this.tcp_server = net.createServer();
        let server = this.tcp_server

        server.on('connection', (c) => {wh.handle_connection(c)});

        try {
            const port = this.settings.server["tcp-port"]
            server.listen(port, () => {    
                this.status = "Listen"
                console.log("--==|Wormhole is listening on TCP [" + port + "]|==--");
            });    
        } catch(e) {
            console.log("--==|WORMHOLE ERROR !!!|==--");
            console.error(e);
            console.log("--==|WORMHOLE IS CLOSED|==--");
        }
    }

    /**
     * Get Wormhole id from socket 
     */
     
    get_wid(_socket) {
        return _socket.remoteAddress + ":" + _socket.remotePort;
    }

    

    add_connection(wid,conn,direction = "incoming",is_websocket = false)
    {
        
        let s_con = {
            "connect-time":Date.now(),
            "authenticated":false,
            "sender":conn.remoteAddress,
            "is-websocket":is_websocket,
            "direction":direction,
            "status":"open",
            _socket:conn
        }
        s_con._socket.setEncoding?.('utf8');
        this.wormholes[wid] = s_con
        console.log("--==|Wormhole New Bot Connection " + direction + "[" + wid + "] |==--");
    }


    close_wormhole(wid) {
        if(this.wormholes[wid] && this.wormholes[wid]._socket) {
            try{
                this.wormholes[wid]._socket.destroy()
            } 
            catch(e) {
                console.log("--==|Wormhole ERROR [" + err + "]|==--")
            }
        }
        
    }

    remove_connection(wid)
    {
        
        delete this.wormholes[wid]._socket
        if(this.wormholes[wid]["bot-id"] && this.wid_pid["bot-id"]){
            delete this.wid_pid["bot-id"] //delete index
        }
        let archive = JSON.parse(JSON.stringify(this.wormholes[wid]))  //deep clone
        archive["close-time"] = Date.now()
        archive["status"] = "archived"
        
        this.archive.wormholes[wid] = archive
        
        delete this.wormholes[wid]
        
        console.log("--==|Wormhole Closed [" + wid + "]|==--");
    }


    handle_connection(conn,dir = "incoming") {   
        /**
         * Get Wormhole ID 
         */
        const out = (dir == "outgoing")
        
        //console.dir(conn)
        const wid = this.get_wid(conn) 
        this.add_connection(wid,conn,dir)
        
        conn.setEncoding('utf8');
        if(!out){
            conn.on('data', (msg)=> {wh.on_message(wid,msg.replace(/\r?\n|\r/g, " ")) })
        }
        else {
            conn.on('data', (msg)=> {console.log("client-msg");wh.on_client_message(wid,msg.replace(/\r?\n|\r/g, " ")) })
        }
        
        conn.once('close', (c) =>{wh.remove_connection(wid)});  
        conn.on('error', (err) => {  
            console.log("--==|Wormhole ERROR [" + err + "]|==--")
        });    
        return wid                 
    }

    send_wormhole_message(wid,msg) {
        const wh = this.wormholes[wid]
        if(wh && wh._socket && wh.status == "open") {
            //console.log(msg)
            if(wh["is-websocket"]) {
                wh._socket.send(msg,'utf8')
            }else {
                wh._socket.write(msg,'utf8')
            }
            
        }
    }

    get_wh_by_bot_id (bid) {
        // console.log(this.wid_pid);
        return  this.wid_pid[bid]
    }



    //verified sealed command
    verify_pc(pc){
        const wid = pc.context.sender
        const rv = (wh.wormholes[wid] && 
            wh.wormholes[wid][_WH_VERIFIED_PCS] &&
            wh.wormholes[wid][_WH_VERIFIED_PCS][pc.id] &&  wh.wormholes[wid][_WH_VERIFIED_PCS][pc.id].dateCreated == pc.dateCreated)
        if(rv)    
        {
            delete wh.wormholes[wid][_WH_VERIFIED_PCS][pc.id]
        }
        return rv   
    }

    //seal  command with wormhole for future execute
    seal_pc(pc){
        const wid = pc.context.sender
        if(wh.wormholes[wid])
        {
            if(!wh.wormholes[wid][_WH_VERIFIED_PCS]){
                wh.wormholes[wid][_WH_VERIFIED_PCS] = {}
            }
            wh.wormholes[wid][_WH_VERIFIED_PCS][pc.id] = pc
        }
        else {
            throw "Sender not authorized"
        }
        
        wh.wormholes[wid]
    }
    

    auth_wormhole(wid,bot_id) {
        this.wormholes[wid].authenticated = true
        this.wormholes[wid]["login-time"] = Date.now()
        this.attach_wh_to_bot(wid,bot_id)
        console.log("--==>|Wormhole Login  [" + bot_id + "]|<==--")
    }

    attach_wh_to_bot(wid,bot_id){
        this.wormholes[wid]["bot-id"] = bot_id
        this.wid_pid[bot_id] = wid
        console.log(`--==|Wormhole [${wid}] is bot [${bot_id}]|==--`)
    }

    
    //tcp client

    /**
     * connect to remote wormhole tcp server
     * server = {
     *  address:"server-ip",
     *  port:9999,
     *  
     * }
     */
    connect(server,on_message_cb,on_connect_cb,remote_bot_id) {
        console.log(`--==|Wormhole trying to connect |==--`)
        //console.log(server);
        const  client = new net.Socket();
        client.setEncoding('utf8');
        wh.on_client_message = on_message_cb
        client.connect(server.port, server.address, () => {
            const wid = wh.handle_connection(client,"outgoing")
            wh.attach_wh_to_bot(wid,remote_bot_id)
            if(on_connect_cb){
                on_connect_cb(wid)
            }
        });
    }
   
    
 }

 

const wormholes =  new Wormholes()
const wh = wormholes
export default wormholes
 


