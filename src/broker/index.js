import userInteraction from '../userInteractions/index';
import analytics from '../analytics/index';
import constants from '../constants/index';
import request from '../request/index';
import config from '../config/index';
import utils from '../utils/index';
import logs from '../logs/index';

/**
 * Prepares an error and sends it to the Log Owl service.
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
    
    message = message.length >= 1000 ? message.slice(0, 995) + '...' : message;
    stacktrace = stacktrace.length >= 15000 ? stacktrace.slice(0, 14995) + '...' : stacktrace;
    
    const payload = {
        ticket: userConfig.ticket,
        anonymizeData: userConfig.anonymizeData,
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
    
    request.sendError(payload);
};

/**
 * Prepares analytic data and sends it to the Log Owl service.
 */
const sendAnalyticsData = () => {
    const userConfig = config.get();
    const analyticsData = analytics.get();
    
    analyticsData.ticket = userConfig.ticket;
    
    if (userConfig.sendAnalytics) {
        request.sendAnalytics(analyticsData);
    }
};

export default { registerError, sendAnalyticsData };