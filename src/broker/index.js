import userInteraction from '../userInteractions/index';
import constants from '../constants/index';
import request from '../request/index';
import config from '../config/index';
import utils from '../utils/index';
import logs from '../logs/index';

/**
 * Prepares an error and sends it to the LOGGY service.
 * @param message {string} error message
 * @param path {string} path of the file where the error occurred
 * @param line {string} the line in which the error occurred
 * @param stacktrace {string} stack trace of the error
 * @param constructor {object} constructor of the error
 */
const registerError = ({ message, path = '', line = '', stack: stacktrace, constructor }) => {
    const userConfig = config.get();
    
    if (!message || !stacktrace || !userConfig.ticket) {
        return;
    }
    
    const payload = {
        ticket: userConfig.ticket,
        message,
        path,
        logs: logs.get(),
        ...(userConfig.badges && { badges: userConfig.badges }),
        line: line.toString(),
        type: (constructor && constructor.name) || 'error',
        userInteractions: userInteraction.get(),
        host: window.location.origin,
        stacktrace,
        adapter: constants.adapter,
        timestamp: utils.generateUTCInSeconds()
    };
    
    request(payload);
};

export default { registerError };