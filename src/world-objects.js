const world_objects = {
    "pointer": {
        _type: "sphere",
        _id: "pointer",
        _geometry: {
            _type: "sphere-geometry",
            widthSegments: 8,
            heightSegments: 8,
            radius: 0.01
        },
        _material: {
            _type: "basic-material",
            color: 0xff99ff,
            side: 2,
            // roughness: 0.5,
        },
        _position: { x: 0, y: 1.75, z: 0 },
        _rotation: { x: 0, y: 0, z: 0 },
        castShadow: true,
        onframe: `follow-joystick`
    },
    "pointer0": {
        _type: "sphere",
        _id: "pointer0",
        _geometry: {
            _type: "sphere-geometry",
            widthSegments: 8,
            heightSegments: 8,
            radius: 0.5
        },
        _material: {
            _type: "basic-material",
            color: 0x0099ff,
            side: 2,
            // roughness: 0.5,
        },
        _position: { x: 1, y:1, z: 0 },
        _rotation: { x: 0, y: 0, z: 0 },
        castShadow: true,
        onframe: `follow-keypoint detector:handpose index:0 keypoint:0`
    },
    "pointer2": {
        _type: "sphere",
        _id: "pointer3",
        _geometry: {
            _type: "sphere-geometry",
            widthSegments: 8,
            heightSegments: 8,
            radius: 0.01
        },
        _material: {
            _type: "basic-material",
            color: 0xff99ff,
            side: 2,
            // roughness: 0.5,
        },
        _position: { x: 1, y:1, z: 0 },
        _rotation: { x: 0, y: 0, z: 0 },
        castShadow: true,
        onframe: `follow-keypoint 4`
    },
    "pointer21": {
        _type: "sphere",
        _id: "pointer31",
        _geometry: {
            _type: "sphere-geometry",
            widthSegments: 8,
            heightSegments: 8,
            radius: 0.01
        },
        _material: {
            _type: "basic-material",
            color: 0xff99ff,
            side: 2,
            // roughness: 0.5,
        },
        _position: { x: 1.5, y:1, z:2 },
        _rotation: { x: 0, y: 0, z: 2 },
        castShadow: true,
        onframe: `follow-keypoint 20`
    },
    "pointer22": {
        _type: "sphere",
        _id: "pointer32",
        _geometry: {
            _type: "sphere-geometry",
            widthSegments: 8,
            heightSegments: 8,
            radius: 0.01
        },
        _material: {
            _type: "basic-material",
            color: 0xff99ff,
            side: 2,
            // roughness: 0.5,
        },
        _position: { x: 1.5, y:1, z:2 },
        _rotation: { x: 0, y: 0, z: 2 },
        castShadow: true,
        onframe: `follow-keypoint 16`
    },
    "pointer23": {
        _type: "sphere",
        _id: "pointer23",
        _geometry: {
            _type: "sphere-geometry",
            widthSegments: 8,
            heightSegments: 8,
            radius: 0.01
        },
        _material: {
            _type: "basic-material",
            color: 0xff99ff,
            side: 2,
            // roughness: 0.5,
        },
        _position: { x: 1.5, y:1, z:2 },
        _rotation: { x: 0, y: 0, z: 2 },
        castShadow: true,
        onframe: `follow-keypoint 12`
    },
    "pointer24": {
        _type: "sphere",
        _id: "pointer324",
        _geometry: {
            _type: "sphere-geometry",
            widthSegments: 8,
            heightSegments: 8,
            radius: 0.01
        },
        _material: {
            _type: "basic-material",
            color: 0xff99ff,
            side: 2,
            // roughness: 0.5,
        },
        _position: { x: 1.5, y:1, z:2 },
        _rotation: { x: 0, y: 0, z: 2 },
        castShadow: true,
        onframe: `follow-keypoint 8`
    },
    "boxy": {
        name: "boxy",
        _type: "box",
        _id: "boxy",

        _geometry: {
            _type: "box-geometry",
            width: 2,
            height: 0.01,
            depth: 2,
            widthSegments: 2,
            heightSegments: 2,
            depthSegments: 2
        },
        _material: {
            _type: "standard-material",
            color: 0x00ff00,
            side: 2
        },
        _position: { x: 0, y: 0.1, z: 0 },
        _rotation: { x: 0, y: 0, z: 0 },
        _transform_controls: false,
        _disable_frame_3d_state: true
    }

}


export default world_objects