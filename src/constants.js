/**
 * @memberof Enigma
 * 
 * @version 2.0
 * @since 1.0 Created in test/
 * @since 2.0 Moved to src/
 */
/**
 * Fixed alphabet is never changed, advanced, or altered
 * @type {array}
 */
export const ALPHABET  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Debug Settings Object
 * @type {Object}
 */
export const DEBUG = {
    all: false,
    each: false,
    status: false,
    setRings: false,
    logs: false,
    state: false
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
export const DEFAULT_CONFIG = {
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