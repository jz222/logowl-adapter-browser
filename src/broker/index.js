import constants from '../constants/index';
import request from '../request/index';
import config from '../config/index';
import utils from '../utils/index';
import logs from '../logs/index';

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
        stacktrace,
        adapter: constants.adapter,
        timestamp: utils.generateUTCInSeconds()
    };
    
    request(payload);
};

export default { registerError };