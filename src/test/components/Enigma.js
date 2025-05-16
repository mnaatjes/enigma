import { Plugboard } from "./Plugboard.js";
import { Reflector } from "./Reflector.js";
import { Rotor } from "./Rotor.js";
import { Keyboard } from "./Keyboard.js";
import { validate_char } from "../utils/validate_char.js";
import { validate_signal } from "../utils/validate_signal.js";
import { DEBUG } from "../constants.js";
import { get_fixed_index } from "../utils/get_fixed_index.js";

/**
 * @class
 * @name Enigma
 * @version 2.1
 */
export class EnigmaMachine {
    /**
     * Rotor Properties
     * @type {object}
     */
    static ROTOR_PROPS = {
        "I": {
            wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split(""),
            notch: "Q"
        },
        "II": {
            wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE".split(""),
            notch: "E"
        },
        "III": {
            wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO".split(""),
            notch: "V"
        },
        "IV": {
            wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB".split(""),
            notch: "J"
        },
        "V": {
            wiring: "VZBRGITYUPSDNHLXAWMJQOFECK".split(""),
            notch: "Z"
        },
        "VI": {
            wiring: "JPGVOUMFYQBENHZRDKASXLICTW".split(""),
            notch: "ZM"
        },
        "VII": {
            wiring: "NZJHGRCXMYSWBOUFAIVLPEKQDT".split(""),
            notch: "ZM"
        },
        "VII": {
            wiring: "FKQHTLXOCBJSPDZRAMEWNIUYGV".split(""),
            notch: "ZM"
        },
    };
    /**
     * Reflector Properties
     * @type {object}
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
     * Default Config for the whole machine
     * @type {object}
     * 
     * @property {object} ringstellung
     *      @property {array} ringstellung.rotors
     *      @property {array} ringstellung.init_positions
     *      @property {array} ringstellung.ring_settings
     * 
     * @property {string} reflector
     * 
     * @property {object} plugboard
     */
    static DEFAULT_CONFIG = {
        ringstellung: {
            rotors: ["IV", "II", "I"],
            init_positions: ["C", "A", "T"],
            ring_settings: ["A", "B", "Z"]
        },
        reflector: "UKB_B",
        plugboard: {
            A: "B",
            C: "D",
            E: "F"
        }
    };
    /**
     * Settings for all Enigma objects and properties
     * @type {object}
     */
    settings;
    /**
     * Rotors
     * @type {array}
     */
    rotors;
    /**
     * Reflector
     * @type {object}
     */
    reflector;
    /**
     * Plugboard
     * @type {object}
     */
    plugboard;
    /**
     * Keyboard
     * @type {object}
     */
    keyboard;
    /*----------------------------------------------------------*/
    /**
     * @constructor
     */
    /*----------------------------------------------------------*/
    constructor(config=undefined){
        // Init Settings
        this.settings = this.#parseSettings((config === undefined) ? EnigmaMachine.DEFAULT_CONFIG : config);
        // Init Keyboard
        this.keyboard = new Keyboard();
        // Init Plugboard
        this.plugboard = new Plugboard(this.settings.plugboard);
        // Init Rotors
        this.rotors = this.settings.ringstellung.map(obj => new Rotor(obj));
        this.setInitialRings();
        this.setInitialPositions();
        // Init Reflector
        this.reflector = new Reflector(this.settings.reflector);
        // Start Counter
        this.count = 0;
    }
    /*----------------------------------------------------------*/
    /**
     * Validate and parse settings
     */
    /*----------------------------------------------------------*/
    #parseSettings(config){
        /**
         * Validate:
         * - Type
         * - Keys
         * - Values
         */
        /**
         * Return parsed information
         */
        return {
            /**
             * Rotor settings 
             * @property {array<rotor: string, init_position: string, ring_setting: string>} ringstellung
             */
            ringstellung: 
            Array.from({length: config.ringstellung.rotors.length}).reduce((acc, _, i) => {
                // Render Properties Objects
                const obj = Object.entries(config.ringstellung).reduce((obj, props) => {
                    // Props
                    const key    = props[0].slice(0, -1);
                    const values = [...props[1]].reverse();
                    // Assign
                    if(key === "rotor"){
                        obj["name"]     = values[i];
                        obj["wiring"]   = EnigmaMachine.ROTOR_PROPS[values[i]].wiring;
                        obj["notch"]    = EnigmaMachine.ROTOR_PROPS[values[i]].notch;
                        obj["order"]    = i;
                    } else {
                        obj[key] = values[i];
                    }
                    // Return
                    return obj;
                }, {});
                // Push
                acc.push(obj);
                // Return accumulator
                return acc;
            }, []),
            /**
             * @property {object<name: string, wiring: array>} reflector
             */
            reflector: {
                name: config.reflector,
                wiring: EnigmaMachine.REFLECTOR_PROPS[config.reflector]
            },
            /**
             * Plugboard
             * @property {object<[Character]: string>}
             */
            plugboard: config.plugboard
        };
    }
    /*----------------------------------------------------------*/
    /**
     * Set Ring Settings
     */
    /*----------------------------------------------------------*/
    setInitialRings(){
        this.rotors.forEach((rotor, i) => {
            rotor.setRing(get_fixed_index(rotor.settings.ring_setting));
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Set Initial Position
     */
    /*----------------------------------------------------------*/
    setInitialPositions(){
        this.rotors.forEach((rotor) => {
            rotor.setPosition(rotor.settings.init_position);
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Encrypt
     * 
     * @param {string} message
     */
    /*----------------------------------------------------------*/
    encrypt(message){
        /**
         * Validate message
         */
        message = (typeof message === 'string') ? message.split("") : message;
        /**
         * Declare Props
         */
        const output = [];
        /**
         * Loop characters
         */
        message.forEach(letter => {
            /**
             * Increment Counter
             */
            this.count++;
            /**
             * Declare Props
             */
            let signal = undefined;
            /**
             * Step Rotors
             */
            this.stepRotors();
            /**
             * Encrypt:
             * - Forward
             * - Reflect
             * - Backward
             */
            signal = this.forward(letter);
            signal = this.reflector.reflect(signal);
            signal = this.backward(signal);
            /**
             * Append to output
             */
            output.push(signal);
        });
        /**
         * Return output
         */
        return output.reduce((acc, _, i, arr) => {
            // Reduce
            if(i % 5 === 0){
                const group = arr.slice(i, i + 5).join("");
                acc.push(group);
            }
            // Return accumulator
            return acc;
        }, []).join(" ");
    }
    /*----------------------------------------------------------*/
    /**
     * Step rotors
     */
    /*----------------------------------------------------------*/
    stepRotors(){
        /**
         * Conditional Rotation (by order of importance):
         * - All 3 rotate
         * - 
         * - Rightmost Rotates
         */
        /**
         * NOTES
         * 
         * R1 === I     --> [2]
         * R2 === II    --> [1]
         * R3 === III   --> [0]
         */
        const atNotch = this.rotors.map(rotor => rotor.getHead() === rotor.notch);
        /**
         * Check Rightmost and Middle
         */
        if(atNotch[0] && atNotch[1]){
            // Rotate all 3
            this.rotors.map(rotor => rotor.rotate());
        /**
         * Check for Double-Step Anomaly in Middle
         */
        } else if(atNotch[1]){
            // Step all 3
            this.rotors.map(rotor => rotor.rotate());
        /**
         * Check Rightmost notch
         */
        } else if(atNotch[0]){
            // Rotate Rightmost and Middle
            this.rotors[0].rotate();
            this.rotors[1].rotate();
        /**
         * Rightmost stepping every keypress
         */
        } else {
            // Rotate Rightmost
            this.rotors[0].rotate();
        }
        const names     = this.rotors.map(rotor => rotor.name);
        const positions = this.rotors.map(rotor => rotor.getHead());
        const notches   = this.rotors.map(rotor => rotor.notch);
        /**
         * Debugging
         */
        if(DEBUG.each){
            this.rotors.forEach((rotor, order) => {
                console.log(
                    "Rotor:", order + 1,
                    "Head:", rotor.getHead(),
                    "Notch:", rotor.notch,
                    "At Notch:", rotor.getHead() === rotor.notch,
                );
                console.log("\n");
            });
        }
        if(DEBUG.status){
            console.error(
                "ROT", [...names].reverse().join(", "), "\n",
                " POS:", [...positions].reverse().join(", "), "\n",
                " NCH:", [...notches].reverse().join(", "), "\n",
                " CNT:", this.count
            );
            atNotch.some((bool, i) => {(bool === true) ? console.warn(this.rotors[i].name) : undefined});
            console.log("\n");
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Forward
     * 
     * @param {string} letter
     */
    /*----------------------------------------------------------*/
    forward(letter){
        /**
         * Validate
         */
        const char = validate_char(letter) ? letter : null;
        let signal = undefined;
        if(char === null){
            throw new Error(`Character "${letter}" in EnigmaMachine.forward() in invalid!`);
        }
        /**
         * Declare Properties
         */
        const rotors = [...this.rotors];
        /**
         * Perform Encryption
         */
        signal = this.keyboard.forward(char);
        signal = this.plugboard.forward(signal);
        // Loop rotors
        signal = rotors.reduce((acc, rotor) => {
            //Perform logic
            acc = rotor.forward(acc);
            // return signal
            return acc;
        }, signal);
        /**
         * Return signal
         */
        return signal;
    }
    /*----------------------------------------------------------*/
    /**
     * Backward
     */
    /*----------------------------------------------------------*/
    backward(index){
        /**
         * Validate
         */
        index = validate_signal(index) ? index : null;
        if(index === null){
            throw new Error(`Input signal "${index}" is not a valid Signal Index!`);
        }
        /**
         * Declare Props
         */
        const rotors = [...this.rotors].reverse();
        let signal   = index;
        /**
         * Perform Encryption
         */
        signal = rotors.reduce((acc, rotor) => {
            //Perform logic
            acc = rotor.backward(acc);
            // return signal
            return acc;
        }, signal);
        // Plugboard
        signal = this.plugboard.backward(signal);
        // Keyboard int --> char
        signal = this.keyboard.backward(signal);
        /**
         * Return Signal
         */
        return signal;
    }
    /*----------------------------------------------------------*/
}