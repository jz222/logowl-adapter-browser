# LOGGY browser adapter

Adapter to monitor websites and web application front-ends.

## Usage

Add the script to the header of your website or web application.

```html
<script src="https://unpkg.com/@loggy/adapter-browser@0.1.8/dist/loggy-client-browser.js" crossorigin></script>
```

## Configuration

To initialize the adapter with your desired configuration, you need to pass the configuration object to the `init` method.

```html
<script src="https://unpkg.com/@loggy/adapter-browser@0.1.8/dist/loggy-client-browser.js" crossorigin></script>

<script>
  window.loggy && window.loggy.init({ ticket: '2ATNP1AD70' });
</script>
```

### Ticket

The ticket is the only mandatory information. Each service has a unique ticket and all events sent with this ticket will be attached to the corresponding service.

```javascript
loggy.init({
  ticket: '2ATNP1AD70'
});
```

### Instance

Determines to which LOGGY instance the adapter should connect. By default, it connects to the production instance. Set the property to `demo` to connect to the LOGGY demo instance. If you set it to `local` it will connect to your local LOGGY instance at `http://localhost:2800/`.

```javascript
loggy.init({
  ticket: '2ATNP1AD70',
  instance: 'demo'
});
```

### Endpoint

Set the `endpoint` property to connect to your individual LOGGY instance at a given address. Please notice that the `endpoint` property will be preferred to the `instance` property.

```javascript
loggy.init({
  ticket: '2ATNP1AD70',
  endpoint: 'https://loggy.example.com'
});
```

### Disable anonymization

By default LOGGY does not store the clients IP address. Keeping track of the IP address can be enabled with the option `anonymizeData`.

```javascript
loggy.init({
  ticket: '2ATNP1AD70',
  anonymizeData: false
});
```

## Error Tracking

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

## Testing

To test if everything works you can just try to execute an undefined function like so.

```javascript
loggy.init({ ticket: '2ATNP1AD70' });

test();
```

## Emit errors manually

You can emit errors manually to build your own error handling logic.

```javascript
try {
  undefinedFunction();
} catch(error) {
  window.loggy && window.loggy.emitError(error);
}
```

## Analytics

The adapter does not only catch errors but also collect analytic data. By default this analytics are disabled.

### Enable analytics

You can enable analytics via the `init` function.

```javascript
loggy.init({
  ticket: '2ATNP1AD70',
  sendAnalytics: true
});
```

### Enable analytics manually

To manually enable analytics after initializing the adapter, call the `enableAnalytics` function. This is useful if you want to create a banner to get the visitor's consent before collecting their data.

```javascript
loggy.init({
  ticket: '2ATNP1AD70'
});

loggy.enableAnalytics();
```

### Consent banner

The adapter comes with a default banner. The visitor's data will only be collected if the user gives it consent by clicking the "Accept" button on the banner. The keys `bannerText`, `bannerRejectLabel` and `bannerAcceptLabel` are optional. If not provided, the adapter will use defaults.

```javascript
loggy.init({
  ticket: '2ATNP1AD70',
  showBanner: true,
  bannerText: 'We would like to collect anonymized data to improve your experience.',
  bannerRejectLabel: 'Cancel',
  bannerAcceptLabel: 'Accept'
});
```

### Disable analytics manually

If a visitor gave their consent but want to revoke their decision and no longer be tracked, you can disable analytics for them by calling the `disableAnalytics` function.

```javascript
loggy.init({
  ticket: '2ATNP1AD70'
});

loggy.disableAnalytics();
```