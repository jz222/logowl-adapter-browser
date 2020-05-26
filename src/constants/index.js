export default {
    focusableElements: ['button', 'details', 'input', 'iframe', 'select', 'textarea'],
    connectivity: {
        serviceURL: 'https://api.logowl.io'
    },
    adapter: {
        name: 'logowl-adapter-browser',
        type: 'browser',
        version: 'v0.1.7'
    },
    consentKey: 'logowl-analytics-enabled',
    sessionKey: 'logowl-analytics-active-session'
};