export default {
    focusableElements: ['button', 'details', 'input', 'iframe', 'select', 'textarea'],
    connectivity: {
        service: {
            local: 'http://localhost:2800',
            demo: 'https://loggy-demo-qvnfzcesoq-ew.a.run.app',
            prod: 'https://loggy-prod-qvnfzcesoq-ew.a.run.app'
        }
    },
    adapter: {
        name: 'loggy-adapter-browser',
        type: 'browser',
        version: 'v0.1.7'
    }
};