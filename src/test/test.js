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
import { debug_plugboard } from "./utils/debugging.js";
/**
 * NOTES:
 * 
 * Message Key: Displayed Rotor Letters; e.g. A, A, A
 * Ring Setting: 
 * 
 * Left: ALTERED ARRAYS
 * Right: FIXED ARRAYS
 */

/**
 * Components
 */
const keyboard  = new Keyboard();
const plugboard = new Plugboard(DEFAULT_PLUGBOARD_SETTINGS);

/**
 * Rotors
 */
const I     = new Rotor(ROTOR_PROPS.I.wiring, ROTOR_PROPS.I.notch);
const II    = new Rotor(ROTOR_PROPS.II.wiring, ROTOR_PROPS.II.notch);
const III   = new Rotor(ROTOR_PROPS.III.wiring, ROTOR_PROPS.III.notch);

/**
 * Debugging
 */
console.log(I);
console.log(II);
console.log(III);