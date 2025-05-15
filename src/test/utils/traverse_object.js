/*----------------------------------------------------------*/
/**
 * Searches an object for a given key and returns the object (value) defined by that key
 * @function traverse_object
 * 
 * @param {object} obj
 * @param {string} key
 * 
 * @returns {*}
 * @throws {TypeError}
 */
/*----------------------------------------------------------*/
export function traverse_object(obj, key){
    /**
     * Validate:
     * - Object
     * - Key
     */
    if(!obj || typeof obj !== 'object'){
        throw new TypeError('Parameter "obj" is NOT of type "Object"');
    }
    if(!key || typeof key !== 'string'){
        throw new TypeError('Parameter "key" is NOT of type "String"');
    }
    /**
     * Check first level
     */
    if(obj.hasOwnProperty(key)){
        return obj[key];
    }
    /**
     * Traverse Object
     */
    for(const prop in obj){
        if(obj.hasOwnProperty(prop) && typeof obj[prop] === 'object'){
            // Recursive
            const result = traverse_object(obj[prop], key);
            // Validate
            if(result !== undefined){
                return result;
            }
        }
    }
    /**
     * Return default
     */
    return undefined;
}