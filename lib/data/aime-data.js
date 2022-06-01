

import aime_logger from "../utils/aime-logger.js"

/** 
 * to-do:
 * - save db file at project/data (create folder if not exists) as aime.db
 * - add create tables ate start for:
 *  - users
 *      - first name
 *      - last name
 *      - email
 *      - pwd (hash)
 *      - picture (text)
 *      - date created
 *      - date updated
 *      - status (active/susspended)
 *      - role (user/admin)
 *  
 *  methods:
 *      - add/delete/update user
 *      - filter search
 *      - get as json
 * 
 *      - backup - db
 *      - restore db 
 * 
 */





class AIMEData {

    init(data) {
        aime_logger.log("data init");
    }

}

const aime_data = new AIMEData()

export default  aime_data