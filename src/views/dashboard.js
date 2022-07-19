
import { SpellButton, SpellLink, SpellView } from "../../lib/spell/ui/spell-core-objects";
import { Spell, SpellUtils, SpellData, SpellUI, SpellUIObject, SpellEventManager } from "/lib/spell/index";




let localCss = /*css*/ `
.login-form {
    width:"120px";
    background-color: #fff;
    
}
`





export class SidePanel extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "side-panel",
            _html_tag: "div",
            class: "side-panel"

        }
        super(data, defaults);


        let sidePanel = /*html*/ `
            <div id="panel" class="panel">
                <div id="topSection" class="topSection">
                    <div id="logo" class="logo">
                        <img src="/svg/aime-logo.svg" alt="button-img"/>
                    </div>
                    <div id="analytics" class="analytics">
                        <div class="side-panel-button analytics-btn">
                            <img src="/svg/side-button-selected.svg" alt="button-img"/>
                        </div>
                        <div class="side-panel-button analytics-btn">
                            <img src="/svg/side-button.svg" alt="button-img"/>
                        </div>
                    </div>
                    </div>
                    <div id="bottom" class="bottomSection">
                    <div id="worlds" class="worlds">
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world.png" alt="world-img"/>
                            </div>
                            <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world2.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world3.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world3.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world2.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world3.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world2.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world2.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world3.png" alt="world-img"/>
                        </div>
                        <div class="side-panel-button worlds-btn">
                            <img src="/images/dashboard/world.png" alt="world-img"/>
                        </div>
                        </div>
                        
                    <div class="time-fps">
                        <div class="side-panel-button"><label id="high-fps-real-time-label" _data_source="sys-time" text="${Date.now()}"/></div>
                        <div class="side-panel-button"><label id="fps" _data_source="fps" _format="FPS: _$" text="${Date.now()}"/></div>
                    </div>
                </div>
            </div>`

        let domParser = new DOMParser();
        // domParser.parseFromString(template, "text/html")
        let xmlNode = domParser.parseFromString(sidePanel.replaceAll("\n", ""), "text/xml").firstChild
        // console.log(xmlNode.normalize());
        const sj = Spell.parser.xml2spell(xmlNode);
        const sjObj = SpellUI.create(sj)
        console.log("sjo", sjObj);
        this.append(sjObj)
        
    }


    /**
     * onFrame implementation to update the data source for the time label in the template :)
     * @param {Number} frame_number 
     */
    async onFrame(frame_number) {
        const d = new Date()
        const zp = (num, places) => String(num).padStart(places, '0') //leading zero pad function 

        //update SpellData to update the data source
        SpellData.variables["sys-time"] = zp(d.getHours(), 2) + ":" + zp(d.getMinutes(), 2) + ":" + zp(d.getSeconds(), 2)

        // call super onFrame to bubble the event to the child spells
        super.onFrame(frame_number)
    }


}




export class HeaderPanel extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "header-panel",
            _html_tag: "div",
            class: "header-panel"

        }
        super(data, defaults);

        let header = /*html*/ `
        <div class="header">
            <div class="header-panel-left">
                <div class="header-search">
                    <input type="text" placeholder="Search"/>
                </div>
            </div>
    
            <div class="header-panel-right">
                <button id="store-button">Store</button>
                <div id="notification-button">
                    <img src="/images/dashboard/mail.png" alt="settings-icon"/>
                </div>
                <div id="settings-button">
                    <img src="/images/dashboard/settings.png" alt="settings-icon"/>
                </div>
                <div id="user-button">
                    <h2>Hey user!</h2>
                </div>
            </div>
                
            
        </div>`
        // let domParser = new DOMParser();
        // domParser.parseFromString(template, "text/html")
        // let xmlNode = domParser.parseFromString(header.replaceAll("\n", ""), "text/xml").firstChild
        // console.log(xmlNode.normalize());
        const sj = Spell.parser.xmlString2Spell(header);
        const sjObj = SpellUI.create(sj)
        this.append(sjObj)

    }
}
   

export class DashboardWidget extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-widget",
            _html_tag: "div",
            class: "dashboard-widget"

        }
        super(data, defaults);

    }
}

export class DashboardPanel extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-panel",
            _html_tag: "div",
            class: "dashboard-panel"

        }
        super(data, defaults);


        
        //const sidePanel = new SidePanel({_id:"sidePanel"})
        const headerPanel = new HeaderPanel({_id:"headerPanel"})
        const dashboardBody = new SpellView({_id:"dashboard-body"})
        //this.append(sidePanel)
        this.append(headerPanel)
        this.append(dashboardBody)

    }


}


export class DashboardComponent {
    static get_objects() {
        return {
            "side-panel": SidePanel,
            "header-panel": HeaderPanel,
            "dashboard-panel": DashboardPanel,
        }
    }
}


export default DashboardComponent