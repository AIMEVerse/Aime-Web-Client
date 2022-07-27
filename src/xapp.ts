import "../public/style/aime.css"

import {XPell as _X, XUI,XData as _XD} from 'xpell'

import { DashboardComponent } from './XComponents/dashboard.js'




async function main() {

    

    console.log (_X.version)

    _X.loadModule(XUI)
    XUI.importObjects(DashboardComponent)


    

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
            },
            "dashboard-panel": {
                _type: "dashboard-panel",
                _id: "dashboard-panel",
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






const playersDataSource = [
    {
    id:1,
    name:"Tamir",
    image:"/images/avatars/girl.png",
    online:true,
    favorite:true
},
{
    id:2,
    name:"Liad",
    image:"/images/avatars/girl.png",
    online:true,
    favorite:true
},
{
    id:3,
    name:"Keren",
    image:"/images/avatars/girl.png",
    online:true,
    favorite:true
}
]



//update XData object 

_XD.objects["players-list"] = playersDataSource

    
    XUI.loadApp(xapp)

    XUI.vm.showView("dashboard-panel")

    

}

main().then()