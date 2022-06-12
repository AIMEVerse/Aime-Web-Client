/**
 * Spell.JS Entry Point
 * 
 * Exports the following objects to Spell.js module (import/requires) 
 */


import Spell from "./spell.js"
import {SpellUI,SpellUIModule,SpellUIObject} from "./ui/spell-ui"
import {Spell3d,Spell3dModule,Spell3dObject} from "./3d/spell3d.js"
import {SpellAIModule} from "./ai/spell-ai.js"
import SpellUtils from "./spell-utils.js"
import SpellData from "./spell-data.js"
import SpellObjectManager from "./spell-object-manager.js"
import {SpellCLIParser as SpellParser} from "./spell-parser.js"
import SpellModule from "./spell-module.js"
import {SpellEventManager,SpellEvents,SpellEvent} from  "./spell-event-manager.js"
// import {Wormholes,Wormholes_Engine} from "./pai/wormholes.js"
// import {PAIWebBot,PAIWebVoice} from "./pai/pai-web-bot.js"


export default Spell

export {
    Spell,
    SpellUtils,
    SpellData,
    SpellParser,
    SpellModule,
    SpellEvent,
    SpellEvents,
    SpellEventManager,
    SpellObjectManager,
    SpellUI,
    SpellUIObject,
    SpellUIModule,
    Spell3d,
    Spell3dModule,
    Spell3dObject,
    SpellAIModule
}
