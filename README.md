# LOGGY browser adapter

Adapter to monitor websites and web application front-ends.

## Usage

Add the script to the header of your website or web application.

```html
<script src="https://unpkg.com/@loggy/adapter-browser@0.1.7/dist/loggy-client-browser.js" crossorigin></script>
```

## Configuration

To initialize the adapter with your desired configuration, you need to pass the configuration object to the `init` method.

```html
<script src="https://unpkg.com/@loggy/adapter-browser@0.1.7/dist/loggy-client-browser.js" crossorigin></script>

<script>
  window.loggy && window.loggy.init({ ticket: '2ATNP1AD70' });
</script>
```

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