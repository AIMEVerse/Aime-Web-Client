import "../public/style/aime.css"

import {XPell as _X, XUI} from 'xpell/XPellLib'





async function main() {

    

    console.log (_X.version)

    _X.loadModule(XUI)


    

    // SpellUI.importObjects(LoginComponent)
    // SpellUI.importObjects(DashboardComponent)
    // SpellUI.importObjects(RoomComponent)


    _X.start()

    
    const xapp = {
        spell: {
            version: 1
        },
        views: {
            "login-view": {
                _type: "view",
                _id: "login-view",
                animation: "fade",
            }
        },
        defaults: {
            view: "login-view"
        },
        player: {
            html_element: "xplayer"
        }

    }





    
    XUI.loadApp(xapp)

    XUI.vm.showView("login-view")

    

}

main().then()