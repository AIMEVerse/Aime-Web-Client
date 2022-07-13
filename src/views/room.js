import { SpellButton, SpellLink } from "../../lib/spell/ui/spell-core-objects";
import { Spell, SpellUtils, SpellData, SpellUI, SpellUIObject, SpellEventManager } from "/lib/spell/index";


   
export class RoomData extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "room-data",
            _html_tag: "div",
            class: "room-data",
            _room_id:"my-room"

        }
        super(data, defaults);

    

        const xmlTemplate = /*xml*/ `<view _id="${this._id}-iv" class="room-data-iv">
            <view _id="${this._id}-rn-outer"><label _id="${this._id}-room-name" text="room id: ${this._id}"/></view>
            <view _id="${this._id}-ou-outer"><label _id="${this._id}-online-users" _data_source="rd-${this._id}" _format="online users: _$" text="online users: 0"/></view>
        </view>`

        const iv = SpellUI.create(Spell.parser.xmlString2Spell(xmlTemplate))
        this.append(iv)

    }


}


export class RoomComponent {
    static get_objects() {
        return {
            "room-data": RoomData
        }
    }
}


export default RoomComponent