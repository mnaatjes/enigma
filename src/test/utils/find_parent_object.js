/**
 * @function find_parent_object
 * 
 * @param {object} obj
 * @param {string} key
 * @param {null|object} parent Default NULL
 */
export function find_parent_object(obj, key, parent=null){
    /**
     * Validate
     */
    if(!obj || typeof obj !== 'object'){
        throw new TypeError('Parameter "obj" is NOT of type "Object"');
    }
    if(!key || typeof key !== 'string'){
        throw new TypeError('Parameter "key" is NOT of type "String"');
    }
    /**
     * Check first level:
     * - Has no parent
     */
    if(obj.hasOwnProperty(key)){
        return parent;
    }
    /**
     * Traverse Object
     */
    for(const prop in obj){
        // Check value if object
        if(obj.hasOwnProperty(prop) && typeof obj[prop] === 'object'){
            // Call to dump key when found
            const result = find_parent_object(obj[prop], key, obj);
            // Validate
            if(result !== undefined){
                return result;
            }
        }
    }
    /**
     * Return Default
     */
    return undefined;
}