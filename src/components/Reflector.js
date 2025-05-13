/*----------------------------------------------------------*/
/**
 * @memberof Enigma
 * @version 1.0
 * @since 1.0
 */

import { INDEXES } from "../constants/settings.js";

/*----------------------------------------------------------*/
export class Reflector {
    /**
     * @const {Object<label: string, mapping: array} 
     */
    static REFLECTORS = {
        "beta": "LEYJVCNIXWPBQMDRTAKZGFUHOS".split(""),
        "gamma": "FSOKANUERHMBTIYCWLQPZXVGJD".split(""),
        "UKW-A": "EJMZALYXVBWFCRQUONTSPIKHGD".split(""),
        "UKW-B": "YRUHQSLDPXNGOKMIEBFZCWVJAT".split(""),
        "UKW-C": "FVPJIAOYEDRZXWGCTKUQSBNMHL".split(""),
        "UKW-B_thin": "ENKQAUYWJICOPBLMDXZVFTHRGS".split(""),
        "UKW-C_thin": "RDOBJNTKVEHMLFCWZAXGYIPSUQ".split(""),
        "UKW-D": "ZWVUTSRQPONMLKIHGFEDCBAYX".split(""),
        "ETW": "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    };
    /**
     * Label identification for Reflector
     * @type {string}
     */
    label;
    /**
     * Wire Mapping of Reflector
     * @type {array}
     */
    mapping;
    /*----------------------------------------------------------*/
    /**
     * @constructor
     * 
     * @param {string} label
     */
    /*----------------------------------------------------------*/
    constructor(label){
        /**
         * Validate label and set mapping
         */
        this.label   = this.validateLabel(label);
        this.mapping = this.setMapping();
    }
    /*----------------------------------------------------------*/
    /**
     * Validates label for Reflector
     */
    /*----------------------------------------------------------*/
    validateLabel(value){
        /**
         * Validate value type
         */
        if(typeof value !== 'string'){
            throw new TypeError('Reflector not defined!');
        }
        /**
         * Check value against array
         */
        if(!Object.keys(Reflector.REFLECTORS).includes(value)){
            throw new TypeError('Reflector not defined!');
        }
        /**
         * Return value
         */
        return value;
    }
    /*----------------------------------------------------------*/
    /**
     * Sets the wire mapping array from reflector label
     * 
     * @uses this.label
     */
    /*----------------------------------------------------------*/
    setMapping(){return Reflector.REFLECTORS[this.label];}
    /*----------------------------------------------------------*/
    /**
     * Reflect signal: Match incoming signal with mapped output
     * 
     * @param {int|string} signal index or character
     */
    /*----------------------------------------------------------*/
    reflect(signal){
        /**
         * Validate types
         */
        if(typeof signal !== 'string' && typeof signal !== 'number'){
            throw new TypeError('Signal must be an integer or a string (single character)');
        }
        /**
         * Declare input container for index value
         */
        let input = undefined;
        /**
         * Validate Int:
         * - Throw error out of range
         * - Parse in range
         */
        if(typeof signal === 'number' && (signal <=25 && signal >= 0)){
            input = signal;
        } else if(typeof signal === 'string' && signal.length === 1){
            input = INDEXES.indexOf(signal.toUpperCase());
        }
        /**
         * Validate input
         */
        if(input === undefined){
            throw new Error('Unable to define Input parameter in Reflector! Please check signal');
        }
        /**
         * Perform Mapping
         */
        return this.mapping[input];
    }
    /*----------------------------------------------------------*/
}