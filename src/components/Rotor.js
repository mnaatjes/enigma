/**
 * @class Rotor
 * @memberof Enigma
 * @version 1.0
 * @since 05-09-2025
 */
export class Rotor {
    /**
     * @constructor Rotor initialization
     * 
     * @param {array} wiring
     * @param {string} notch
     */
    constructor(wiring, notch){
        // Set wiring
        this.wiring = this.setWiring(wiring);
        // Set notch
        this.notch = (typeof notch === 'string' && notch.length === 1) ? notch.toUpperCase() : null;
        // Set initial position
        this.position = 0;
    }
    /**
     * Set wiring
     * @param {array} wiring
     * 
     * @returns {array} uppercase indexed array
     */
    setWiring(wiring){
        /**
         * Validate
         */
        if(Array.isArray(wiring) && wiring.length === 26){
            /**
             * Check values are strings of single characters
             */
            const is_valid = wiring.every((ele) => {
                return (typeof ele === 'string' && ele.length === 1);
            });
            if(is_valid){
                /**
                 * Set all values to upper case
                 */
                return wiring.map((ele) => {return ele.toUpperCase();});
            } else {
                throw new TypeError('Wiring array is not properly formatted');
            }
        } else {
            throw new TypeError('Wiring must be an array of length 26!');
        }
    }
    /**
     * Debugging
     */
    debug(){
        console.log(this.wiring);
    }
}