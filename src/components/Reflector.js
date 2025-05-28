/**
 * Imports
 */
import { ALPHABET, REFLECTOR_PROPS } from "../constants.js";
import { get_fixed_index } from "../test/utils/get_fixed_index.js";
import { get_fixed_char } from "../test/utils/get_fixed_character.js";
import { validate_char } from "../test/utils/validate_char.js";
import { validate_signal } from "../test/utils/validate_signal.js";
import { log_io } from "../utils/log_io.js";

/*----------------------------------------------------------*/
/**
 * @class Reflector
 * @memberof Enigma
 * 
 * @version 2.2
 * @since 2.0   Reset and Remade
 * @since 2.1   Consolidated:
 * - Removed wiring setting from constants.js
 * - Replaced by feeding settings into Reflector Class from EnigmaMachine class
 * - Added validation
 * - Still references ALPHABET from constants.js
 * - Wiring set in EnigmaMachine and fed in as settings
 * - Added log method and property
 * @since 2.2 Updates:
 * - Changed logging to utilities log_io
 * - References to constants migrated back to constants.js
 * - Migrated to main
 * - Removed settings property
 */
/*----------------------------------------------------------*/
export class Reflector {
    /**
     * Rotor name
     * @type {string}
     */
    name;

    /**
     * Fixed alphabet for Reflector
     * @type {array}
     */
    fixed = ALPHABET;
    
    /**
     * Wiring for Reflector
     * @type {array}
     */
    wiring = [];

    /**
     * Log of Reflector
     * @type {Log}
     */
    log = {};

    /*----------------------------------------------------------*/
    /**
     * @constructor 
     * 
     * @since 2.2 Updates:
     * - Added "update" method
     * - Changed how settings are validated (now in EnigmaMachine class)
     * 
     * @param {object} settings
     */
    /*----------------------------------------------------------*/
    constructor(settings){
        this.update(settings);
    }
    /*----------------------------------------------------------*/
    /**
     * Updates rotor
     * 
     * @param {object} settings
     * @returns {void} Assigns this.wiring
     */
    /*----------------------------------------------------------*/
    update(settings){
        /**
         * Assign name
         */
        this.name = settings.name;
        /**
         * Assign wiring
         */
        this.wiring = settings.wiring;
    }
    /*----------------------------------------------------------*/
    /**
     * Reflect
     * 
     * @param {int} signal Integer value representing the incoming character
     * 
     * @returns {int} Output integer after being enciphered
     * @throws {Error}
     */
    /*----------------------------------------------------------*/
    reflect(signal){
        /**
         * Validate
         */
        if(!validate_signal(signal)){
            throw new Error(`Signal supplied to Reflector.reflect() "${signal}" is invalid!`);
        }
        /**
         * Input Char
         */
        const input_char    = get_fixed_char(signal);
        const output_signal = this.wiring.indexOf(input_char);
        /**
         * Log
         */
        this.log = log_io(input_char, get_fixed_char(output_signal));
        /**
         * Return output signal
         */
        return output_signal;
    }
}