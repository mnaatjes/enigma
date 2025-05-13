/**
 * @name Enigma
 * @version 2.0
 * @date 05-09-2025
 * 
 * @description Main js file
 */
import { rotor_wiring, rotor_notches } from "./constants/rotors.js";
//import { reflector_wiring } from "./constants/reflectors.js";
//import { Rotor } from "./components/Rotor.js";

import { Ringstellung } from "./components/Ringstellung.js";
import { Keyboard } from "./components/Keyboard.js";
import { INDEXES, KEYBOARD_TYPE } from "./constants/settings.js";
import { Reflector } from "./components/Reflector.js";
/*----------------------------------------------------------*/
/**
 * HTML Elements
 */
/*----------------------------------------------------------*/
const rotors    = new Ringstellung(document.getElementById('rotors'));
const lampboard = new Keyboard(document.getElementById('display'), KEYBOARD_TYPE.output);
const keyboard  = new Keyboard(document.getElementById('keyboard'));
const plugboard = document.getElementById('plugboard');
const reflector = new Reflector('UKW-B');
/*----------------------------------------------------------*/
/**
 * Render All Components
 * @function render
 */
/*----------------------------------------------------------*/
function render(rotors, keyboard, lampboard){
    rotors.render();
    keyboard.render();
    lampboard.render();
}
/*----------------------------------------------------------*/
/**
 * @function encrypt
 * 
 * @param {string} signal Input Character
 * 
 * @returns {string} Output character
 */
/*----------------------------------------------------------*/
function encrypt(signal, debug=false){
    /**
     * Enable / Disable Debug in objects
     */
    rotors.debug = debug;
    if(debug){
        console.log('Signal:', signal);
    }
    const forwards  = rotors.forward(signal);
    const reflected = reflector.reflect(forwards);
    if(debug){
        console.warn('Reflected:', reflected);
    }
    const output = rotors.backward(reflected);
    if(debug){
        console.log('Output:', output);
        console.log('');
    }
    return output;
}
/*----------------------------------------------------------*/
/**
 * Debugging
 */
/*----------------------------------------------------------*/
render(rotors, keyboard, lampboard);
encrypt("A", true);
encrypt("A", true);
encrypt("A", true);
encrypt("A", true);

/**
 * Testing
 */
const rotor     = rotor_wiring.I;
const alpha     = INDEXES;
const signal    = 0;
const position  = 1;
const shifted   = Math.abs((signal + position - 26) % 26);
const display   = rotor[shifted];
console.error('Signal:', signal, 'Position:', position, 'Shifted:', shifted, 'Output:', display);