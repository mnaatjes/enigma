/**
 * @name Enigma
 * @version 2.0
 * @date 05-09-2025
 * 
 * @description Main js file
 */
import { Ringstellung } from "./components/Ringstellung.js";
import { rotor_wiring, rotor_notches } from "./constants/rotors.js";
import { reflector_wiring } from "./constants/reflectors.js";
import { Rotor } from "./components/Rotor.js";
import { Keyboard } from "./components/Keyboard.js";
import { KEYBOARD_TYPE } from "./constants/settings.js";
/**
 * HTML Elements
 */
const rotors    = new Ringstellung(document.getElementById('rotors'));
const lampboard = new Keyboard(document.getElementById('display'), KEYBOARD_TYPE.output);
const keyboard  = new Keyboard(document.getElementById('keyboard'));
const plugboard = document.getElementById('plugboard');
/**
 * Debugging
 */
rotors.render();
keyboard.render();
lampboard.render();
rotors.rotors[1].step();