/**
 * @fileoverview 
 * @file /tests/main.js
 * 
 * @version 1.0.0
 * 
 */

/** @type {import("../src/EnigmaMachine.js").EnigmaConfiguration} */

/**
 * @description Imports the Constant Configuration variables for the Enigma Machine
 */
import { ALPHABET, ROTOR_CONFIGURATIONS, REFLECTOR_CONFIGURATIONS } from "../constants.js";

/**
 * @description Imports the default settings for the initial Enigma Machine Configuration
 */
import { DEFAULT_PLUGBOARD_SETTINGS, DEFAULT_REFLECTOR, DEFAULT_ROTOR_SETTINGS } from "../src/config.js";

/**
 * @description Import Enigma Component Classes
 */
import { Rotor } from "../src/components/Rotor.js";
import { Keyboard } from "../src/components/Keyboard.js";
import { Plugboard } from "../src/components/Plugboard.js";
import { Reflector } from "../src/components/Reflector.js";
import { EnigmaMachine } from "../src/EnigmaMachine.js";

/**
 * Debugging
 */
//console.log(DEFAULT_ROTOR_SETTINGS);
//console.log(DEFAULT_REFLECTOR);
//console.log(DEFAULT_PLUGBOARD_SETTINGS);

const enigma = new EnigmaMachine({
    plugboard: {A: "R", G: "K", O: "X"},
    rotors: [
        {name: "I", position: "D", ringSetting: "A"},
        {name: "II", position: "O", ringSetting: "A"},
        {name: "III", position: "G", ringSetting: "A"},
    ],
    reflector: DEFAULT_REFLECTOR
});

Object.values(enigma.rotors).forEach(rotor => {
    //console.table(rotor.details.ring);
});

let result = enigma.encryptMessage("test");
console.log(EnigmaMachine.formatOutput(result));

//enigma.rotors.r1.rotate(1);
//enigma.rotors.r1.setStartPosition("G");
//console.log(enigma.encrypt("A"));

//console.table(enigma.reflector.details);
//console.log(enigma.reflector.reflect(0));

///console.log(enigma.rotors.r1.details);
//console.log(enigma.rotors.r3.forward(0));
//console.log(enigma.rotors.r1.forward(0));