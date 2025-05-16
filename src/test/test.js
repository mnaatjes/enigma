/**
 * Test for Enigma
 * 
 * @namespace Enigma
 * @version 2.1
 */
import { DEBUG, REFLECTOR_PROPS, ROTOR_PROPS, DEFAULT_ROTOR_SETTINGS, DEFAULT_REFLECTOR_SETTING, ALPHABET, DEFAULT_PLUGBOARD_SETTINGS } from "./constants.js";
import { Rotor } from "./components/Rotor.js";
import { Reflector } from "./components/Reflector.js";
import { Plugboard } from "./components/Plugboard.js";
import { Keyboard } from "./components/Keyboard.js";
import { get_fixed_index } from "./utils/get_fixed_index.js";
import { validate_char } from "./utils/validate_char.js";
import { validate_signal } from "./utils/validate_signal.js";
import { get_fixed_char } from "./utils/get_fixed_character.js";
import { debug_plugboard, debug_reflector, debug_rotor } from "./utils/debugging.js";
import { EnigmaMachine } from "./components/Enigma.js";
/**
 * NOTES:
 */

/**
 * Enigma
 */
const enigma = new EnigmaMachine();
console.log(enigma);
const output = enigma.encrypt(Array(175).fill("A"));
//const output = enigma.encrypt(Array(4).fill("TESTING").join(""));
console.log(output);