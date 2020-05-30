import utils from '../utils/index';

/**
 * Stores the latest 25 user interactions.
 * @returns {{add: add, get: (function(): [])}}
 */
const userInteractions = () => {
    const userInteractions = [];
    
    /**
     * Adds a new user interaction to the store.
     * @param e {object} the event object
     */
    const add = (e) => {
        const userInteraction = {
            innerText: (e.target.innerText || '').slice(0, 195) + '...',
            timestamp: utils.generateUTCInSeconds(),
            element: e.target.tagName.toLowerCase(),
            elementId: (e.target.id || '').slice(0, 195) + '...',
            location: (window.location.pathname || '').slice(0, 395) + '...'
        };
        
        userInteractions.push(userInteraction);
        
        if (userInteractions.length > 25) {
            userInteractions.shift();
        }
    };
    
    /**
     * Returns all stored user interactions.
     * @returns {[]} stored user interactions
     */
    const get = () => userInteractions;
    
    return { add, get };
};

export default userInteractions();