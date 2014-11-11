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

If you are using `grunt`, then you should install this module as a dependency:

```sh
$ npm install -D htmllint-spellcheck
```

You also need to install [aspell](http://aspell.net/) to use this module.

After doing so, add the following to your `Gruntfile.js`:

```javascript
grunt.initConfig({
// ... wherever your target is for htmllint that you want to add the plugin to:
  htmllint: {
    a_target: {
	  options: {
	    // add the 'htmllint-spellcheck' plugin to the list
	    plugins: ['htmllint-spellcheck'],
		// ... rest of your options
		spellcheck: true
    }
  }
// ...
});
```

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
