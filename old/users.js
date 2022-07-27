
import { SpellButton, SpellLink } from "../../lib/spell/ui/spell-core-objects";
import { Spell, SpellUtils, SpellData, SpellUI, SpellUIObject, SpellEventManager } from "/lib/spell/index";






export class Users extends SpellUIObject {
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


        // let domParser = new DOMParser();
        // domParser.parseFromString(template, "text/html")
        // let xmlNode = domParser.parseFromString(header.replaceAll("\n", ""), "text/xml").firstChild
        // console.log(xmlNode.normalize());
        const sj = Spell.parser.xmlString2Spell(header);
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