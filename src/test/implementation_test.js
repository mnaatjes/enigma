/**
 * Implementation Test:
 * - Ringstellung
 */
import { Ringstellung } from "./components/Ringstellung.js";
import { Reflector } from "./components/Reflector.js";
import { check_debug } from "./utils/check_debug.js";
/**
 * Ringstellung
 * @type {Ringstellung}
 */
const ringstellung = new Ringstellung();
/**
 * Reflector
 * @type {Reflector}
 */
const reflector = new Reflector("UKB_B");
/**
 * @function encrypt
 * 
 * @param {string} signal Input character
 * 
 * @return {string} Output character
 * @throws {ReferenceError, TypeError}
 */
function encrypt(signal){
    /**
     * Validate input signal
     */
    const forward   = ringstellung.forwards(signal);
    const reflected = reflector.reflect(forward);
    const backward  = ringstellung.backwards(reflected);
    /**
     * Validate output and return
     */
    if(typeof backward === 'string' && backward.length === 1){
        return backward.toUpperCase();
    } else {
        throw new Error('Invalid Output from "encrypt" method!');
    }
}
/**
 * Encrypts a string of characters
 * @function encipher
 * 
 * @param {string} message
 * @returns {string} Output message
 */
function encipher(message){
    /**
     * Validate Message:
     * - Type
     * - Invalid Characters
     * - Trim Spaces
     */
    if(typeof message !== 'string'){
        throw new TypeError('Message must be a string!');
    }
    /**
     * Search message for invalid characters
     */
    /**
     * Debug Settings
     */
    ringstellung.debugSettings();
    /**
     * Perform encryption
     */
    const stream = [];
    message.split("").forEach(char => {
        stream.push(encrypt(char));
    });
    /**
     * Validate and Format output:
     * - Check all single character letters
     * - Split into arrays of 5 characters
     * - Join arrays into single string and return
     */
    const results = [];
    for(let i = 0; i < stream.length; i += 5){
        results.push(stream.slice(i, i + 5).join(""));
    }
    /**
     * Return output
     */
    return results.join(" ");
}
/**
 * Debugging
 */
const output = encipher(Array(95).fill("A").join(""));
console.log(output);

/**
 * NOTES:
 * Bad at 15:
 * - Correct:   GDNJQ -> AAQ
 * - Output:    GDNJJ -> ABQ
 * - Solution: notch_character + this.offset at FIXED
 * 
 * Error at 94
 * - Correct:   HDDVO -> AER
 * - Output:    HDDEV -> BER
 * 
 */
