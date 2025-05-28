import { Plugboard } from "./Plugboard.js";
import { Reflector } from "./Reflector.js";
import { Rotor } from "./Rotor.js";
import { Keyboard } from "./Keyboard.js";
import { validate_char } from "../utils/validate_char.js";
import { validate_signal } from "../utils/validate_signal.js";
import { DEBUG } from "../constants.js";
import { get_fixed_index } from "../utils/get_fixed_index.js";
import { create_element } from "../utils/create_element.js";

/*----------------------------------------------------------*/
/**
 * @class EnigmaMachine
 * @memberof Enigma
 * @version 2.1
 * @since 1.0   Created
 * @since 2.0   Reset and Consolidated
 * @since 2.1   Additions:
 * - Added validation to message
 * - Consolidated settings, PROPS constants into EnigmaMachine
 * - TODO: Migrate DEBUG const to this class
 * - TODO: Migrate ALPHABET to this class
 * - TODO: Migrate get_fixed_index and other utils into EnigmaMachine
 * - TODO: Create currentState method
 *      - Find points at which to add data
 *      - Option 1) Implement passing of currentState object into all sub-class instances to maintain state data
 *      - Option 2) Create a static method that all sub-class instances can utilize to feed data into currentState
 *  - Added static methods for get_fixed_char and get_fixed_signal
 */
