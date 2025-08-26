/**
 * Configuration constants for initial Enigma settings
 * 
 * @file src/config.js
 * @since 1.0.0:
 * - Created
 * - Added Default Plugboard
 * 
 * @note "SETTINGS" indicate the values to set the Machine to
 * @note "CONFIGURATIONS" are fixed, immutable values
 * 
 * @version 1.0.0
 */

/**
 * Plugboard Settings to initialize the Enigma machine
 * @const {object} DEFAULT_PLUGBOARD_SETTINGS
 */
export const DEFAULT_PLUGBOARD_SETTINGS = {
    A: "R", // Reverse also true: R -> A && A -> R
    K: "G",
    O: "X"
};

/**
 * Reflector Rotor seletion for initial machine configuration
 * @const {string} DEFAULT_REFLECTOR
 */
export const DEFAULT_REFLECTOR = "UKB_A";


/**
 * Configration of all 3 initial rotors
 * @const {array} DEFAULT_ROTOR_CONFIGURATIONS
 */
export const DEFAULT_ROTOR_CONFIGURATIONS = [
    {name: "I", position: "A", ringSetting: "A"},
];

export const DEFAULT_ROTOR_SETTINGS = {
    rotors: ["I", "II", "III"],
    positions: ["A", "A", "A"],
    ring_settings: ["A", "A", "A"]
};