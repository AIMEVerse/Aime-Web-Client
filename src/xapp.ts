/**
 * Aime Web Client - main entry point
 * Author       : Tamir Fridman
 * Date Created : 21/01/2024
 * License      : GNU GPL v3+
 * Copyright    : AIME Technologies 2024, all right reserved
 */

import { 
    Xpell as _x,
     XUI, XData as _XD ,_xem,Wormholes,WormholeEvents
} from 'xpell'

import * as AimeAPI from './aime-api/env'
import "/public/style/aime.css"




async function main() {

    _x.loadModule(XUI); // load XUI module
    _x.start() // start Xpell frame counter

    const wormholeUrl = "ws://127.0.0.1:3030/" // wormhole server url (localhost)

    

    

    _xem.on(WormholeEvents.WormholeOpen, async (e) => {
        const res = await Wormholes.sendSync(AimeAPI._get_environment_name)
        console.log(res)
    })

    Wormholes.open(wormholeUrl)


    // XUI View 
    const mainView = {
        _type:"view", //xpell attribute starts with underscore "_"
        _id:"main-view",
        _parent_element:"xplayer",
        class:"main-view", //non-xpell attribute starts without underscore "_"
        _children:[
            {
                _type:"view",
                _id:"nav-bar",
                class:"nav-bar",
                _children:[
                    {
                        _type:"image",
                        _id:"aime-logo",
                        class:"nav-bar-logo",
                        src:"/public/svg/aime-logo-full.svg"
                    },
                    {
                        _type:"view",
                        _id:"nav-bar-title",
                        class:"nav-bar-title",
                        _text:"Aime Web Client"
                    },
                    {
                        _type:"button",
                        _id:"nav-bar-button",
                        _text:"Contact"
                    }
                ]
            }
        ]
    }

    XUI.loadControl(mainView)
     

    


}

main().then()

