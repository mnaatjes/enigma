/**
 * Testing Main JS Document
 * @memberof Enigma
 * 
 */

import { ROTORS, UKB_A, UKB_B, DEBUG, ETW } from "./constants.js";
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
    acc[name] = new TestRotor(settings.wiring, settings.notch, name, settings.order, settings.start, settings.ring);
    // Return Acc Object
    return acc;
}, {});
/*----------------------------------------------------------*/
/**
 * Reflector
 */
/*----------------------------------------------------------*/
function reflect(signal){
    //const output = UKB_A[ETW.indexOf((typeof signal === 'string') ? signal.toUpperCase() : signal)];
    const output = UKB_B[ETW.indexOf((typeof signal === 'string') ? signal.toUpperCase() : signal)];
    if(DEBUG){
        console.warn('Reflect: UKB-B', "IN:", signal, ETW.indexOf(signal), "OUT:", output, ETW.indexOf(output));
    }
    return output;
}
/*----------------------------------------------------------*/
/**
 * Debug Positions
 */
/*----------------------------------------------------------*/
function debugPositions(rotors){
    const currents  = [];
    const positions = [];
    const offsets   = [];
    Object.keys(rotors).forEach(name => {
        const rotor = rotors[name];
        currents.push(rotor.getCurrent());
        positions.push(rotor.position);
        offsets.push(rotor.getOffset());
    });
    console.error(
        "WINDOW:", currents.reverse().join(" "),
        "POSITIONS:", positions.reverse().join(" "),
        "OFFSETS:", offsets.reverse().join(" "),
    );
}
/*----------------------------------------------------------*/
/**
 * Encrypt
 */
/*----------------------------------------------------------*/
function encrypt(signal){
    // Show signal
    console.warn("Signal:", signal);
    // Loop order forwards
    let forwards = undefined;
    Object.keys(rotors).forEach(name => {
        if(name === "I" && DEBUG){
            console.log('ETW   :', rotors[name].etw.join(""));
            console.log('STATOR:', rotors[name].stator.join(""));
            console.log('WIRING:', rotors[name].wiring.join(""));
        }
        forwards = rotors[name].forward(
            (forwards === undefined) ? signal : forwards
        );
        if(DEBUG){
            console.error("Position:", rotors[name].getCurrent(), rotors[name].getPosition(), "Offset:", rotors[name].getOffset());
        }
    });
    /**
     * Read all positions
     */
    debugPositions(rotors);
    // Reflect
    const reflected = reflect(forwards);
    // Loop order backwards
    let backwards = undefined;
    [...Object.keys(rotors)].reverse().forEach((name) => {
        if(name === "I" && DEBUG){
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
/*----------------------------------------------------------*/
/**
 * DEBUGGING:
 * - Perform Series
 */
/*----------------------------------------------------------*/
// Initial position
debugPositions(rotors);
console.log('---------------------------------------');
// Encryption
const signal    = "A";
const encrypted = [];
for(let i = 0; i < 25; i++){
    encrypted.push(encrypt(signal));
}

/*----------------------------------------------------------*/
/**
 * Compose encryption
 */
/*----------------------------------------------------------*/

const results = [];
for(let i = 0; i < encrypted.length; i += 5){
    results.push(encrypted.slice(i, i + 5).join(""));
}
console.log(results.join(" "));
