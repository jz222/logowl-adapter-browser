# LOGGY browser adapter

Adapter to monitor websites and web application front-ends.

## Configuration

The following options are available.

### Ticket

The ticket is the only mandatory information. Each service has a unique ticket and all events sent with this ticket will be attached to the corresponding service.

### Badges

Badges contain individual information that will be attached to the event. A badge must be of type string.

```javascript
window.loggy.init({
  ticket: '2ATNP1AD70',
  badges: {
    example: 'information',
    language: navigator.language
  }
});
```

### Instance

Determines to which LOGGY instance the adapter should connect. By default, it connects to the production instance. Set the property to `demo` to connect to the LOGGY demo instance. If you set it to `local` it will connect to your local LOGGY instance at `http://localhost:2800/`.

```javascript
loggy.init({
  instance: 'demo',
  ticket: '2ATNP1AD70'
});
```

### Endpoint

Set the `endpoint` property to connect to your individual LOGGY instance at a given address. Please notice that the `endpoint` property will be preferred to the `instance` property.

```javascript
loggy.init({
  endpoint: 'https://loggy.example.com',
  ticket: '2ATNP1AD70'
});
```