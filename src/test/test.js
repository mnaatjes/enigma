/**
 * Test for Enigma
 * 
 * @namespace Enigma
 * @version 2.1
 */
import { EnigmaMachine } from "./components/Enigma.js";
/**
 * HTML Elements:
 */
const containers = {
    keyboard: document.getElementById('keyboard'),
    lampboard: document.getElementById('lampboard'),
    debug: document.getElementById('debug_state'),
};

/**
 * Enigma
 */
const enigma = new EnigmaMachine(document.getElementById('container'));
const output = enigma.encrypt(Array(5).fill("A").join(""));
console.log(output);
const ele = enigma.renderState();