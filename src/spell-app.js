import { Spell,  SpellUI, SpellData } from '/lib/spell/index'
import { LoginComponent } from './views/login.js'
import { DashboardComponent } from './views/dashboard.js'
import { RoomComponent } from './views/room.js'
import "../lib/spell/style/spell.css"
// import "../public/style/space-hud.css"



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

    //const spell_ui = new SpellUIModule()



    Spell.loadModule(SpellUI)

    

    // spell_ui.importObjects(LoginComponent)
    // spell_ui.importObjects(DashboardComponent)
    SpellUI.importObjects(RoomComponent)


    Spell.start()

    
    const spell_app = {
        spell: {
            version: 1
        },
        views: {
            // "login-view": {
            //     _type: "login",
            //     _id: "login-view",
            //     animation: "fade",
            // },
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
            view: "room-data-view"
        },
        player: {
            html_element: "spell-player"
        }

    }

    
    SpellUI.load_app(spell_app)

    SpellUI.vm.showView("room-data-view")

    SpellData.variables["rd-room-data-view"] = dashboard_data.spaces[0].users.online.length

}

main().then()