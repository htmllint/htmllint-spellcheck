# htmllint-spellcheck

This is a htmllint plugin that uses `aspell` to spellcheck any text that
might be viewable or read by the user.

> NOTE: not currently completed, do not use (will be integrated shortly)

## Install

Just run a simple `npm install` to get this module:

```sh
$ npm install htmllint-spellcheck
# to save this as a devDependency
$ npm install -D htmllint-spellcheck
```

## Usage

If you are using the `grunt` task or cli interface, just add this to the
plugin list in the respective configuration (check the readmes' of those
projects for information on how to do this).

If you are using the `htmllint` npm module, you can add the plugin to a
linter instance by doing the following:

```javascript
var htmllint = require('htmllint');

var linter = htmllint.create();
// add the htmllint-spellcheck plugin
linter.use(require('htmllint-spellcheck'));
// or you can do this:
linter.use('htmllint-spellcheck');
```
