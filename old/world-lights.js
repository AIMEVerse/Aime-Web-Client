const lights = {
    "main": {
        _type: "light",
        _light: "ambient",
        color: 0x444466
    },
    "p1": {
        _type: "light",
        _light: "directional",
        _helper: true,
        color: "hsl(180, 0%, 60%)",
        intensity: 1,
        _position: { x: 5, y: 10, z: -30 },

    },
    "p2": {
        _type: "light",
        _light: "directional",
        color: "hsl(180, 0%, 60%)",
        intensity: 1,
        _position: { x: 5, y: 5, z: 30 },

    },
    "p3": {
        _type: "light",
        _light: "directional",
        color: "hsl(180, 0%, 60%)",
        intensity: 1,
        _position: { x: -20, y: 5, z: 0 }

    },
    "p4": {
        _type: "light",
        _light: "directional",
        color: "hsl(180, 0%, 60%)",
        intensity: 1,
        _position: { x: 20, y: 5, z: 0 }
    },
    "top-light": {
        _type: "light",
        _light: "directional",
        color: "hsl(180, 0%, 80%)",
        intensity: 1,
        _position: { x: -0.3, y: 16, z: 0 }
    }
}

export default lights