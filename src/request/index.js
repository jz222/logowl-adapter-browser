import constants from '../constants/index';
import config from '../config/index';

/**
 * Determines the host of the Log Owl service.
 * @returns {*}
 */
const getHost = () => {
    const userConfig = config.get();
    
    let host = constants.connectivity.serviceURL;
    
    if (userConfig.endpoint) {
        host = userConfig.endpoint;
    }
    
    return host;
};

/**
 * Sends the corresponding event to the Log Owl service.
 * @param event {object} the event that should be sent
 * @param eventType {string} type of the event determines to which endpoint the event should be sent
 */
const post = (event, eventType = 'error') => {
    const req = new XMLHttpRequest();
    
    const host = getHost();
    const slug = '/logging/' + eventType;
    
    req.open('POST', host + slug, eventType === 'error');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(event));
    
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status !== 200) {
            console.error('failed to send event to Log Owl with error:', this.statusText);
        }
    }
};

/**
 * Sends an analytic event. It uses send sendBeacon
 * to send the event or makes a regular POST request
 * if sendBeacon is not available.
 * @param payload
 */
const sendAnalytics = (payload) => {
    if ('sendBeacon' in navigator) {
        const host = getHost();
        navigator.sendBeacon(host + '/logging/analytics', JSON.stringify(payload));
    } else {
        post(payload, 'analytics');
    }
};

export default { sendError: post, sendAnalytics };