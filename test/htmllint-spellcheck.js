describe('htmllint-spellcheck', function () {
    var plugin = require('../');

    it('should export the spellcheck rule', function () {
        var rule = require('../lib/spellcheck');

        expect(plugin).to.have.deep.property('rules[0]', rule);
    });
});
