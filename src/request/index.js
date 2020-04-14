import constants from '../constants/index';
import config from '../config/index';

const request = (event, eventType = 'error') => {
    const userConfig = config.get();
    const req = new XMLHttpRequest();
    
    let host = constants.connectivity.service[userConfig.instance] || constants.connectivity.service.prod;
    
    if (userConfig.endpoint) {
        host = userConfig.endpoint;
    }
    
    const slug = '/logging/' + eventType;
    
    req.open('POST', host + slug, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(event));
    
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status !== 200) {
            console.error('failed to send event to LOGGY with error:', this.statusText);
        }
    }
};

export default request;