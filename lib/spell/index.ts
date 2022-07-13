/**
 * Spell.JS Entry Point
 * 
 * Exports the following objects to Spell.js module (import/requires) 
 */


import Spell from "./spell"
import {SpellUI,SpellUIModule,SpellUIObject} from "./ui/spell-ui"
import {Spell3d,Spell3dModule,Spell3dObject} from "./3d/spell3d"
import {SpellAIModule} from "./ai/spell-ai"
import SpellUtils from "./spell-utils"
import SpellData from "./spell-data"
import SpellObjectManager from "./spell-object-manager"
import {SpellParser} from "./spell-parser"
import SpellModule from "./spell-module"
import {SpellEventManager,SpellEvents,SpellEvent} from  "./spell-event-manager"


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
