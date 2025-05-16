/**
 * @memberof Enigma
 */

import { ALPHABET, REFLECTOR_PROPS } from "../constants.js";
import { get_fixed_char } from "../utils/get_fixed_character.js";

export class Reflector {
    /**
     * 
     */
    fixed = ALPHABET;
    /**
     * 
     */
    wiring = [];
    /*----------------------------------------------------------*/
    /**
     * @construct
     */
    /*----------------------------------------------------------*/
    constructor(settings){
        this.settings   = this.#parseSettings(settings);
        this.name       = this.settings.name;
        this.wiring     = this.settings.wiring;
    }
    /*----------------------------------------------------------*/
    /**
     * Parse Settings
     */
    /*----------------------------------------------------------*/
    #parseSettings(settings){
        return {
            name: settings.name,
            wiring: REFLECTOR_PROPS[settings.name]
        };
    }
    /*----------------------------------------------------------*/
    /**
     * Reflect
     */
    /*----------------------------------------------------------*/
    reflect(signal){
        /**
         * Validate
         */
        /**
         * Input Char
         */
        const input_char    = get_fixed_char(signal);
        const output_signal = this.wiring.indexOf(input_char);
        /**
         * Validate
         */
        return output_signal;
    }
}