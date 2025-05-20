/**
 * Test for Enigma
 * 
 * @namespace Enigma
 * @version 2.1
 */
import { EnigmaMachine } from "./components/Enigma.js";
import { json_to_table } from "./utils/json_to_table.js";
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
enigma.encrypt(Array(5).fill("A").join(""));