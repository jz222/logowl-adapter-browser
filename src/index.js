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
    const lastStacktrace = error.stack.replace('at ', '').split('\n')[1] || '';
    const splitStacktrace = lastStacktrace.split(':');
    
    error.line = splitStacktrace[splitStacktrace.length - 2];
    error.path = splitStacktrace.slice(0, -2).join(':').trim();
    
    broker.registerError(error);
};

export default { init, emitError };