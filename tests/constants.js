/**
 * @file constants.js
 * @memberof Enigma
 */



/**
 * Default Rotor Settings
 * @deprecated
 */
export const DEFAULT_ROTOR_SETTINGS = {
    rotors: ["I", "II", "III"],
    positions: ["A", "A", "A"],
    ring_settings: ["A", "A", "A"]
};


/**
 * Reflector Props
 * @depreciated
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
 * @const {object} REFLECTOR_CONFIGURATIONS
 */
export const REFLECTOR_CONFIGURATIONS = REFLECTOR_PROPS;

/**
 * @const {object} Rotor Properties
 * @depreciated
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

/**
 * @const {object} ROTOR_CONFIGURATIONS
 */
export const ROTOR_CONFIGURATIONS = ROTOR_PROPS;

/**
 * Debug Settings Object
 * @type {Object}
 * @deprecated
 */
export const DEBUG = {
    all: false,
    each: false,
    status: true,
    setRings: false,
    
};
