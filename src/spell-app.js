import { Spell, Spell3d, Spell3dModule, SpellUI, SpellUIModule, SpellData, SpellEvents, SpellAIModule } from '/lib/spell/index.js'
import { LoginComponent } from './views/login.js'
import { DashboardComponent } from './views/dashboard.js'
import { RoomComponent } from './views/room.js'
import "../lib/spell/style/spell.css"
// import "../public/style/space-hud.css"



async function main() {

    console.log("sui")
    const spell_ui = new SpellUIModule()



    Spell.load_module(spell_ui)

    

    // spell_ui.import_objects(LoginComponent)
    // spell_ui.import_objects(DashboardComponent)
    spell_ui.import_objects(RoomComponent)


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

    SpellUI.vm.show_view("room-data-view")

    SpellData.variables["rd-room-data-view"] = 10

}

main().then()