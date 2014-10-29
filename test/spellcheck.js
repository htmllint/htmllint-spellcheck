describe('spellcheck', function () {
    var spellcheck = require('../lib/spellcheck');

    it('should be an object', function () {
        expect(spellcheck).to.be.an('object');
    });

    describe('isViewableElement', function () {
        it('should not pass a script element', function () {
            var viewable = spellcheck.isViewableElement({ type: 'script' });

            expect(viewable).to.be.false;
        });

        it('should not pass a style element', function () {
            var viewable = spellcheck.isViewableElement({ type: 'style' });

            expect(viewable).to.be.false;
        });

        it('should not pass an element in a script tag', function () {
            var ele = {
                parent: {
                    type: 'script'
                },
                type: 'text',
                data: 'some text in a script'
            };

            var viewable = spellcheck.isViewableElement(ele);

            expect(viewable).to.be.false;
        });

        it('should pass a top level element', function () {
            var viewable = spellcheck.isViewableElement({ type: 'text' });

            expect(viewable).to.be.true;
        });
    });

    describe('isViewableAttrib', function () {
        it('should return true for title attrib', function () {
            var viewable = spellcheck.isViewableAttrib('title');

            expect(viewable).to.be.true;
        });

        it('should return true for alt attrib', function () {
            var viewable = spellcheck.isViewableAttrib('alt');

            expect(viewable).to.be.true;
        });

        it('should return true for alt, regardless of case', function () {
            var viewable = spellcheck.isViewableAttrib('AlT');

            expect(viewable).to.be.true;
        });

        it('should return false for random attrib', function () {
            var viewable = spellcheck.isViewableAttrib('RANDOM');

            expect(viewable).to.be.false;
        });
    });

    describe('spellcheck', function () {
        it('should return nothing for correctly spelled text', function () {
            var promise = spellcheck.spellcheck('hello world', [0, 0]);

            expect(promise).to.become([]);
        });

        it('should return an error for a misspelled word', function () {
            var promise = spellcheck.spellcheck('herro', [0, 0]);

            expect(promise).to.eventually.have.length(1);
        });
    });
});
