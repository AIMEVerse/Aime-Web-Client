import lights from "./world-lights.js"
import world_objects from "./world-objects.js"


const world = {
    "html-wrapper": "spell3d-player",
    scene: {
        "lights": lights,

        cameras: {
            "main-cam": {
                _type: "perspective-camera",
                fov: 20,
                ratio: window.innerWidth / window.innerHeight,
                _clipping: {
                    far: 5000,
                    close: 0.01
                },
                _position: { x: 0, y: 0, z: 0 },
                _rotation: { x: 0, y: 0, z: 0 },
                _disable_frame_3d_state: true
            }
        },
        controls: {
            "cam-control": {
                _type: "orbit",
                _active: true,
                _params: {
                    enableDamping: true,
                    minPolarAngle: Math.PI / 2.5,
                    maxPolarAngle: Math.PI / 1.5,
                    minDistance: 2,
                    maxDistance: 10,
                    rotateSpeed: 0.3,
                }
            }
        }

    }

    ,
    html_binding: {
        wrapper_elemnt: "spell3d-player"
    },
    "spell3d-objects": world_objects
}


export default world