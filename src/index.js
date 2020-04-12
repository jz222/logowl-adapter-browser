import eventListener from './eventListener/index';
import interceptors from './interceptors/index';
import config from './config/index';

const init = (userConfig) => {
    config.set(userConfig);
    
    interceptors.enableAll();
    eventListener.enable();
};

export default { init };