/**
 * Aime Web Client - main entry point
 * Author       : Tamir Fridman
 * Date Created : 21/01/2024
 * License      : GNU GPL v3+
 * Copyright    : AIME Technologies 2024, all right reserved
 */

import {
    Xpell as _x,
    XUI, XData as _XD, _xem, Wormholes, WormholeEvents
} from 'xpell'

import * as AimeAPI from './aime-api/aime'
import "/public/style/aime.css"





const main = async () => {

    _x.loadModule(XUI); // load XUI module
    _x.start() // start Xpell frame counter


    const wormholeServer = "localhost:3030"
    const wormholeUrl = "ws://" + wormholeServer + "/" // wormhole server url (localhost)






    Wormholes.open(wormholeUrl)


    // XUI View 
    const mainView = {
        _type: "view", //xpell attribute starts with underscore "_"
        _id: "main-view",
        _parent_element: "xplayer",
        class: "main-view", //non-xpell attribute starts without underscore "_"
        _children: [
            //Navigation bar
            {
                _type: "view",
                _id: "nav-bar",
                class: "nav-bar",
                _children: [
                    {
                        _type: "image",
                        _id: "aime-logo",
                        class: "nav-bar-logo",
                        src: "/public/svg/aime-logo-full.svg"
                    },
                    {
                        _type: "view",
                        _id: "nav-bar-title",
                        class: "nav-bar-title",
                        _text: wormholeServer
                    },
                    {
                        _type: "view",
                        _id: "server-status-led",
                        class: "server-status-led",
                        _on: {
                            [WormholeEvents.WormholeOpen]: async (xobj, e) => {
                                xobj.dom.style.backgroundColor = "green"
                            },
                            [WormholeEvents.WormholeClose]: async (xobj, e) => {
                                xobj.dom.style.backgroundColor = "red"
                            }
                        }
                    }
                ]
            },
            // main content
            {
                _type: "view",
                _id: "main-content",
                class: "main-content",
                _children: [
                    {
                        _type: "view",
                        _id: "main-content-buttons-bar",
                        class: "main-content-buttons-bar",
                        _children: [
                            {
                                _type: "button",
                                _id: "btn-get-environment-name",
                                class: "main-content-button",
                                _text: "Get Environment Name",
                                _on_click: async (xobj, e) => {
                                    (<any>XUI.getObject("main-content-command-bar-input")).dom.value = JSON.stringify(AimeAPI.env._get_environment_name)
                                }
                            },
                            {
                                _type: "button",
                                class: "main-content-button",
                                _text: "Add User",
                                _on_click: async (xobj, e) => {
                                    (<any>XUI.getObject("main-content-command-bar-input")).dom.value = JSON.stringify(AimeAPI.users._add_user)
                                }
                            },
                            {
                                _type: "button",
                                class: "main-content-button",
                                _text: "Auth User",
                                _on_click: async (xobj, e) => {
                                    (<any>XUI.getObject("main-content-command-bar-input")).dom.value = JSON.stringify(AimeAPI.users._auth_user)
                                }
                            }
                        ]
                    },
                    {
                        _type: "view",
                        _id: "main-content-command-bar",
                        class: "main-content-command-bar",
                        _children: [
                            {
                                _type: "view",
                                _id: "main-content-command-bar-label",
                                class: "main-content-command-bar-label",
                                _text: "Command"
                            },
                            {
                                _type: "textarea",
                                _id: "main-content-command-bar-input",
                                class: "main-content-command-bar-item",
                                style: "height: 200px;",
                                _text: "request"
                            },
                            {
                                _type: "view",
                                _id: "main-content-command-bar-send",
                                class: "main-content-command-bar-send",
                                _children: [
                                    {
                                        _type: "button",
                                        class: "main-content-button",
                                        _text: "Send",
                                        _on_click: async (xobj, e) => {
                                            const req = JSON.parse((<any>XUI.getObject("main-content-command-bar-input")).dom.value)
                                            let res = ""
                                            try {
                                                res = await Wormholes.sendSync(req);
                                                console.log(res)
                                                if(typeof res == "object") {
                                                    res = JSON.stringify(res, null, 2)
                                                } 
                                            } catch (e) {
                                                res = e
                                            }
                                            (<any>XUI.getObject("main-content-command-bar-send")).setText(res)

                                        }
                                    }
                                ]



                            },
                            {
                                _type: "view",
                                _id: "main-content-command-bar-label",
                                class: "main-content-command-bar-label",
                                _text: "Response"
                            },
                            {
                                _type: "xhtml",
                                _html_tag:"pre",
                                _id: "main-content-command-bar-send",
                                class: "main-content-command-bar-item",
                                _text: "Response"
                            }
                        ]
                    },

                ]
            }
        ]
    }

    XUI.loadControl(mainView)





}

main().then()

