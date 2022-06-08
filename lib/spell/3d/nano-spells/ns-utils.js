/**
 * nano spells utils file
*/



export const get_param = (pos, name, cmd) => {
    return (cmd.params[name]) ? cmd.params[name] : cmd.params[pos]
}


/**
 * change axis value
 * @param {axis root/parent} root -> this._position / this._rotation / this._scale
 * @param {JSON} scmd - spell command 
 * 
 * spell command parameters: 
 * - axis -> the axis to change (x/y/z)
 * - dir -> change direction (up/down)
 * - step -> step to move
 */
export const change_axis = (root, scmd) => {
    const axis = get_param(0, "axis", scmd) // (scmd.params.axis) ? scmd.params.axis : scmd.params[0]
    const direction = get_param(1, "dir", scmd).toLowerCase()
    const step = parseFloat(get_param(2, "step", scmd))
    if (direction == "up") {
        root[axis] += step
    } else if (direction == "down") {
        root[axis] -= step
    }
}



export const set_axis = (root, axis, param) => {

    if (param) {
        if (param.startsWith("++")) {
            param = param.substring(1)
            // console.log("changing ++",param)
            root[axis] += parseFloat(param)
        } else if (param.startsWith("--")) {

            param = param.substring(1)
            // console.log("changing --",param)
            root[axis] -= parseFloat(param) * (-1)
        } else {
            // console.log("no changing")
            root[axis] = parseFloat(param)
        }

    }

}