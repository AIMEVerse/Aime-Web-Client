import path from "path"
import fs from "fs"
import _logger  from "./aime-logger.js"


class AIMESettings {
    
    //defaults
    #data = {
        "folders":{
            "base":"." + path.sep ,
            "settings":"settings",
            "logs":"logs"
        },
        "web-server":{
            "domain":"localhost",
            "http-port":8080,
            "enable-ssl":"no",
            "enable-wormhole":"yes",
            "ssl-settings" : {
                "https-port":436,
                "ssl-pk-file"    : "N/A",
                "ssl-cert-file"  : "N/A",
                "ssl-chain-file" : "N/A"
            }
        }
    }

    constructor() {
        this.#check_folders()
        this.#load_settings()
    }


    #check_folders() {
        const f = this.#data.folders
        const sfolder = f.base + path.sep + f.settings 
        if(!fs.existsSync(sfolder)) {
            fs.mkdirSync(sfolder)
            _logger.log("Creating setting folder")
        }
    }

    #load_settings() {
        const f = this.#data.folders
        const sfile = f.base + path.sep + f.settings + path.sep + "aime.json"
        if(!fs.existsSync(sfile)) {
            fs.writeFileSync(sfile,JSON.stringify(this.#data))
            _logger.log("Creating setting file for first time")
        }
    }


    get data() {
        return this.#data
    }

    set data(d) {
        this.#data = d
    }



}


const aime_settings = new AIMESettings()

export default aime_settings

