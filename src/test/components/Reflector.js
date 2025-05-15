import { DEBUG, FIXED } from "../constants.js";
/*----------------------------------------------------------*/
/**
 * @memberof Enigma
 * @version 1.0
 * @since 1.0   Created
 * @since 2.0   Testing
 * - Changed names A, B, C to UKB_A, etc...
 */

/*----------------------------------------------------------*/
export class Reflector {
    /**
     * Reflector Properties
     * 
     * @readonly
     * @type {object<string: array>>}
     */
    static REFLECTOR_PROPS = {
        "beta": "LEYJVCNIXWPBQMDRTAKZGFUHOS".split(""),
        "gamma": "FSOKANUERHMBTIYCWLQPZXVGJD".split(""),
        "UKB_A": "EJMZALYXVBWFCRQUONTSPIKHGD".split(""),
        "UKB_B": "YRUHQSLDPXNGOKMIEBFZCWVJAT".split(""),
        "UKB_C": "FVPJIAOYEDRZXWGCTKUQSBNMHL".split(""),
        "thinB": "ENKQAUYWJICOPBLMDXZVFTHRGS".split(""),
        "thinC": "RDOBJNTKVEHMLFCWZAXGYIPSUQ".split(""),
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
        /**
         * Helper properties
         */
        this.signal = undefined;
        this.output = undefined;
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
        if(!Object.keys(Reflector.REFLECTOR_PROPS).includes(value)){
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
    setMapping(){return Reflector.REFLECTOR_PROPS[this.label];}
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
            input = FIXED.indexOf(signal.toUpperCase());
        }
        /**
         * Validate input
         */
        if(input === undefined){
            throw new Error('Unable to define Input parameter in Reflector! Please check signal');
        }
        /**
         * Debugging
         */
        this.signal = signal;
        this.output = this.mapping[input];
        this.debugReflector();
        /**
         * Perform Mapping
         */
        return this.mapping[input];
    }
    /*----------------------------------------------------------*/
    /**
     * Debugging Method: Reflector readout
     */
    /*----------------------------------------------------------*/
    debugReflector(){
        if(DEBUG.all || DEBUG.reflector.all){
            console.error(
                `${this.label}:`,
                this.signal,
                "-->",
                this.output
            );
        }
    }
    /*----------------------------------------------------------*/
}