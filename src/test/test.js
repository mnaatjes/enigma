/**
 * Testing Main JS Document
 * @memberof Enigma
 * 
 */

import { ROTORS, UKB_A, UKB_B, STATOR, DEBUG, ETW } from "./constants.js";
import { TestRotor } from "./Rotor.js";

/**
 * HTML Elements
 */
/*
const containers = {
    lampboard: document.getElementById('lampboard'),
    keyboard: document.getElementById('keyboard'),
    plugboard: document.getElementById('plugboard'),
    etw: document.getElementById('ETW'),
    rotors: document.getElementById('rotors'),
    reflector: document.getElementById('reflector'),
};
*/
/**
 * ROTORS:
 * - Get settings
 * - Sort by "order" prop
 */
const sorted = Object.fromEntries(Object.entries(ROTORS).sort(([, a], [, b]) => {return a.order - b.order;}));
const rotors = Object.entries(sorted).reduce((acc, curr) => {
    // Props
    const name      = curr[0];
    const settings  = curr[1];
    // Create Rotor
    acc[name] = new TestRotor(settings.wiring, settings.notch, name, settings.order);
    // Return Acc Object
    return acc;
}, {});
/**
 * Reflector
 */
function reflect(signal){
    //const output = UKB_A[STATOR.indexOf((typeof signal === 'string') ? signal.toUpperCase() : signal)];
    const output = UKB_B[STATOR.indexOf((typeof signal === 'string') ? signal.toUpperCase() : signal)];
    if(DEBUG){
        console.warn('Reflect: UKB-B', "IN:", signal, STATOR.indexOf(signal), "OUT:", output, STATOR.indexOf(output));
    }
    return output;
}
/**
 * Encrypt
 */
function encrypt(signal){
    // Show signal
    console.warn("Signal:", signal);
    // Loop order forwards
    let forwards = undefined;
    Object.keys(rotors).forEach(name => {
        if(name === "I"){
            console.log('ETW   :', rotors[name].etw.join(""));
            console.log('STATOR:', rotors[name].stator.join(""));
            console.log('WIRING:', rotors[name].wiring.join(""));
        }
        forwards = rotors[name].forward(
            (forwards === undefined) ? signal : forwards
        );
    });
    // Reflect
    const reflected = reflect(forwards);
    // Loop order backwards
    let backwards = undefined;
    [...Object.keys(rotors)].reverse().forEach((name) => {
        if(name === "I"){
            console.log('STATOR:', rotors[name].stator.join(""));
            console.log('WIRING:', rotors[name].wiring.join(""));
        }
        backwards = rotors[name].backward(
            (backwards === undefined) ? reflected : backwards
        );
    });
    const output = backwards;
    // Show output
    console.warn('Output:', output);
    console.log('');
    // Return character
    return output;
}

function runEnigma(signal){
    const encrypted = [];
    /**
     * Check for rotation
     */
    const notches   = [];
    const positions = [];
    Object.keys(rotors).forEach(name => {
        const rotor = rotors[name];
        // First Order Rotor Rotates Every Character
        if(rotor.order === 0){
            rotor.rotate();
        }
        // Check for notches: Second Order
    });
    encrypted.push(encrypt(signal));
}
/**
 * Perform Series
 */
const signal    = "A";
const encrypted = [];
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();
encrypted.push(encrypt(signal));
rotors.I.rotate();

/**
 * Compose encryption
 */
const results = [];
for(let i = 0; i < encrypted.length; i += 5){
    results.push(encrypted.slice(i, i + 5).join(""));
}
console.log(results);