/**
 * Debug types
 * @type {Object}
 */
const DEBUG_TYPES = {
    LOG: 'log',
    WARN: 'warn',
    ERROR: 'error',
};
/*----------------------------------------------------------*/
/**
 * @function create_debug
 * 
 * @param {object} properties Key => Value pairs of title => variable to display
 * @param {string} [type] String value from DEBUG_TYPES corresponding to console[type]; Default LOG
 * @param {string} [local] Default NULL
 * 
 * @returns {void}
 */
/*----------------------------------------------------------*/
export function create_debug(properties, type=DEBUG_TYPES.LOG, local=null){
    /**
     * Check type of properties parameter
     */
    if(typeof properties !== 'object'){
        throw new TypeError('Supplied "properties" parameter MUST be an Object!');
    }
    /**
     * Parse properties
     */
    const props = Object.entries(properties).map(([key, value]) => {
        return {
            name: key.toUpperCase(),
            type: typeof value,
            value
        };
    });
    /**
     * Loop
     */
    console[type](Object.values(props).map((item) => {
        return `${item.name} (${item.type}): ${item.value}`;
    }).join(" | "));
}