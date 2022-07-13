import { Spell, Spell3d, Spell3dModule, SpellUI, SpellUIModule, SpellData, SpellEvents, SpellAIModule } from '/lib/spell/index'
import { SpaceHudObjects, HudWindow } from './space-hud.js'
import "../lib/spell/style/spell.css"
import "../public/style/space-hud.css"

import world from "./spell-world.js"



async function main() {


    // cdn key for aime museum 
    const model_cdn_key = "4ef19c78-dde0-4f53-a433-2d35071cbd20"

    //load spell modules

    const spell_ui = new SpellUIModule()
    const spell_3d = new Spell3dModule()
    const spell_ai = new SpellAIModule()



    Spell.loadModules([spell_3d, spell_ui, spell_ai])


    //load space-hud to spell-ui module
    spell_ui.importObjects(SpaceHudObjects)


    Spell.start()

    // const hp = spell_ai.create({_type:"handpose"})

    // console.log(hp)


    await spell_ai.run("load-detector handpose")
    spell_ai.run("handpose set-source video-tag:spell-webcam")
    

    await Spell3d.loadWorld(world)


  



    // //load aime museum model
    //const sfile = "https://cdn.pai-net.org/pai-cdn/get-file?cdn-key=" + model_cdn_key  //load from cdn
    const sfile = "/public/models/bot.glb"  //load from public folder



    Spell.execute({
        module: "spell3d",
            op: "load-gltf",
        params: {
            file: sfile
        }
    })


   


    spell_ui.engine.load_control({
        _id: "joystick-1",
        _type: "joystick",
        _parent_element: "spell-controls",
        _joy_options: {
            size: 120,
            multitouch: true,
            maxNumberOfNipples: 1,
            mode: 'static',
            restJoystick: true,
            shape: 'circle',
            // position: { top: 20, left: 20 },
            position: { bottom: '90px', left: '90px' },
            dynamicPage: true,
            color: "grey"
        }
    })


    spell_ui.load_control({
        _type: "spell-dashboard",
        _parent_element: "spell-controls",
    })






    let fav_data = {
        _id: "hud-4",
        _type: "hud-favorites",
        _parent_element: "spell-controls",
        // style: "position: absolute; right:0; top:0;",
        draggable: true,
        _items: [
            { title: "Start", data: { x: -10, y: 1.75, z: 21.3 } },
            { title: "AIME's room", data: { x: -18.02, y: 1.75, z: 0.68 } },
            { title: "Special Room", data: { x: 1.81, y: 1.75, z: -1.442 } }
        ]
    };

    spell_ui.engine.load_control(fav_data)
    //Spell.info()
    //document.getElementById("info-layer").style.display="none"
    //  let v = new SpellView({"text":"HI"})
    //  document.querySelector("#spell-player").innerHTML = v.get_html()



    document.addEventListener('keydown', async (event) => {


        // if (event.key.toLocaleLowerCase() == "~" && event.shiftKey) {
        //     event.preventDefault()
        //     //event.stopPropagation()
        //     toggle_spell()
        //     return 

        // }
        // if (event.key == "Enter") {
        //     event.preventDefault()
        //     send_command()
        //     return;
        // }

        if (event.key == "j") {
            
            Spell.getModule('spell3d').engine.om.spell_objects["pointer"]["onframe"] = "follow-path"
            return;
        }
        else if (event.key == "u") {
            Spell.getModule('spell3d').engine.set_camera_path()
            
            return;
        }
        else if (event.key == "p") {
            Spell.getModule('spell3d').engine.set_camera_path_point()
            return;
        }
        else if (event.key == "o") {
            const format = "png";
            Spell.getModule('spell3d').engine.add_environment_map('/images/space2048/', [
                `px.${format}`,
                `nx.${format}`,
                `py.${format}`,
                `ny.${format}`,
                `pz.${format}`,
                `nz.${format}`,
            ])
            return;
        }
    }, false);


    document.addEventListener('fav-add-item', (event) => {
        const vec = SpellData.objects["joystick-vector"];
        spell_ui.om.spell_objects["hud-4"].add_new_items({ title: "New item", data: { x: vec.x, y: vec.y, z: vec.z } });


    }, false);

    document.addEventListener('fav-click', (event) => {
        send_command2(`pointer position x:${event.detail.x} z:${event.detail.z}`)

    }, false);

    document.addEventListener('mousedown', (event) => {
        //send_command2(`spell3d world_lock_controls`)

        Spell.getModule('spell3d').engine.raycast(event)
    }, false);




    document.addEventListener('spell-add', (event) => {
        const obj = JSON.parse(event.detail)

        if (obj.defaults) {
            console.log(obj)
            const sc = {
                module: "spell3d",
                op: "add",
                params: obj.defaults
            }
            Spell.execute(sc)
        }
    }, false);
}

main().then()