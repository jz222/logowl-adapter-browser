import broker from '../broker/index';

const enable = () => {
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

export default { enable };