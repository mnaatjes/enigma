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
const debug_container = document.getElementById('debug_state');

/**
 * Enigma
 */
const enigma = new EnigmaMachine();
//const output = enigma.encrypt(Array(175).fill("A").join(""));
const output = enigma.encrypt(Array(5).fill("A").join(""));
//const outputB = enigma.encrypt("In the file where your class is defined, import the type definitions from t");
console.log(output);
enigma.debug();
console.log(enigma.state);
debug_container.appendChild(json_to_table(enigma.state));
//debug_container.appendChild(enigma.renderState());