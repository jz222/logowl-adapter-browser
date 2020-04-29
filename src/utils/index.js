import parseStacktrace from './parseStacktrace';
import timestamp from './timestamp';
import includes from './includes';

export default {
    generateUTCInSeconds: timestamp.generateUTCInSeconds,
    parseStacktrace,
    includes
};