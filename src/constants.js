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
 * Qwerty Keyboard array
 */
export const QWERTY = "QWERTYUIOPASDFGHJKLZXCVBNM".split("").reduce((acc, curr, i, arr) => {
    /**
     * Chunk by row
     */
    if(i === 0){
        acc.push(arr.slice(i, 10));
    } else if(i === 10){
        acc.push(arr.slice(10, i + 9));
    } else if(i == 25){
        acc.push(arr.slice(19, 26));
    }
    return acc;
}, []);

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
        init_positions: ["A", "A", "A"],
        ring_settings: ["A", "A", "A"]
    },
    reflector: "UKB_B",
    plugboard: {
        A: "B",
        C: "D",
        E: "F"
    }
};

/**
 * Reflector Properties
 * @type {object}
 */
export const REFLECTOR_PROPS = {
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
 * Rotor Properties
 * @type {object}
 */
export const ROTOR_PROPS = {
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