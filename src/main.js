/**
 * @namespace Enigma
 * @version 2.1
 * @since 2.1 Added
 * 
 */

import { EnigmaMachine } from "./components/EnigmaMachine.js";
import { ALPHABET, DEFAULT_CONFIG, QWERTY } from "./constants.js";
import { create_element } from "./test/utils/create_element.js";

/**
 * Debugging Enigma Machine
 */
const machine = new EnigmaMachine(DEFAULT_CONFIG);
console.log(machine);
/*----------------------------------------------------------*/
/**
 * @function encryptMessage
 * @param {string} message 
 * @returns {string} Encrypted Message
 */
/*----------------------------------------------------------*/
function encryptMessage(message){
    /**
     * Declare result container
     * @type {array}
     */
    const result = [];
    /**
     * Clear Empty Space
     */
    /**
     * Split message into array of characters
     */
    message.split("").forEach(char => {
        /**
         * Perform Encryption
         */
        const output_char = machine.encrypt(char);
        /**
         * Push to results array
         */
        result.push(output_char);
    });
    /**
     * Parse result into string spaced every 5 characters
     */
    return result.reduce((acc, curr, i, arr) => {
        if(i % 5 === 0){
            acc += arr.slice(i, i + 5).join("") + " ";
        }
        return acc;
    }, "");
}
/**
 * Debug Encryption
 */
const input     = Array(1).fill("A").join("");
const output    = encryptMessage(input);

/**
 * Test Display HTML Element
 */
console.log(machine.state);

const element = {
    input: document.getElementById('input__field'),
    rotors: document.getElementById('ringstellung'),
    plugboard: document.getElementById('plugboard')
};

/**
 * Inject letters into plugboard
 */
function drawPlugboard(){
    const container = element.plugboard;
    QWERTY.map((arr) => {
        const row = create_element('div', {
            classList: ["plug_row"]
        }, 
            arr.map((key) => {
                return create_element('div', {
                    attributes: {
                        id: `plug__${key}`
                    }
                }, [
                    create_element('label', {textContent: key}),
                    create_element('input', {
                        attributes: {
                            type: "checkbox"
                        }
                    })
                ])
            })
        );
        container.appendChild(row);
    });
}

drawPlugboard();

/**
 * @function drawRotors
 */
function drawRotors(){
    
}

/**
 * Build Alphabet Turnstile
 */
function drawRotorWindow(){
    const container = element.rotors.querySelector('[class="rotor__window"]');
    const letters   = create_element('div', {
        attributes: {id: 'rotor__01'}, 
        classList: ["rotor__letters"]
    });
    ALPHABET.forEach(letter => {
        letters.appendChild(create_element('div', {textContent: letter}));
    });
    container.appendChild(letters);
}
