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
 * @module config
 * @description Provides the default configuration settings for an Enigma machine.
 */

/**
 * @typedef {object} PlugboardPairing
 * @property {string} A - The letter that 'A' is paired with.
 * @property {string} K - The letter that 'K' is paired with.
 * @property {string} O - The letter that 'O' is paired with.
 */

/**
 * Plugboard settings to initialize the Enigma machine.
 * This object maps letters that are swapped before and after the main rotor encryption.
 * @const {PlugboardPairing} DEFAULT_PLUGBOARD_SETTINGS
 */
export const DEFAULT_PLUGBOARD_SETTINGS = {
    "A": "R",
    "K": "G",
    "O": "X"
};

/**
 * Reflector rotor selection for the initial machine configuration.
 * The reflector, or Umkehrwalze, reflects the signal back through the rotors via a different path.
 * @const {string} DEFAULT_REFLECTOR
 */
export const DEFAULT_REFLECTOR = "UKB_A";


/**
 * @typedef {object} RotorSetting
 * @property {string} name - The name of the rotor (e.g., "I", "II", "III").
 * @property {string} position - The initial position of the rotor's display window, a single letter from 'A' to 'Z'.
 * @property {string} ringSetting - The ring setting, which aligns the rotor's wiring relative to its turnover notch.
 */

/**
 * Configuration of all three initial rotors.
 * Each object in the array defines the name, initial position, and ring setting for a single rotor.
 * @const {RotorSetting[]} DEFAULT_ROTOR_SETTINGS
 */
export const DEFAULT_ROTOR_SETTINGS = [
    {name: "I", position: "A", ringSetting: "A"},
    {name: "II", position: "A", ringSetting: "A"},
    {name: "III", position: "A", ringSetting: "A"}
];

