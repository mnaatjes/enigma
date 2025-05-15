import { ALPHABET } from "../constants.js";
import { get_fixed_char } from "./get_fixed_character.js";
/**
 * @function debug_plugboard
 * 
 * @param {object} plugboard Plugboard instance
 * @description displays a-z plugboard outputs
 */
export function debug_plugboard(plugboard){
    ALPHABET.forEach((char, signal) => {
        /**
         * Forward
         */
        const forward_signal = plugboard.forward(signal);
        console.log(
            char, signal, " --> ", get_fixed_char(forward_signal), forward_signal
        );
    });
    console.log('--------------------------------');
    plugboard.left.forEach((char, signal) => {
        /**
         * Backward
         */
        const backward_signal = plugboard.backward(signal);
        console.log(
            char, signal, " --> ", plugboard.left[backward_signal], backward_signal
        );
    });
}