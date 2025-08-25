/**
 * @file constants.js
 * @memberof Enigma
 */

/**
 * Fixed alphabet is never changed, advanced, or altered
 * @type {array}
 */
export const ALPHABET  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Default Rotor Settings
 */
export const DEFAULT_ROTOR_SETTINGS = {
    rotors: ["I", "II", "III"],
    positions: ["A", "A", "A"],
    ring_settings: ["A", "A", "A"] // P, D, U ???
};

/**
 * Reflector Settings
 */
export const DEFAULT_REFLECTOR_SETTING = "UKB_A";

/**
 * Plugboard Settings
 */
export const DEFAULT_PLUGBOARD_SETTINGS = {
    A: "R", // Reverse also true: R -> A && A -> R
    K: "G",
    O: "X"
};

/**
 * Reflector Props
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
 * Debug Settings Object
 * @type {Object}
 */
export const DEBUG = {
    all: false,
    each: false,
    status: true,
    setRings: false,
    
};