import eventListener from './eventListener/index';
import interceptors from './interceptors/index';
import broker from './broker/index';
import config from './config/index';

const init = (userConfig) => {
    config.set(userConfig);
    
    interceptors.enableAll();
    eventListener.enable();
};

const emitError = (error) => {
    broker.registerError(error);
};

export default { init, emitError };