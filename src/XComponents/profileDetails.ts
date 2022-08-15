
import { Xpell, XUtils, XData, XUI, XEventManager as XEM, XUIObject, XObjectPack } from 'xpell'
import { DashboardLoader, DashboardPanel } from './dashboard2'





export class AimeProfileDetails extends XUIObject {
  constructor(data) {

    const ids = XUtils.guid()
    const defaults = {
      _ids: ids,
      _type: "aime-profile-details",
      _html_tag: "div",
      class: "aime-profile-details"

    }
    super(data, defaults);
// <div class=""></div>
    let aimeProfileDetails = /* html */`
          <div class="aime-user-details widget">
            test

          </div>
        
        `


    const sj = Xpell.parser.xmlString2Xpell(aimeProfileDetails);
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
      "aime-profile-details": AimeProfileDetails
    }
  }
}


export default ProfileComponent