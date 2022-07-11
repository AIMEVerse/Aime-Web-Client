
import { SpellButton, SpellLink } from "../../lib/spell/ui/spell-core-objects";
import { Spell, SpellUtils, SpellData, SpellUI, SpellUIObject, SpellEventManager } from "/lib/spell/index.js";




let localCss = /*css*/ `
.login-form {
    width:"120px";
    background-color: #fff;
    
}
`


let template = /*html*/ `<div>
<div spell-desc="username">
    <label id="user_label">myval</label>
    <input id="user_name_input" value="gg"  />
</div>
<div spell-desc="pwd">
    <label>myval</label>
    <input/>
</div>
<div>
    <button>Login</button>
    <button>Register</button>
    <button>Forgot Pawssword</button>
</div>
</div>`


export class FormField extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids:ids,
            _type: "form-field",
            _html_tag: "div",
            class: "login-form-field",
            _field_type:"text",
            _data_type:"numbers",
            _text_data:"test text"
            
        }
        super(data, defaults);

   
    
        

        const sif = /*js*/ `()=>{alert(validateNumbers(this.value))}`

        let lbl = SpellUI.create({_id:"lbl-" + ids, _type:"label",text:this._text_data, for:"txt-" + ids})
        let txt = SpellUI.create({_id:"txt-" + ids, _type:"text",type:this._field_type})
       
        this.append(lbl)
        this.append(txt)
    }

    async on_mount() {
       //console.log(this)
       const txt_id = "txt-" + this._ids
       const obj = document.getElementById(txt_id)
       obj.onkeyup = (e)=>{
        if(isNaN( obj.value)) console.log("not a number");
       }
    }

}

export class Login extends SpellUIObject {

    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "login",
            _html_tag: "div",
            class: "login",
            _base_display:"flex"
            // class: "d-flex flex-column login"
        }
        const template = {
            view:{
                _attr:{_id:"my-view",class:"login"},
                "form-field":{_attr:{_id:"userName",_text_data:"Enter Username"}},
                "form-field":{_attr:{_id:"pwd",_field_type:"password",_text_data:"Enter Password"}},
                button:{_attr:{_id:"btnLogin", text:"Login", class:"login-button"}},
                button:{_attr:{_id:"btnRegister", text:"Register", class:"login-button"}},
                link:{_attr:{_id:"linkForgot", text:"Forgot password?", class:"login-forgot-link"}},
            }
        }


        // const xmlTemplate = /*xml*/ `<view _id="my-view" class="login">
        //     <form-field _id="userName" _text_data="Enter Username"/>
        //     <form-field _id="pwd" _text_data="Enter Password" _field_type="password"/>
        //     <button _id="btnLogin" class="login-button">Login</button>
        //     <button _id="btnRegister" class="login-button" text="Register"/>
        //     <link _id="linkForgot" class="login-forgot-link">Forgot password?</link>
        // </view>`

        // const parser = new DOMParser();
        // const xmlDoc = parser.parseFromString(xmlTemplate,"text/xml");
        // //xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;

       
        
        // console.log(xml2spell(xmlDoc.childNodes[0]));
        // const spl = SpellUI.create_from_template(template)
        // console.log(spl);
       
        super(data, defaults);
       
        const userNameFF = new FormField({_id:"userName",_text_data:"Enter Username"})
        const pwdFF = new FormField({_id:"pwd",_field_type:"password",_text_data:"Enter Password"})
        const btnLogin = new SpellButton({_id:"btnLogin", text:"Login", class:"login-button"})
        const btnRegiser = new SpellButton({_id:"btnRegister", text:"Register", class:"login-button"})
        const linkForgot = new SpellLink({_id:"linkForgot", text:"Forgot password?", class:"login-forgot-link"})
        this.append(userNameFF)
        this.append(pwdFF)
        this.append(btnLogin)
        this.append(btnRegiser)
        this.append(linkForgot)
       
    }

   

}



export class LoginComponent {
    static get_objects() {
        return {
            "login": Login,
            "form-field":FormField
        }
    }
}


export default LoginComponent