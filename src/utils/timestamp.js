/**
 * Generates the current UTC timestamp in seconds.
 * @returns {number}
 */
const generateUTCInSeconds = () => Math.floor(Date.now() / 1000);

export default { generateUTCInSeconds };