/**
 * @file main.js
 * @description This is the main application file that initializes the Enigma machine using default settings.
 * @summary This file serves as the entry point for the application, importing the default settings for the Enigma's components.
 * @see {@link module:config} for detailed documentation on the imported constants.
 */

import { DEFAULT_PLUGBOARD_SETTINGS, DEFAULT_REFLECTOR, DEFAULT_ROTOR_SETTINGS } from "./src/config.js";

/** @type {import("./src/EnigmaMachine.js").EnigmaConfiguration} */
import { EnigmaMachine } from "./src/EnigmaMachine.js";

/**
 * A pre-configured, ready-to-use Enigma Machine instance.
 *
 * This instance is set up with the default plugboard, rotor, and reflector settings.
 * It is exported directly for use in other modules.
 * @type {import("./src/EnigmaMachine.js").EnigmaMachine}
 * @constant
 */
export const enigma = new EnigmaMachine({
    plugboard: DEFAULT_PLUGBOARD_SETTINGS,
    rotors: DEFAULT_ROTOR_SETTINGS,
    reflector: DEFAULT_REFLECTOR
});