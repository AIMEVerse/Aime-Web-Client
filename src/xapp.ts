import "../public/style/aime2.css"

import { Xpell as _X, XUI, XData as _XD } from 'xpell'

import { DashboardComponent } from './XComponents/dashboard2'
import { LoginComponent } from './XComponents/login'
import { ProfileComponent } from './XComponents/profileUserCard'
import { DatingComponent } from './XComponents/datingHud'
import Wormholes from "./wormholes"




async function main() {



    console.log(_X.version)

    _X.loadModule(XUI)
    XUI.importObjects(DashboardComponent)
    XUI.importObjects(LoginComponent)
    XUI.importObjects(ProfileComponent)
    XUI.importObjects(DatingComponent)




    // SpellUI.importObjects(LoginComponent)
    // SpellUI.importObjects(DashboardComponent)
    // SpellUI.importObjects(RoomComponent)


    _X.start()


    const xapp = {
        spell: {
            version: 1
        },
        views: {
            // "login-view": {
            //     _type: "view",
            //     _id: "login-view",
            //     animation: "fade",
            //     _children:[{
            //         _type:"svg"
            //     }]
            // },
            "dashboard-login": {
                _type: "dashboard-login",
                _id: "dashboard-login",
                animation: "fade",
            },
            "dashboard-panel": {
                _type: "dashboard-panel",
                _id: "dashboard-panel",
            },
            "aime-profile-card": {
                _type: "aime-profile-card",
                _id: "aime-profile-card",
            },
            "dating-hud": {
                _type: "dating-hud",
                _id: "dating-hud",
                _children:
                    [{
                        _type: "view",
                        _children:
                            [{
                                _type: "button",
                                _id: "dating-hud",
                                text: "Test button"
                            },
                            {
                                _type: "button",
                                _id: "dating-hud",
                                text: "Test button"
                            }]
                    }]


            },
            defaults: {
                view: "dashboard-login"
            },
            player: {
                html_element: "xplayer"
            }

        }


    }



    let playersDataSource = {}



    //update XData object 

    _XD.objects["players-list"] = playersDataSource


    XUI.loadApp(xapp)

    XUI.vm.showView("aime-profile-card")
    // XUI.vm.showPage("aime-profile-card")

    // setTimeout(() => {
    //     XUI.vm.showPage("dashboard-panel")
    // }, 3000)

    // const callUrl = "http://127.0.0.1:8080/users/online"
    // fetch(callUrl) .then((response) => response.json())
    // .then((responseJSON) => {
    //     _XD.objects["players-list"] = responseJSON

    // });

    type AIMEUser = {
        _id?: string  //db object-id
        userName: string,
        firstName: string,
        lastName: string,
        password: string
    }

    const user: AIMEUser = {
        userName: "tamirf",
        firstName: "Tamir",
        lastName: "Fridman",
        password: "1234"
    }


    const wormholeUrl = "ws://127.0.0.1:8080/"
    const xMessage = {
        module: "user-manager",
        op: "addNewUser",
        params: {
            user: user
        }
    }

    const xMessage2 = {
        module: "user-manager",
        op: "checkName",
        params: {
            userName: "tamirf"
        }
    }

    Wormholes.open(wormholeUrl)

    document.addEventListener("wormhole-open", (e) => {

        Wormholes.send(xMessage2, (data) => {
            console.log("data", data);

        })
    })

    const loader = {
        _type: "dashboard-loader",
        _id: "dashboard-loader2",
        animation: "fade",
        _parent_element: "xcontrols"
    }


    // XUI.loadControl(loader)

}

main().then()

