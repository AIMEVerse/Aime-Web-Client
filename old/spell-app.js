import { Spell,  SpellUI, SpellData } from '/lib/spell/index'
import { LoginComponent } from './views/login.js'
import { DashboardComponent } from './views/dashboard.js'
import { RoomComponent } from './views/room.js'
import "../lib/spell/style/spell.css"
import "../public/style/aime.css"

import XPell from 'xpell/XPellLib'


const dashboard_data = {
    org:"aime",
    spaces:[
        {
            _id:"aime-dcl-space",
            platform:"dcl",
            metadata:{
                cords:[0,0]
            },
            users:{
                online:[
                    {
                        user_id:"tamir",
                        user_name:"unknown",
                        avatar:{
                            images:["/images/avatars/my_avatar.jpg"]
                        }
                    },
                    {
                        user_id:"liad",
                        user_name:"unknown",
                        avatar:{
                            images:["/images/avatars/my_avatar.jpg"]
                        }
                    },
                    {
                        user_id:"hadar",
                        user_name:"unknown",
                        avatar:{
                            images:["/images/avatars/my_avatar.jpg"]
                        }
                    }
                ]
            }

        }
    ]
}


async function main() {

    

    console.log (XPell.version)


    Spell.loadModule(SpellUI)

    

    // SpellUI.importObjects(LoginComponent)
    SpellUI.importObjects(DashboardComponent)
    SpellUI.importObjects(RoomComponent)


    Spell.start()

    
    const spell_app = {
        spell: {
            version: 1
        },
        views: {
            "login-view": {
                _type: "login",
                _id: "login-view",
                animation: "fade",
            },
            "dashboard-panel": {
                _type: "dashboard-panel",
                _id: "dashboard-panel",
                animation: "fade",
            },
            "room-data-view": {
                _type: "room-data",
                _id: "room-data-view",
                animation: "fade",
            },
            "superform-view": {
                _type: "superform",
                _id: "my-superform"
            }
        },
        defaults: {
            view: "dashboard-panel"
        },
        player: {
            html_element: "spell-player"
        }

    }





    
    SpellUI.load_app(spell_app)

    SpellUI.vm.showView("dashboard-panel")

    SpellData.variables["rd-room-data-view"] = dashboard_data.spaces[0].users.online.length

}

main().then()