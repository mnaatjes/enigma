/**
 * @file /constants.js
 * 
 * @version 1.0.0
 */

/**
 * Fixed alphabet is never changed, advanced, or altered
 * @const {array} ALPHABET
 */
export const ALPHABET  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * All possible Rotor Configurations: wiring arrays with associated notches
 * @const {object} ROTOR_CONFIGURATIONS
 */
export const ROTOR_CONFIGURATIONS = {
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
 * Reflector wirings keyed to their reference names
 * @const {object} REFLECTOR_CONFIGURATIONS
 */
export const REFLECTOR_CONFIGURATIONS = {
    "beta": "LEYJVCNIXWPBQMDRTAKZGFUHOS".split(""),
    "gamma": "FSOKANUERHMBTIYCWLQPZXVGJD".split(""),
    "UKB_A": "EJMZALYXVBWFCRQUONTSPIKHGD".split(""),
    "UKB_B": "YRUHQSLDPXNGOKMIEBFZCWVJAT".split(""),
    "UKB_C": "FVPJIAOYEDRZXWGCTKUQSBNMHL".split(""),
    "thinB": "ENKQAUYWJICOPBLMDXZVFTHRGS".split(""),
    "thinC": "RDOBJNTKVEHMLFCWZAXGYIPSUQ".split(""),
    "ETW": "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
};