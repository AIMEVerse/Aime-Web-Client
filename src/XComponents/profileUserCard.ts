
import { Xpell, XUtils, XData, XUI, XEventManager as XEM, XUIObject, XObjectPack } from 'xpell'
import { DashboardLoader, DashboardPanel } from './dashboard2'





export class AimeProfileCard extends XUIObject {
  constructor(data) {

    const ids = XUtils.guid()
    const defaults = {
      _ids: ids,
      _type: "aime-profile-card",
      _html_tag: "div",
      class: "aime-profile-card widget"

    }
    super(data, defaults);
    // <div class=""></div>
    /*  <div _html_tag="details">
          <div _html_tag="summary">About player</div>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. text of the printing and typesetting industry. text of the printing and typesetting industry. text of the printing and typesetting industry. text of the printing and typesetting industry. text of the printing and typesetting industry. text of the printing and typesetting industry.</p>
        </div>
    */
    let aimeProfileCard = /* html */`
          <div class="aime-user-card widget">

            <div class="aime-user-card-top">
                <div class="profile-photo">
                  <img src="/images/pikachu2.png" alt="Pikachu02"/>
                </div>
                <div>
                  <b>Admin</b>
                  <p class="text-muted">James Web</p>
                  <span class="fa-regular fa-pen-to-square selectable"></span>
                </div>
            </div>

            <div class="aime-user-fields">
              <div class="aime-user-field">
                <div>
                  <p>Nickname</p>
                </div>
                <div>James123</div>
              </div>

              <div class="aime-user-field">
                <div>
                  <span class="material-icons material-symbols-outlined">mail</span>
                  <p>Email</p>
                </div>
                <div>James@aimeverse.com</div>
              </div>

              <div class="aime-user-field">
                <div>
                  <span class="material-icons material-symbols-outlined">phone</span>
                  <p>Phone</p>
                </div>
                <div>123-123-123</div>
              </div>
            </div>

            

            <div class="aime-user-settings">
              <div class="aime-user-field selectable">
                <div>
                  <span class="material-icons material-symbols-outlined">person</span>
                  <p>Profile Overview</p>
                </div>
                <div><span class="material-icons material-symbols-outlined">navigate_next</span></div>
              </div>

              <div class="aime-user-field selectable">
                <div>
                  <span class="material-icons material-symbols-outlined">description</span>
                  <p>Personal information</p>
                </div>
                <div><span class="material-icons material-symbols-outlined">navigate_next</span></div>
              </div>

              <div class="aime-user-field selectable">
                <div>
                  <span class="material-icons material-symbols-outlined">badge</span>
                  <p>Account information</p>
                </div>
                <div><span class="material-icons material-symbols-outlined">navigate_next</span></div>
              </div>
              
              <div class="aime-user-field selectable">
                <div>
                  <span class="material-icons material-symbols-outlined">shield</span>
                  <p>Change Password</p>
                </div>
                <div><span class="material-icons material-symbols-outlined">navigate_next</span></div>
              </div>
              
              <div class="aime-user-field selectable">
                <div>
                  <span class="material-icons material-symbols-outlined">mail</span>
                  <p>Email settings</p>
                </div>
                <div><span class="material-icons material-symbols-outlined">navigate_next</span></div>
              </div>
              
            </div>

          </div>
        
        `


    const sj = Xpell.parser.xmlString2Xpell(aimeProfileCard);
    const sjObj = XUI.create(sj)
    this.append(sjObj)

  }

  // async onMount() {
  //   super.onMount()

  // }

}




export class ProfileComponent extends XObjectPack {
  static getObjects() {
    return {
      "aime-profile-card": AimeProfileCard
    }
  }
}


export default ProfileComponent