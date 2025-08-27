/**
 * @fileoverview 
 * @file /tests/main.js
 * 
 * @version 1.0.0
 * 
 */

/**
 * @description Imports the Constant Configuration variables for the Enigma Machine
 */
import { ALPHABET, ROTOR_CONFIGURATIONS, REFLECTOR_CONFIGURATIONS } from "../constants.js";

/**
 * @description Imports the default settings for the initial Enigma Machine Configuration
 */
import { DEFAULT_PLUGBOARD_SETTINGS, DEFAULT_REFLECTOR, DEFAULT_ROTOR_SETTINGS } from "../src/config.js";

/**
 * @description Import Enigma Component Classes
 */
import { Rotor } from "../src/components/Rotor.js";

// Debugging
const r1 = new Rotor(DEFAULT_ROTOR_SETTINGS[0]);
r1.setRingSetting("C");
