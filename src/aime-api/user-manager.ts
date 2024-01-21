/**
 * Aime API - User Manager Module
 */


export const _add_user = {
    _module: "user-manager",
    _op: "add",
    _params: {
        _first_name: "Tamir",
        _last_name: "Fridman",
        _email: "tamir@test.com",
        _password: "12345678"
    }
}

export const _auth_user = {
    _module: "user-manager",
    _op: "auth",
    _params: {
        _email: "tamir@test.com",
        _password: "12345678"
    }
}

