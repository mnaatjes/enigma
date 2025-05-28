/**
 * @function log_io Logs input and output characters and returns an object
 * 
 * @param {string} input_char 
 * @param {string} output_char
 * @param {boolean} forwards Default true
 * @param {object} log Existing log object
 * 
 * @returns {object}
 */
export function log_io(input_char, output_char, forwards=true, log={}){
    /**
     * Determine Direction
     */
    if(forwards){
        return {
            forward: {
                input: input_char,
                output: output_char
            }
        }
    } else {
        return {
            forward: {
                input: log.forward.input,
                output: log.forward.output
            },
            backward: {
                input: input_char,
                output: output_char
            }
        }
    }
}