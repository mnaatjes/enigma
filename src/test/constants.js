/**
 * Test Constants
 */
export const ETW    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const STATOR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const UKB_A  = "EJMZALYXVBWFCRQUONTSPIKHGD".split("");
export const UKB_B  = "YRUHQSLDPXNGOKMIEBFZCWVJAT".split("");
export const ROTORS = {
    "I": {
        order: 0,
        wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split(""),
        notch: "Q",
        start: "Z"
    },
    "II": {
        order: 1,
        wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE".split(""),
        notch: "E",
        start: "A"
    },
    "III": {
        order: 2,
        wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO".split(""),
        notch: "V",
        start: "A"
    }
};
export const DEBUG = true;