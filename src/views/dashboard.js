
import { SpellButton, SpellLink } from "../../lib/spell/ui/spell-core-objects";
import { Spell, SpellUtils, SpellData, SpellUI, SpellUIObject, SpellEventManager } from "/lib/spell/index.js";




let localCss = /*css*/ `
.login-form {
    width:"120px";
    background-color: #fff;
    
}
`


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
     * on_frame implementation to update the data source for the time label in the template :)
     * @param {Number} frame_number 
     */
    async on_frame(frame_number) {
        const d = new Date()
        const zp = (num, places) => String(num).padStart(places, '0') //leading zero pad function 

        //update SpellData to update the data source
        SpellData.variables["sys-time"] = zp(d.getHours(), 2) + ":" + zp(d.getMinutes(), 2) + ":" + zp(d.getSeconds(), 2)

        // call super on_frame to bubble the event to the child spells
        super.on_frame(frame_number)
    }


}



let header = /*html*/ `
    <div class="header">
        <div class="header-search">
            search
        </div>
        <div class="header-button">
            button
        </div>
    </div>
`
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


        let domParser = new DOMParser();
        // domParser.parseFromString(template, "text/html")
        let xmlNode = domParser.parseFromString(header.replaceAll("\n", ""), "text/xml").firstChild
        // console.log(xmlNode.normalize());
        const sj = Spell.parser.xml2spell(xmlNode);
        const sjObj = SpellUI.create(sj)
        console.log("sjo", sjObj);
        this.append(sjObj)

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


        
        const sidePanel = new SidePanel({_id:"sidePanel"})
        const headerPanel = new HeaderPanel({_id:"headerPanel"})
        this.append(sidePanel)
        this.append(headerPanel)

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