import { Spell, Spell3d, Spell3dModule, SpellUI, SpellUIModule, SpellData, SpellEvents, SpellAIModule } from '/lib/spell/index.js'
import { LoginComponent } from './views/login.js'
import "../lib/spell/style/spell.css"
import "../public/style/space-hud.css"

import world from "./spell-world.js"



async function main() {

    const spell_ui = new SpellUIModule()



    Spell.load_module(spell_ui)

    

    //load space-hud to spell-ui module
    spell_ui.engine.import_objects(LoginComponent)


    Spell.start()

    // const hp = spell_ai.create({_type:"handpose"})

    // console.log(hp)

    const spell_app = {
        spell: {
            version: 1
        },
        views: {
            "login-view": {
                _type: "login",
                _id: "login-view",
                animation: "fade",
              
            }
        },
        defaults: {
            view: "login-view"
        },
        player: {
            html_element: "spell-player"
        }

    }


    SpellUI.load_app(spell_app)

    SpellUI.vm.show_view("login-view")



}

main().then()