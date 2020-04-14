import userInteractions from '../userInteractions/index';
import broker from '../broker/index';

/**
 * Enables the error event listener.
 */
const enableErrorListener = () => {
    window.onerror = (message, file, line, column, error = {}) => {
        column = column || (window.event && window.event.errorCharacter);
        
        const errorEvent = {
            message,
            path: file,
            line,
            column,
            stack: error.stack,
            constructor: error.constructor
        };
        
        broker.registerError(errorEvent);
        
        return false;
    };
};

/**
 * Enables the event listener for user interactions.
 */
const enableUserInteractionsListener = () => {
    document.addEventListener('focusin', userInteractions.add);
};

/**
 * Enables all event listeners.
 */
const enableAll = () => {
    enableErrorListener();
    enableUserInteractionsListener();
};

export default { enableAll };