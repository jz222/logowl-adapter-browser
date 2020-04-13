import userInteractions from '../userInteractions/index';
import broker from '../broker/index';

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

const enableUserInteractionsListener = () => {
    document.addEventListener('focusin', userInteractions.add);
};

const enableAll = () => {
    enableErrorListener();
    enableUserInteractionsListener();
};

export default { enableAll };