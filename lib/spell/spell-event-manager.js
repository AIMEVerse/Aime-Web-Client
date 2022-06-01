
export const SpellEvents = {
    engine_init:"spell-init",
    app_loaded:"spell-app-loaded",
    vm_loaded:"spell-vm-loaded",
    engine3d_init:"spell3d-init",
}

class SpellEventManager {

    /**
     * creates and fire event
     */
    static fire(type_arg, options){
        const se = new SpellEvent(type_arg,options)
        SpellEventManager.fire_spell_event(se)
    }

    static fire_spell_event(spell_event) {
        //console.log('fire',spell_event)
        document.dispatchEvent(spell_event)
    }
}

class SpellEvent extends CustomEvent {

    constructor(type_arg, options) {
        super(type_arg, options)
    }

    async fire() {
        SpellEventManager.fire(this)
    }
}

export default SpellEventManager
export {SpellEvent,SpellEventManager}