/*----------------------------------------------------------*/
export class EnigmaMachine {
    /**
     * Fixed Alphabet for indexing
     * @type {array}
     */
    static ALPHABET  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
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
            rotors: ["III", "II", "I"],
            init_positions: ["A", "B", "C"],
            ring_settings: ["Z", "Z", "Z"]
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
    /**
     * Object containing the current state information of all components
     * @type {EnigmaState}
     * 
     * @since 2.1   Created
     */
    state = {
        count: 0,
        input: {},
        output: {},
        config: {},
        path: {},
        stepped: [],
    };
    /**
     * Logs of messages encrypted
     * @type {EnigmaLog}
     */
    logs = [];
    /**
     * Counts the number of encryptions (by character) for each session
     * @type {int}
     */
    count = 0;
    /**
     * Session number; number of encryptions (by message)
     * @type {int}
     */
    sessions = 0;
    /*----------------------------------------------------------*/
    /**
     * @constructor
     * 
     * @param {object|undefined} config
     */
    /*----------------------------------------------------------*/
    constructor(parent, config=undefined){
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
        this.element = document.createElement('enigma-machine');
    }
    /*----------------------------------------------------------*/
    /**
     * Validate and Parse Configuration Object and returns a settings object
     * 
     * @since 2.0   Created:
     * - Defines wiring and other settings from user input
     * - Defines every Rotor class parameter needed to create a new Rotor instance
     * - Assigns wiring to Reflector
     * 
     * @since 2.1   Added:
     * - Migrated all PROPS constants to EnigmaMachine class
     * - TODO: Validation
     * - TODO: Break up the parsing of settings so that information from Config can be validated
     * 
     * @param {object} config Configuration object
     * 
     * @returns {object} Settings object with definitions for all sub-class instances
     * @throws {Error, TypeError, RangeError}
     */
    /*----------------------------------------------------------*/
    #parseSettings(config){
        /**
         * Validate:
         * - Type
         * - Keys
         * - Values
         * TODO: Break up the parsing of settings so that information from Config can be validated
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
            plugboard: {
                connections: config.plugboard
            }
        };
    }
    /*----------------------------------------------------------*/
    /**
     * Update Configuration
     * 
     * @param {object} settings
     */
    /*----------------------------------------------------------*/
    updateConfig(settings){

    }
    /*----------------------------------------------------------*/
    /**
     * Set Ring Settings in each Rotor from the settings fed in from the config object
     * - Ring rotation occurs in the Rotor Class
     * 
     * @param {void}
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    setInitialRings(){
        this.rotors.forEach((rotor) => {
            rotor.setRing(get_fixed_index(rotor.settings.ring_setting));
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Set Initial Position in each Rotor from the settings fed in from the config object
     * - Ring rotation occurs in the Rotor Class
     * 
     * @param {void}
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    setInitialPositions(){
        this.rotors.forEach((rotor) => {
            rotor.setPosition(rotor.settings.init_position);
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Encrypt:
     * - Primary input -> output of the Enigma Class
     * 
     * @since 2.1
     * - Accepts strings only!
     * - Validation added
     * - Parsing
     * 
     * @since 2.2
     * - Monitoring (state, input, output) added for reference
     * 
     * @uses Reflector
     * @uses Rotor
     * @uses Plugboard
     * @uses Keyboard
     * 
     * @param {string|array} message
     */
    /*----------------------------------------------------------*/
    encrypt(message){
        /**
         * Validate message:
         * - Check type
         * - Replace non-alphabetic characters with whitespace
         * - Trim
         * - Cast to array
         */
        if(typeof message !== 'string'){
            throw new TypeError(`The message supplied into EnigmaMachine.encrypt() MUST be a string! "${typeof message}" given`);
        }
        // Replace non-alphabetic characters
        message = message.replace(/[^a-zA-Z]/g, "");
        // Trim
        message = message.replace(/\sg/, "");
        // Cast to array
        message = message.split("");
        /**
         * Output container array that collects each output character
         * @type {array}
         */
        const output = [];
        /**
         * Loop characters
         */
        message.forEach((letter, count) => {
            /**
             * Increment Counter
             */
            this.count = count;
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
            /**
             * Save State
             */
            this.#saveState(letter, signal, count);
        });
        /**
         * Logs:
         * - Increment session
         */
        this.#incrementSession();
        //this.#logMessages(message, output);
        /**
         * Return output:
         * - Group into 5 character segments
         * - Cast into string
         * - Space every 5 characters
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
         * Checks all rotors for their notch-state (if the head character is at its notch character)
         * @type {array}
         */
        const atNotch = this.rotors.map(rotor => rotor.getHead() === rotor.notch);
        /**
         * Determine Conditions for Rotation:
         * - Check Rightmost and Middle notch
         * - Double-step Anomaly
         * - Rightmost notch
         * - Step Rightmost every keypress
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
        /**
         * Collect properties for debugging
         */
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
    /**
     * Debugging methods all consolidated in one method within EnigmaMachine
     * 
     * @since 2.1   Created:
     * - Moved all disparate methods and definitions for debugging here
     * - Declared monitoring property of EnigmaClass for better state observance
     * 
     * @uses this.currentState
     * 
     * @param {void}
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    debug(){
        /**
         * Display state
         */
        if(DEBUG.state){
            Object.entries(this.state).map(([prop, val]) => {
                // Format Property
                const property = prop.toUpperCase() + ':';
                // Check if object
                console.log(property, val);
            });
        }
        /**
         * Display logs
         */
        if(DEBUG.logs){
            console.log(this.logs);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Get Enigma State
     * 
     * @uses this.state
     */
    /*----------------------------------------------------------*/
    #saveState(input_char, output_char, count){
        /**
         * Save Data
         */
        this.state = {
            count,
            input: {
                char: input_char, 
                signal: EnigmaMachine.getFixedSignal(input_char)
            },
            output: {
                char: output_char, 
                signal: EnigmaMachine.getFixedSignal(output_char)
            },
            config: {
                plugboard: {
                    fixed: this.plugboard.right.join(""),
                    wiring: this.plugboard.left.join(""),
                    connections: this.plugboard.connections
                },
                rotors: this.rotors.map((rotor) => {
                    return {
                        name: rotor.name,
                        position: rotor.getHead(),
                        ring_setting: rotor.settings.ring_setting,
                        notch: rotor.notch,
                        atNotch: rotor.getHead() === rotor.notch,
                        fixed: rotor.fixed.join(""),
                        wiring: rotor.wiring.join(""),
                        order: rotor.order
                    };
                }),
                reflector: {
                    name: this.reflector.name,
                    fixed: this.reflector.fixed.join(""),
                    wiring: this.reflector.wiring.join("")
                }
            },
            path: {
                forwards: {
                    plugboard: this.plugboard.log.forward,
                    rotors: this.rotors.map((rotor) => {
                        return rotor.log.forward;
                    })
                },
                reflector: this.reflector.log,
                backwards: {
                    rotors: this.rotors.map((rotor) => {
                        return rotor.log.backward;
                    }),
                    plugboard: this.plugboard.log.backward
                }
            },
            stepped: this.rotors.map(rotor => rotor.hasStepped()),
        };
    }
    /*----------------------------------------------------------*/
    /**
     * Rendering Method: Renders HTML for the current EnigmaMachine state
     * 
     * TODO: Migrate to Custom Element
     * 
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    renderState(){
        /**
         * Reference to this.state.path
         * @type {object}
         */
        const path = this.state.path;
        /**
         * Configuration Data Object
         * @type {object}
         */
        const config_data = {
            rotors: this.state.config.rotors.map(obj => obj.name).join(", "),
            positions: this.state.config.rotors.map(obj => obj.position).join(", "),
            ring_setting: this.state.config.rotors.map(obj => obj.ring_setting).join(", "),
        }
        /**
         * Path Data object
         */
        const path_headers = [
            'IN',
            'PB',
            ...this.state.config.rotors.map(obj => obj.name),
            this.state.config.reflector.name,
            ...[...this.state.config.rotors].reverse().map(obj => obj.name),
            'PB',
            'OUT'
        ];
        const path_data = [
            this.state.input.char,
            path.forwards.plugboard.output.char,
            ...path.forwards.rotors.map(obj => obj.output.char),
            path.reflector.output.char,
            ...path.backwards.rotors.map(obj => obj.output.char),
            path.backwards.plugboard.output.char,
            this.state.output.char
        ];
        const headers = ['Rotors', 'Positions', 'Ring Settings', 'Path'];
        /**
         * Create Styling elements
         */
        const container = create_element('table', {classList: ["--ticker"]}, [
            /**
             * Headers
             */
            create_element('thead', {}, [create_element('tr', {}, 
                headers.map(title => create_element('th', {textContent: title}))
            )]),
            /**
             * Data Cells
             */
            create_element('tbody', {}, [create_element('tr', {}, [
                    ...Object.values(config_data).map(title => create_element('td', {textContent: title})),
                    create_element('td', {classList: ["--path"]}, [
                        /**
                         * Path Table
                         */
                        create_element('table', {}, [
                            create_element('tr', {}, 
                                path_headers.map(title => create_element('th', {textContent: title.toUpperCase()}))
                            ),
                            create_element('tr', {}, 
                                path_data.map(data => create_element('td', {textContent: data}))
                            ),
                        ])
                    ])
                ]
            )])
        ]);
        /**
         * Return main table node
         */
        return container;
    }
    /*----------------------------------------------------------*/
    /**
     * Utility Method for 
     * 
     * @static
     * @private
     * @uses this.state
     * 
     * @param {}
     * 
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    #incrementSession(){this.sessions++;}
    /*----------------------------------------------------------*/
    /**
     * Get Fixed Character from Signal
     * 
     * @function get_fixed_char
     * 
     * @param {int} signal
     * @uses ALPHABET
     * 
     * @returns {string} Character from ALPHABET
     * @throws {Error}
     */
    /*----------------------------------------------------------*/
    static getFixedChar(signal){
        /**
         * Validate
         */
        if(!validate_signal(signal)){
            throw new Error(`Signal "${signal}" is invalid!`);
        }
        /**
         * Cast as int if string
         */
        if(typeof signal === 'string'){
            signal = parseInt(signal);
        }
        /**
         * Convert
         */
        const char = EnigmaMachine.ALPHABET[signal];
        /**
         * Validate and return
         */
        if(validate_char(char)){
            return char;
        } else {
            throw new Error(`Could not resolve signal "${signal}" to character "${char}"!`);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Get Fixed Signal from Character
     * 
     * @param {string} char
     * @uses EnigmaMachine.ALPHABET
     * 
     * @returns {int} Index integer tied to the letter from the fixed ALPHABET
     * @throws {Error, RangeError}
     */
    /*----------------------------------------------------------*/
    static getFixedSignal(char){
        /**
         * Validate
         */
        if(!validate_char(char)){
            throw new Error(`Character supplied "${char}" is invalid!`);
        }
        /**
         * Validate Index and return
         */
        const index = EnigmaMachine.ALPHABET.indexOf(char.toUpperCase());
        if(validate_signal(index)){
            return index;
        } else {
            throw new RangeError(`Could not resolve character "${char}" to index "${index}"`);
        }
    }
    /*----------------------------------------------------------*/

}