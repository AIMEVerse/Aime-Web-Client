
import { Xpell, XUtils, XData, XUI, XEventManager as XEM, XUIObject, XObjectPack } from 'xpell'






export class DashboardLogin extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-login",
            _html_tag: "div",
            class: "dashboard-login"

        }
        super(data, defaults);

        let dashboardLogin = /* html */`
        <div class="login-container">
        <div class="forms-container">
          <div class="signin-signup">
      
            <form action="#" class="sign-in-form">
              <h2 class="title">Sign In </h2>
              <div class="input-field">
                <xhtml _html_tag="i" class="fas fa-user"></xhtml>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <xhtml _html_tag="i" class="fas fa-lock"></xhtml>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" class="btn solid" />
              <p class="social-text">Or Sign in with social platforms</p>
      
              <!-- ------Social Icons For Sign In Page -------->
              <div class="social-media">
                <a href="#" class="social-icon">
                  <xhtml _html_tag="i" class="fab fa-facebook-f"></xhtml>
                </a>
                <a href="#" class="social-icon">
                  <xhtml _html_tag="i" class="fab fa-twitter"></xhtml>
                </a>
                <a href="#" class="social-icon">
                  <xhtml _html_tag="i" class="fab fa-google"></xhtml>
                </a>
                <a href="#" class="social-icon">
                  <xhtml _html_tag="i" class="fab fa-linkedin-in"></xhtml>
                </a>
              </div>
            </form>
      
            <!-------- Left Side Of Sign Up Page ---------->
            <form action="#" class="sign-up-form">
              <h2 class="title">Sign Up</h2>
              <div class="input-field">
                <xhtml _html_tag="i" class="fas fa-user"></xhtml>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <xhtml _html_tag="i" class="fas fa-envelope"></xhtml>
                <input type="email" placeholder="Email" />
              </div>
              <div class="input-field">
                <xhtml _html_tag="i" class="fas fa-lock"></xhtml>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" class="btn" value="Sign up" />
              <p class="social-text">Or Sign up with social platforms</p>
      
              <!---------  Social Media Icons For Sign Up  ------->
              <div class="social-media">
                <a href="#" class="social-icon">
                  <xhtml _html_tag="i" class="fab fa-facebook-f"></xhtml>
                </a>
                <a href="#" class="social-icon">
                  <xhtml _html_tag="i" class="fab fa-twitter"></xhtml>
                </a>
                <a href="#" class="social-icon">
                  <xhtml _html_tag="i" class="fab fa-google"></xhtml>
                </a>
                <a href="#" class="social-icon">
                  <xhtml _html_tag="i" class="fab fa-linkedin-in"></xhtml>
                </a>
      
              </div>
            </form>
          </div>
        </div>
      
        <!---------- Left Side Of Sign In Page --------->
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New To Our Website ?</h3>
              <p>
                Click the Sign Up button to see the effect...
              </p>
              <button class="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src="/images/aime-logo.svg" class="image" alt="2nd Pic" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>One of us ?</h3>
              <p>
                Click the Sign In to see the effect
              </p>
              <button class="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img style="background-color:red" src="/images/aime-logo.svg" class="image" alt="1 Pic" />
          </div>
      
        </div>
      </div>
        `


        const sj = Xpell.parser.xmlString2Xpell(dashboardLogin);
        const sjObj = XUI.create(sj)
        this.append(sjObj)
    }

    async onMount() {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const solid_btn = document.querySelector(".btn.solid");
        const btn_sign_up = document.querySelector(".btn_sign_up");

        const container = document.querySelector(".container");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
            solid_btn.classList.remove("sign-up-mode");
        });

        solid_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        btn_sign_up.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });
    }


}




export class LoginComponent extends XObjectPack {
    static getObjects() {
        return {
            "dashboard-login": DashboardLogin
        }
    }
}


export default LoginComponent