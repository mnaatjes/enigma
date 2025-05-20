/**
 * @memberof Enigma
 */

import { create_element } from "../utils/create_element.js";
import { get_fixed_char } from "../utils/get_fixed_character.js";
import { get_fixed_index } from "../utils/get_fixed_index.js";
import { validate_char } from "../utils/validate_char.js";
import { validate_signal } from "../utils/validate_signal.js";
import { EnigmaMachine } from "./Enigma.js";

export class Keyboard {
    /*----------------------------------------------------------*/
    /**
     * @constructor
     */
    /*----------------------------------------------------------*/
    constructor(){

    }
    /*----------------------------------------------------------*/
    /**
     * Converts letter {character} to signal {integer}
     * @param {string} letter
     * 
     * @returns {int} Signal index
     * @throws {Error}
     */
    /*----------------------------------------------------------*/
    forward(letter){
        /**
         * Validate
         */
        if(!validate_char(letter)){
            throw new Error(`Invalid Character "${letter}" entered at Keyboard.forward()`);
        }
        /**
         * Cast to signal
         */
        const signal = get_fixed_index(letter);
        return signal;
    }
    /*----------------------------------------------------------*/
    /**
     * Converts signal {integer} to a letter {character}
     * 
     * @param {int} signal
     * 
     * @returns {string} Character
     * @throws {Error}
     */
    /*----------------------------------------------------------*/
    backward(signal){
        /**
         * Validate
         */
        if(!validate_signal(signal)){
            throw new Error(`Invalid Signal "${signal}" entered at Keyboard.backward()`);
        }
        /**
         * Cast and return
         */
        const char = get_fixed_char(signal);
        return char;
    }
    /*----------------------------------------------------------*/
    /**
     * Rendering Method: Renders Keyboard for Input
     * 
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    render(type=1){
        /**
         * Process keyboard layout
         */
        const data = EnigmaMachine.QWERTY.reduce((acc, _, i, arr) => {
            if(i == 10){
                acc.push(arr.slice(0, i));
            } else if (i === 19){
                acc.push(arr.slice(10, i))
            } else if(i === 25){
                acc.push(arr.slice(19));
            }
            return acc;
        }, []);
        /**
         * Return HTML Element
         */
        return create_element('div', {classList: ["keyboard--container"]}, 
            data.map((arr) => {
                return create_element('div', {classList: ["keyboard--row"]}, arr.map((key) => {
                    return create_element((type === 0) ? "button" : "div", {
                        textContent: key,
                        classList: ["keyboard--key", (type === 0) ? "--input" : "--output"]
                    })
                }))
            })
        );
    }
}