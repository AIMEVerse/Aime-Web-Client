import { Wormholes,WormholeEvents } from "./nx-wormholes";



async function main() {




  


    const wormholeUrl = "ws://127.0.0.1:3030/"
    const getEnvironmentNameMessage = {
        _module: "xenvironment",
        _op: "get-name"
    }

    

    document.addEventListener(WormholeEvents.WormholeOpen, async (e) => {
        console.log("Wormhole is open")
        // console.log(Wormholes.ws);
        
        const res = await Wormholes.sendSync(getEnvironmentNameMessage)
        console.log(res)
    })

    Wormholes.open(wormholeUrl)



    


}

main().then()
