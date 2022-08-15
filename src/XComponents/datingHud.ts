
import { Xpell, XUtils, XData, XUI, XEventManager as XEM, XUIObject, XObjectPack } from 'xpell'
import { DashboardLoader, DashboardPanel } from './dashboard2'





export class DatingHud extends XUIObject {
  constructor(data) {

    const ids = XUtils.guid()
    const defaults = {
      _ids: ids,
      _type: "dating-hud",
      _html_tag: "div",
      class: "dating-hud"

    }
    super(data, defaults);

    

  }

}




export class DatingComponent extends XObjectPack {
  static getObjects() {
    return {
      "dating-hud": DatingHud
    }
  }
}


export default DatingComponent