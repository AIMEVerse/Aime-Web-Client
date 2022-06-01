import SpellUtils from "./spell-utils.js"



class SpellCLIParser {


    /**
     * convert text command to spell json command
     * @param {string} txt 
     */
    static parse(txt) {        
        const carr = txt.split(" ")
        let rv = {
            "module":carr[0],
            "op": carr[1],
            "params":{}
        }
        if(carr.length>1){
            for (let i=2;i<carr.length;++i){
                const v = carr[i]
                const dl = v.indexOf(":")
                if(dl>-1){
                    const mc = v.split(":")
                    rv.params[mc[0]] = mc[1]
                }
                else
                {
                    rv.params[i-1] = carr[i]
                }
                
            }
        }
        
        return rv
    }


    static parse_spell(raw_spell) {
        let code = raw_spell.trim();

        let args = SpellCLIParser.parse_arguments(code);

        let cmd = new SpellCommand();
        cmd.module = args[0];
        cmd.op = args[1];
        cmd.params = {};


        // start params from index 2
        for (let i = 2; i < args.length; i++) {
            let paramStr = args[i];
            let delimiterIdx = paramStr.indexOf(':');
            let quotesIdx = paramStr.indexOf('"');
            let finalDelimiter = (quotesIdx < delimiterIdx) ? -1 : delimiterIdx;

            let paramName = (finalDelimiter === -1) ? i.toString() : paramStr.substring(0, delimiterIdx);
            let paramValue = SpellCLIParser.fix_argument_value(paramStr.substring(finalDelimiter + 1));

            if (paramName === "frame")
                cmd.execute_on_frame = paramValue;
            else if (paramName === "on")
                cmd.execute_on_event = paramValue;
            else
                cmd.params[paramName] = paramValue
        }


        return cmd;
    }


    static parse_arguments(code) {
        let args = [];

        while (code.length) {
            let argIndex = SpellCLIParser.get_next_argumentIndex(code);
            if (argIndex == -1) {
                // error
                PAILogger.error('error: ' + code);
                break;
            }
            else {
                args.push(code.substring(0, argIndex));

                let oldCode = code; // this variable is used to check if loop in endless
                code = code.substring(argIndex).trim();

                if (code.length == oldCode) {
                    // error - while loop is in endless
                    PAILogger.error('error: while loop is in endless - leftovers: ' + code);
                    break;
                }

            }
        }


        return args;
    }

    static fix_argument_value(arg) {
        let finalArg = "";
        let prevChar = "";
        for (var i = 0; i < arg.length; i++) {
            let char = arg.charAt(i);
            let addToFinal = true;

            if (char === '"' && prevChar !== "\\")
                addToFinal = false;

            if (addToFinal)
                finalArg += char;
            prevChar = char;
        }


        finalArg = finalArg.replace(/\\\"/g, '"');

        return finalArg;
    }


    /**
     * Get next argument from string
     * @param {String} str
     * @return {number} indexOf the end of the argument
     */
    static get_next_argumentIndex(str) {
        let idx = -1;
        let count = str.length;
        let zeroCount = count - 1;
        let inQuotes = false;
        let prevChar = "";
        for (let i = 0; i < count; i++) {
            let char = str.charAt(i);


            if (char === '"') {
                if (inQuotes) {
                    if (prevChar === '\\') {
                        // ignore
                    }
                    else {
                        // end of arguments
                        inQuotes = false;
                    }

                }
                else {
                    inQuotes = true;
                }
            }
            else if (char === ' ') {
                if (!inQuotes) {
                    // end of arguments
                    idx = i;
                    break;
                }
            }

            if (i === zeroCount) {
                idx = count;
                break;
            }


            prevChar = char;
            // argument is still processing
        }

        return idx;
    }
}

export default SpellCLIParser
export {SpellCLIParser}