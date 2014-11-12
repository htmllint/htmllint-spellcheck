var aspell = require('aspell'),
    Promise = require('promise'),
    Queue = require('promise-queue');

Queue.configure(Promise);
var queue = new Queue(5, Infinity);

module.exports = {
    name: 'spellcheck',
    on: ['dom'],
    filter: ['text', 'tag']
};

module.exports.lint = function (element, opts) {
    var lang = opts[this.name],
        issues = null;

    if (!lang || !this.isViewableElement(element)) {
        return [];
    }

    if (element.type === 'text') {
        return this.spellcheck(element.data, element.lineCol);
    } else if (element.attribs) {
        return this.lintAttribs(element.attribs);
    }

    return [];
};

module.exports.isViewableElement = function (element) {
    var parent = element;

    while (parent) {
        if (parent.type === 'script' ||
            parent.type === 'style') {
            return false;
        }

        parent = parent.parent;
    }

    return true;
};

module.exports.lintAttribs = function (attribs) {
    var issues = [];

    Object.keys(attribs).forEach(function (attribName) {
        var attrib = attribs[attribName],
            newIssues = null;

        if (!this.isViewableAttrib(attribName)) {
            return;
        }

        newIssues = this.spellcheck(attrib.value, attrib.valueLineCol);
        issues = issues.concat(newIssues);
    }.bind(this));

    return issues;
};

var viewableAttribs = ['title', 'alt'];
module.exports.isViewableAttrib = function (attribName) {
    var lowercaseName = attribName.toLowerCase();

    return (viewableAttribs.indexOf(lowercaseName) > -1);
};

module.exports.spellcheck = function (text, pos) {
    return queue.add(function () {
        return this.spawnSpellcheck(text, pos);
    }.bind(this));
};

module.exports.spawnSpellcheck = function (text, pos) {
    return new Promise(function (resolve, reject) {
        var emitter = aspell(text),
            issues = [],
            line = 0;

        emitter.on('error', function (chunk) {
            // TODO: how to handle errors in rules?
            reject(issues);
        });
        emitter.on('result', function (result) {
            if (result.type === 'line-break') {
                line += 1;
            } else if (result.type === 'misspelling') {
                issues.push({
                    msg: 'Misspelling: ' + result.word,
                    line: pos[0] + line,
                    column: (line ? result.position : result.position + pos[1])
                });
            }
        });
        emitter.on('end', function () {
            resolve(issues);
        });
    });
};
