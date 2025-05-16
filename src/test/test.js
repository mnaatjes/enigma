/**
 * Test for Enigma
 * 
 * @namespace Enigma
 * @version 2.1
 */
import { EnigmaMachine } from "./components/Enigma.js";
/**
 * NOTES:
 */

/**
 * Enigma
 */
const enigma = new EnigmaMachine();
console.log(enigma);
const output = enigma.encrypt(Array(175).fill("A").join(""));
console.log(output);