import SpellEventManager from "./spell-event-manager.js"

class SpellObjectManager {
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
    register_objects(spell_objects) {
        let names = Object.keys(spell_objects)
        names.forEach(name => this.register_object(name, spell_objects[name]))
    }

    register_object(name, spell_object) {
        this.object_classes[name] = spell_object;
    }

    has_object_class(name) {
        return this.object_classes.hasOwnProperty(name);
    }

    get_object_class(name) {
        return this.object_classes[name];
    }

    get_all_classes() {
        return this.object_classes;
    }

    add_object(spell_object) {
        if (spell_object && spell_object._id) {
            //console.log("adding " + spell_object._type + " as " + spell_object._id)
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

    get_object(spell_object_id) {
        //console.log(this.spell_objects);
        return this.spell_objects[spell_object_id]
    }


    get_object_by_name(object_name) {
        if(this.names_index[object_name]) {
            return this.get_object(this.names_index[object_name])
        } 
        return null
    }
}

export default SpellObjectManager