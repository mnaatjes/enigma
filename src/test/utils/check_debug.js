/**
 * @import
 */
import { traverse_object } from "./traverse_object.js";
import { find_parent_object } from "./find_parent_object.js";
import { create_debug } from "./create_debug.js";
import { DEBUG } from "../constants.js";
/*----------------------------------------------------------*/
/**
 * Checks top level and local level for enabling | disabling of debug messages
 * @function check_debug
 * 
 * @param {string} local Specific object associated with debug level
 * @return {boolean}
 */
/*----------------------------------------------------------*/
export function check_debug(local){
    /**
     * Check for all enabled or disabled
     */
    if(DEBUG.all === true){
        // Every debug enabled
        return true;
    } else {
        /**
         * Find local
         */
        const prop_value = traverse_object(DEBUG, local);
        /**
         * If local prop value is false --> search parent for "all" enabled
         */
        if(prop_value === false){
            const parent = find_parent_object(DEBUG, local);
            /**
             * Check for All setting
             */
            if(parent !== undefined && parent !== null){
                /**
                 * Search for "all" key and return value
                 */
                if(parent.hasOwnProperty('all')){
                    console.log(parent);
                    return parent.all;
                }
            } else {
                /**
                 * No parent exists:
                 * - Refer to Debug All
                 */
                return DEBUG.all;
            }
        } else {
            /**
             * Return propvalue
             */
            return prop_value;
        }
    }
}