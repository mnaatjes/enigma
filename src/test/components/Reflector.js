/**
 * @memberof Enigma
 */

import { ALPHABET } from "../constants.js";
import { get_fixed_char } from "../utils/get_fixed_character.js";
import { validate_signal } from "../utils/validate_signal.js";
import { EnigmaMachine } from "./Enigma.js";
/*----------------------------------------------------------*/
/**
 * @class Reflector
 * @version 2.1
 * @since 2.0   Reset and Remade
 * @since 2.1   Consolidated:
 * - Removed wiring setting from constants.js
 * - Replaced by feeding settings into Reflector Class from EnigmaMachine class
 * - Added validation
 * - Still references ALPHABET from constants.js
 * - Wiring set in EnigmaMachine and fed in as settings
 * - Added log method and property
 */
/*----------------------------------------------------------*/
export class Reflector {
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
     * Log of plugboard
     * @type {Log}
     */
    log = {};
    /*----------------------------------------------------------*/
    /**
     * @construct
     * 
     * @param {object} settings
     * @param {string} settings.name e.g. UKB_B
     * @param {array} settings.wiring Array of wiring definitions
     */
    /*----------------------------------------------------------*/
    constructor(settings){
        /**
         * Initialize settings, name, and wiring
         */
        this.settings   = this.#parseSettings(settings);
        this.name       = this.settings.name;
        this.wiring     = this.settings.wiring;
    }
    /*----------------------------------------------------------*/
    /**
     * Parse Settings
     * 
     * @param {object} settings
     * @param {string} settings.name e.g. "UKB_A"
     * 
     * @returns {object} Settings and wiring
     * @throws {TypeError, RangeError}
     */
    /*----------------------------------------------------------*/
    #parseSettings(settings){
        /**
         * Validate:
         * - Type
         * - Value
         */
        if(typeof settings.name !== 'string'){
            throw new TypeError('Settings.name must be a string! e.g. "UKB_A"');
        }
        if(!Object.keys(EnigmaMachine.REFLECTOR_PROPS).includes(settings.name)){
            throw new RangeError(`The supplied Reflector name "${settings.name} does not exist! Please refer to REFLECTOR_PROPS"`);
        }
        /**
         * Return settings
         */
        return {
            name: settings.name,
            wiring: settings.wiring
        };
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
        this.#log(signal, output_signal);
        /**
         * Validate
         */
        return output_signal;
    }
    /*----------------------------------------------------------*/
    /**
     * Log transaction
     * @uses this.log
     * 
     * @param {int} input
     * @param {int} output
     */
    /*----------------------------------------------------------*/
    #log(input, output){
        /**
         * Log Properties
         */
        this.log = {
            input: {signal: input, char: EnigmaMachine.getFixedChar(input)},
            output: {signal: output, char: EnigmaMachine.getFixedChar(output)},
        };
    }
}