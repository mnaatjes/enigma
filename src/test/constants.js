/**
 * @file constants.js
 * @memberof Enigma
 */

/**
 * Fixed alphabet is never changed, advanced, or altered
 * @type {array}
 */
export const FIXED  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const ETW    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const STATOR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const UKB_A  = "EJMZALYXVBWFCRQUONTSPIKHGD".split("");
export const UKB_B  = "YRUHQSLDPXNGOKMIEBFZCWVJAT".split("");
export const ROTORS = {
    "I": {
        order: 0,
        wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split(""),
        notch: "Q",
        start: "Z",
        ring: "Z"
    },
    "II": {
        order: 1,
        wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE".split(""),
        notch: "E",
        start: "A",
        ring: "A"
    },
    "III": {
        order: 2,
        wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO".split(""),
        notch: "V",
        start: "A",
        ring: "A"
    }
};
/*----------------------------------------------------------*/
/**
 * Debug Settings Object
 * @type {Object}
 */
/*----------------------------------------------------------*/
export const DEBUG = {
    all: false,
    rotors: {
        all: false, 
        labels: false, // displays rotor label
        positions: true, // head, ring, start, pos, and offset
        schema: false, // Arrays of wiring, etw, and stator
        IO: false, // Input-output from each rotor
        settings: false, // Rotor's settings
        rotation: false // number of rotations
    },
    ringstellung: {
        all: false,
        positions: false,
        settings: true,
        overview: true,
        rotations: false // list of rotated rotors
    },
    reflector: {
        all: false
    }
};