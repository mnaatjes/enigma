import { ALPHABET, REFLECTOR_CONFIGURATIONS } from "../../constants.js";

/**
 * @file src/components/Reflector.js
 * 
 * @class
 * @param {string} reflector_name
 */
export class Reflector {
    /**
     * @type {Array} - Array of reflector cypher
     */
    wiring = [];

    /**
     * Left
     * @type {Array} - Fixed alphabet array
     */
    static FIXED = [...ALPHABET];

    /**
     * Debugging Details
     * @type {object} details
     */
    details = {};

    /**
     * Constructor
     * 
     * @param {string} reflector_name
     */
    constructor(reflector_name){
        // Define Properties
        this.name   = reflector_name;
        this.wiring = [...REFLECTOR_CONFIGURATIONS[reflector_name]];

        /// Define details
        this.details = {
            name: this.name,
            wiring: this.wiring.join(" ")
        };
    }

    /**
     * reflect
     * @param {number} signal
     */
    reflect(signal){
        let letter = this.wiring[signal];
        return Reflector.FIXED.indexOf(letter);
    }
}
