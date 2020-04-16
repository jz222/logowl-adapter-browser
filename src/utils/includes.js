/**
 * Checks if an element is present in an array but should
 * only be used for strings and numbers. This function
 * should be preferred to the native includes function as
 * it is compatible with older browsers too.
 * @param array {array} the array that should be checked
 * @param elementToFind {string|number} the element whose presence in the array should be checked
 * @returns {boolean} a boolean that determines if the element is present in the array
 */
const includes = (array, elementToFind) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === elementToFind) {
            return true;
        }
    }
    
    return false;
};

export default includes;