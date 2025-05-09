/**
 * @name Enigma
 * @version 2.0
 * @date 05-09-2025
 * 
 * @description Main js file
 */
import { rotor_wiring, rotor_notches } from "./constants/rotors.js";
import { reflector_wiring } from "./constants/reflectors.js";
import { Rotor } from "./components/Rotor.js";

/**
 * HTML Elements
 */
const rotors    = document.getElementById('rotors');
const display   = document.getElementById('display');
const keyboard  = document.getElementById('keyboard');
const plugboard = document.getElementById('plugboard');
/**
 * Components
 */
const rotor = new Rotor(rotor_wiring.I);
rotor.debug();