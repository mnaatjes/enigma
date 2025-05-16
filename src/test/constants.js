/**
 * Contains the values used within the Enigma namespace
 * 
 * @file constants.js
 * @memberof Enigma
 * @since 2.0       Created
 * @version 2.1     Consolidated
 * - Removed ROTOR_PROPS, REFLECTOR_PROPS, DEFAULT_SETTINGS
 * - Contains DEBUG object
 * - Contains ALPHABET for a fixed (immutable) reference to a 0 indexed alphabet
 */

/**
 * Fixed alphabet is never changed, advanced, or altered
 * @type {array}
 */
export const ALPHABET  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Debug Settings Object
 * @type {Object}
 */
export const DEBUG = {
    all: false,
    each: false,
    status: false,
    setRings: false,
    
};