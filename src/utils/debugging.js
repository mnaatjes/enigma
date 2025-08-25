import { ALPHABET } from "../constants.js";
import { get_fixed_char } from "./get_fixed_character.js";

/*----------------------------------------------------------*/
/**
 * @function debug_plugboard
 * 
 * @param {object} plugboard Plugboard instance
 * @description displays a-z plugboard outputs
 */
/*----------------------------------------------------------*/
export function debug_plugboard(plugboard){
    console.log('');
    console.warn('PLUGBOARD FORWARD:');
    ALPHABET.forEach((char, signal) => {
        /**
         * Forward
         */
        const forward_signal = plugboard.forward(signal);
        console.log(
            char, signal, " --> ", get_fixed_char(forward_signal), forward_signal
        );
    });
    console.log('');
    console.warn('PLUGBOARD REVERSE:');
    ALPHABET.forEach((char, signal) => {
        /**
         * Backward
         */
        const backward_signal = plugboard.backward(signal);
        console.log(
            char, signal, " --> ", get_fixed_char(backward_signal), backward_signal
        );
    });
}

/*----------------------------------------------------------*/
/**
 * Debug Rotor
 * @function debug_rotor
 * 
 * @param {object} rotor
 */
/*----------------------------------------------------------*/
export function debug_rotor(rotor){
    console.log('');
    console.warn('ROTOR FORWARD: ' + rotor.name);
    ALPHABET.forEach((char, signal) => {
        const forward_output = rotor.forward(signal);
        console.log(
            char, signal, " --> ", get_fixed_char(forward_output), forward_output
        );
    });
    console.log('');
    console.warn('ROTOR REVERSE: ' + rotor.name);
    ALPHABET.forEach((char, signal) => {
        const forward_output = rotor.backward(signal);
        console.log(
            char, signal, " --> ", get_fixed_char(forward_output), forward_output
        );
    });
}
/*----------------------------------------------------------*/
/**
 * Debug Reflector
 * @function debug_reflector
 * 
 * @param {object} reflector
 */
/*----------------------------------------------------------*/
export function debug_reflector(reflector){
    console.log('');
    console.warn('REFLECTOR: ' + reflector.name);
    ALPHABET.forEach((char, signal) => {
        const forward_output = reflector.reflect(signal);
        console.log(
            char, signal, " --> ", get_fixed_char(forward_output), forward_output
        );
    });
}