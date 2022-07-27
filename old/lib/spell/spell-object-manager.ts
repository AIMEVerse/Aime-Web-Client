import SpellEventManager from "./spell-event-manager"
import SpellObject from "./spell-object";

class SpellObjectManager {
    object_classes: {};
    spell_objects: {};
    names_index: {};
    constructor() {
        this.object_classes = {};
        this.spell_objects = {};
        this.names_index = {}
        this.init()
    }

    init(){
        
    }

    /**
     *
     * @param spell_objects - key value list -> {"view":SpellView,...}
     */
    registerObjects(spell_objects:{}):void {
        let names = Object.keys(spell_objects)
        names.forEach(name => this.registerObject(name, spell_objects[name]))
    }

    registerObject(name:string, spell_object:SpellObject) {
        this.object_classes[name] = spell_object;
    }

    hasObjectClass(name) {
        return this.object_classes.hasOwnProperty(name);
    }

    getObjectClass(name) {
        return this.object_classes[name];
    }

    getAllClasses() {
        return this.object_classes;
    }

    addObject(spell_object) {
        if (spell_object && spell_object._id) {
            this.spell_objects[spell_object._id] = spell_object
            if (!spell_object.name || spell_object.name.length==0) {
                spell_object.name = spell_object._id
            }
            this.names_index[spell_object.name] = spell_object._id
            SpellEventManager.fire("spell-on-change")
        }
        else {
            console.log("unable to add object")
        }
    }

    // TO-DO - remove object
    remove_object(spell_object_id) {
        this.spell_objects[spell_object_id] = null;
    }

    getObject(spell_object_id) {
        //console.log(this.spell_objects);
        return this.spell_objects[spell_object_id]
    }


    getObjectByName(object_name) {
        if(this.names_index[object_name]) {
            return this.getObject(this.names_index[object_name])
        } 
        return null
    }
}

export default SpellObjectManager