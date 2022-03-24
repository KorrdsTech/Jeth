# Transform Props

Transform @object properties using @propKeys and @transformers. ES5 compatible.

# Installation
```sh
$ npm install transform-props
```

# Usage
```javascript
var transformProps = require('transform-props');

function castToString(arg) {
	return String(arg);
}

var doc = new MongooseModel({ subDoc: { foo: 'bar' }});
var docObj = doc.toObject();

transformProps(docObj, castToString, '_id');

console.log(typeof docObj._id); // 'string'
console.log(typeof docObj.subDoc._id); // 'string'
```
