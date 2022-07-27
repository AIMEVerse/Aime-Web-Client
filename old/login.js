
import { SpellButton, SpellLink } from "../../lib/spell/ui/spell-core-objects";
import { Spell, SpellUtils, SpellData, SpellUI, SpellUIObject, SpellEventManager } from "/lib/spell/index";


export class AIMEForm extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "form",
            _html_tag: "div",
            class: "aime-form",
            _field_type: "text",
            _text_data: "Text"
        }


        const reg_form = {
            name: "register_form",
            on_submit: {

            },
            validate: true,
            fields: [
                { name: "first_name", _field_type: "text", required: "true", placeholder: "Type your name" },
                { name: "last_name", type: "text", placeholder: "Type your last name" },
                { name: "nick_name", type: "text", placeholder: "Type your nickname" },
                { name: "email", type: "text", format: "*@*.*", placeholder: "Type your e-mail" },
                { name: "password", type: "password", placeholder: "Type password" },
                { name: "submit_button", type: "button", _text_data: "Submit" }
            ]

        }


        super(data, defaults);









    }


}



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
            _ids: ids,
            _type: "form-field",
            _html_tag: "div",
            class: "login-form-field",
            _field_type: "text",
            _data_type: "numbers",
            _label:"label text",
            _text_value: "",
            _placeholder:""

        }
        super(data, defaults);





        const sif = /*js*/ `()=>{alert(validateNumbers(this.value))}`

        let lbl = SpellUI.create({ _id: "lbl-" + ids, _type: "label", text: this._label, for: "txt-" + ids })
        let txt = SpellUI.create({ _id: "txt-" + ids, _type: "text", value:this._text_value, type: this._field_type , placeholder:this._placeholder })

        this.append(lbl)
        this.append(txt)
    }

    async onMount() {
        //console.log(this)
        const txt_id = "txt-" + this._ids
        const obj = document.getElementById(txt_id)
        obj.onkeyup = (e) => {
            if (isNaN(obj.value)) console.log("not a number");
        }
    }

}


export class RegistrationForm extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "registration-form",
            _html_tag: "div",
            class: "register-form",
            // _field_type:"text",
            // _data_type:"text",
            // _text_data:"test text"

        }
        super(data, defaults);

        // --Registration--
        // first_name
        // last_name
        // nick_name
        // password
        // email
        // phone *

        // Fields
        const first_nameFF = new FormField({ _id: "firstname", _field_type: "text", _text_data: "Enter your Firstname" })
        const last_nameFF = new FormField({ _id: "lastname", _field_type: "text", _text_data: "Enter a Lastname" })
        const nick_nameFF = new FormField({ _id: "nickname", _field_type: "text", _text_data: "Enter a Nickname" })
        const emailFF = new FormField({ _id: "email", _field_type: "email", _text_data: "Enter Email" })
        const phoneFF = new FormField({ _id: "phone", _field_type: "numbers", _text_data: "Enter Phone number" })
        const pwdFF = new FormField({ _id: "pwd", _field_type: "password", _text_data: "Enter Password" })

        // Buttons & Links
        const btnLogin = new SpellButton({ _id: "btnLogin", text: "Login", class: "login-button" })
        const btnRegiser = new SpellButton({ _id: "btnRegister", text: "Register", class: "login-button" })
        const linkForgot = new SpellLink({ _id: "linkForgot", text: "Forgot password?", class: "login-forgot-link" })

        // Field -Appends
        this.append(first_nameFF)
        this.append(last_nameFF)
        this.append(nick_nameFF)
        this.append(emailFF)
        this.append(phoneFF)
        this.append(pwdFF)

        // Buttons & Links -Appends
        this.append(btnLogin)
        this.append(btnRegiser)
        this.append(linkForgot)



    }

}
// 
export class ProfileEditForm extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "registration-form",
            _html_tag: "div",
            class: "register-form",
            // _field_type:"text",
            // _data_type:"text",
            // _text_data:"test text"

        }
        super(data, defaults);

        // --Profile--
        // Edit profile -
        // Password change
        // Billing address
        // Nickname
        // First name
        // Last name
        // Email
        // Phone number

        // // Fields
        // const first_nameFF = new FormField({ _id: "firstname", _field_type: "text", _text_data: "Enter your Firstname" })
        // const last_nameFF = new FormField({ _id: "lastname", _field_type: "text", _text_data: "Enter a Lastname" })
        // const pwdFF = new FormField({ _id: "pwd", _field_type: "password", _text_data: "Enter Password" })
        // const nick_nameFF = new FormField({ _id: "nickname", _field_type: "text", _text_data: "Enter a Nickname" })
        // const emailFF = new FormField({ _id: "email", _field_type: "email", type: "email", _text_data: "Enter Email" })
        // const phoneFF = new FormField({ _id: "phone", _field_type: "numbers", _text_data: "Enter Phone number" })

        // // Buttons & Links
        // const btnLogin = new SpellButton({ _id: "btnLogin", text: "Login", class: "login-button" })
        // const btnRegiser = new SpellButton({ _id: "btnRegister", text: "Register", class: "login-button" })
        // const linkForgot = new SpellLink({ _id: "linkForgot", text: "Forgot password?", class: "login-forgot-link" })

        // // Field -Appends
        // this.append(billAddFF)
        // this.append(first_nameFF)
        // this.append(last_nameFF)
        // this.append(nick_nameFF)
        // this.append(emailFF)
        // this.append(phoneFF)
        // this.append(pwdFF)

        // // Buttons & Links -Appends
        // this.append(btnLogin)
        // this.append(btnRegiser)
        // this.append(linkForgot)

    }

}


