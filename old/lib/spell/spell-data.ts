
/**
 * Spell  Data (Global shared Variables & Objects)
 * @description Universal User Interface (UI) Engine for Javascript supporting devices & browsers
 * @author captain-crypto  <captain@crypto-knight.tech>
 * @since  03/03/2022
 * @Copyright AIME Web3 Technologies 2022, all right reserved
 *
 */


class SpellDataSource {
    objects: {}
    variables: {}
    constructor(){
        this.objects = {}
        this.variables = {}
    }
}

//singletone
const SpellData = new SpellDataSource()

export default SpellData