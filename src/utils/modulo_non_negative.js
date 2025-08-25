/**
 * @function module_non_negative
 * 
 * @param {int} a
 * @param {int} b
 * 
 * @return {int} Positive
 */
export function module_non_negative(a, b){
    /**
     * Validate
     */
    if([a, b].every(num => Number.isInteger(num))){
        console.log('IS INT');
    }
}