export class Login extends SpellUIObject {

    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "login",
            _html_tag: "div",
            class: "login",
            _base_display: "flex"
            // class: "d-flex flex-column login"
        }
        const template = {
            view: {
                _attr: { _id: "my-view", class: "login" },
                "form-field": { _attr: { _id: "userName", _text_data: "Enter Username" } },
                "form-field": { _attr: { _id: "pwd", _field_type: "password", _text_data: "Enter Password" } },
                button: { _attr: { _id: "btnLogin", text: "Login", class: "login-button" } },
                button: { _attr: { _id: "btnRegister", text: "Register", class: "login-button" } },
                link: { _attr: { _id: "linkForgot", text: "Forgot password?", class: "login-forgot-link" } },
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

        // const userNameFF = new FormField({ _id: "userName", _text_data: "Enter Username" })
        // const pwdFF = new FormField({ _id: "pwd", _field_type: "password", _text_data: "Enter Password" })
        // const btnLogin = new SpellButton({ _id: "btnLogin", text: "Login", class: "login-button" })
        // const btnRegiser = new SpellButton({ _id: "btnRegister", text: "Register", class: "login-button" })
        // const linkForgot = new SpellLink({ _id: "linkForgot", text: "Forgot password?", class: "login-forgot-link" })
        // this.append(userNameFF)
        // this.append(pwdFF)
        // this.append(btnLogin)
        // this.append(btnRegiser)
        // this.append(linkForgot)

    }



}

export class SuperForm extends SpellUIObject{
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "superform",
            _html_tag: "form",
            class: "superform",
            method:"post",
            fields:[]
        }


        super(data, defaults);


        const sample = {
            name:"my-form",
            _id:"my-form",
            method:"post",
            fields: [
                {
                    _field_type:"text",  //form-field-types text/number/email/phone
                    _id:"user-name",
                    _label:"Enter Username",
                    _placeholder:"Enter Username",
                },
                {
                    _field_type:"password",  //form-field-types _label/number/email/phone
                    _id:"user-pwd",
                    _label:"Enter password",
                    _placeholder:"Enter password",
                },
                {
                    _field_type:"email",  //form-field-types _label/number/email/phone
                    _id:"user-email",
                    _label:"Enter password",
                    _placeholder:"password",
                }
            ],
            buttons: [
                {
                     _id: "btnLogin", text: "Login", class: "login-button",
                }
            ]
        }

        sample.fields.forEach(field => {
            
            
            // const skeys = Object.keys(field)
            // let ff_data = {}
            // skeys.forEach(key => {
            //     const v = field[key]
            //     const f = (conv_map[key]) ? conv_map[key] : key
            //     ff_data[f]=v
            //     console.log(f,v);
            // })

            // console.log(ff_data);
            const new_field = new FormField(field) 
            console.log(new_field);
            this.append(new_field)
        })




    }
}

export class LoginComponent {
    static get_objects() {
        return {
            "aime-form": AIMEForm,
            "form-field": FormField,
            "login": Login,
            "registration": RegistrationForm,
            "profile-edit": ProfileEditForm,
            "superform":SuperForm
        }
    }
}


export default LoginComponent