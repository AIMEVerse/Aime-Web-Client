
import { SpellButton, SpellLink } from "../../lib/spell/ui/spell-core-objects";
import { Spell, SpellUtils, SpellData, SpellUI, SpellUIObject, SpellEventManager } from "/lib/spell/index.js";




let localCss = /*css*/ `
.login-form {
    width:"120px";
    background-color: #fff;
    
}
`


let template = /*html*/ `
<div id="panel" class="panel">
    <div id="topSection" class="flex wrap h-center topSection">
        <div id="logo" class="logo">
            AIME LOGO
        </div>
        <div id="analytics" class="analytics">
            <div class="side-panel-button analytics-btn">
                <img src="/svg/side-button-selected.svg" alt="button-img"/>
            </div>
            <div class="side-panel-button analytics-btn">
                <img src="/svg/side-button.svg" alt="button-img"/>
            </div>
        </div>
        <div id="words" class="worlds">
            <div class="side-panel-button worlds-btn"></div>
            <div class="side-panel-button worlds-btn"></div>
            <div class="side-panel-button worlds-btn"></div>
        </div>
    </div>
    <div id="bottom" class="flex wrap h-center bottomSection">
        <div class="side-panel-button add"><label id="high-fps-real-time-label" _data_source="sys-time" text="${Date.now()}"/></div>
        <div class="side-panel-button add"><label id="fps" _data_source="fps" _format="FPS: $fps" text="${Date.now()}"/></div>
    </div>
</div>`


export class SidePanel extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "side-panel",
            _html_tag: "div",
            class: "login-form-field",
            _field_type: "text",
            _data_type: "numbers",
            _text_data: "test text"

        }
        super(data, defaults);





        // const sif = /*js*/ `()=>{alert(validateNumbers(this.value))}`

        // let panel = SpellUI.create({ _id: "side-panel-" + ids})
        // let topSection = SpellUI.create({ _id: "top-section-" + ids})
        // let bottomSection = SpellUI.create({ _id: "top-section-" + ids})
        // let logoSection = SpellUI.create({ _id: "top-section-" + ids})
        // let analyticsSection = SpellUI.create({ _id: "top-section-" + ids})
        // let worldsSection = SpellUI.create({ _id: "top-section-" + ids})

        // this.append(panel)
        // this.append(topSection)
        // this.append(bottomSection)
        // this.append(logoSection)
        // this.append(analyticsSection)
        // this.append(worldsSection)

        let domParser = new DOMParser();
        // domParser.parseFromString(template, "text/html")
        let xmlNode = domParser.parseFromString(template.replaceAll("\n",""), "text/xml").firstChild
        // console.log(xmlNode.normalize());
        const sj = Spell.parser.xml2spell(xmlNode);
        const sjObj = SpellUI.create(sj)
        console.log("sjo",sjObj);
        this.append(sjObj)

    }

    /**
     * on_frame implementation to update the data source for the time label in the template :)
     * @param {Number} frame_number 
     */
    async on_frame(frame_number){
        const d = new Date()
        const zp = (num, places) => String(num).padStart(places, '0') //leading zero pad function 

        //update SpellData to update the data source
        SpellData.variables["sys-time"] = zp(d.getHours(),2) +":" + zp(d.getMinutes(),2) + ":" + zp(d.getSeconds(),2) 
        
        // call super on_frame to bubble the event to the child spells
        super.on_frame(frame_number)
    }



    // async on_mount() {
    //     //console.log(this)
    //     const txt_id = "txt-" + this._ids
    //     const obj = document.getElementById(txt_id)
    //     obj.onkeyup = (e) => {
    //         if (isNaN(obj.value)) console.log("not a number");
    //     }
    // }

}

// export class Login extends SpellUIObject {

//     constructor(data) {

//         const ids = SpellUtils.guid()
//         const defaults = {
//             _type: "login",
//             _html_tag: "div",
//             class: "login",
//             _base_display:"flex"
//             // class: "d-flex flex-column login"
//         }
//         const template = {
//             view:{
//                 _attr:{_id:"my-view",class:"login"},
//                 "form-field":{_attr:{_id:"userName",_text_data:"Enter Username"}},
//                 "form-field":{_attr:{_id:"pwd",_field_type:"password",_text_data:"Enter Password"}},
//                 button:{_attr:{_id:"btnLogin", text:"Login", class:"login-button"}},
//                 button:{_attr:{_id:"btnRegister", text:"Register", class:"login-button"}},
//                 link:{_attr:{_id:"linkForgot", text:"Forgot password?", class:"login-forgot-link"}},
//             }
//         }


//         const xmlTemplate = /*xml*/ `<view _id="my-view" class="login">
//             <form-field _id="userName" _text_data="Enter Username"/>
//             <form-field _id="pwd" _text_data="Enter Password" _field_type="password"/>
//             <button _id="btnLogin" class="login-button">Login</button>
//             <button _id="btnRegister" class="login-button" text="Register"/>
//             <link _id="linkForgot" class="login-forgot-link">Forgot password?</link>
//         </view>`

//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(xmlTemplate,"text/xml");
//         //xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;



//         console.log(xml2spell(xmlDoc.childNodes[0]));
//         const spl = SpellUI.create_from_template(template)
//         // console.log(spl);

//         super(data, defaults);

//         const userNameFF = new FormField({_id:"userName",_text_data:"Enter Username"})
//         const pwdFF = new FormField({_id:"pwd",_field_type:"password",_text_data:"Enter Password"})
//         const btnLogin = new SpellButton({_id:"btnLogin", text:"Login", class:"login-button"})
//         const btnRegiser = new SpellButton({_id:"btnRegister", text:"Register", class:"login-button"})
//         const linkForgot = new SpellLink({_id:"linkForgot", text:"Forgot password?", class:"login-forgot-link"})
//         this.append(userNameFF)
//         this.append(pwdFF)
//         this.append(btnLogin)
//         this.append(btnRegiser)
//         this.append(linkForgot)

//     }



// }



export class DashboardComponent {
    static get_objects() {
        return {
            "side-panel": SidePanel
        }
    }
}


export default DashboardComponent