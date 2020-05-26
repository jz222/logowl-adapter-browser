export default {
    focusableElements: ['button', 'details', 'input', 'iframe', 'select', 'textarea'],
    connectivity: {
        serviceURL: 'https://api.logowl.io'
    },
    adapter: {
        name: 'logowl-adapter-browser',
        type: 'browser',
        version: 'v2.0.0'
    },
    consentKey: 'logowl-analytics-enabled',
    sessionKey: 'logowl-analytics-active-session'
};