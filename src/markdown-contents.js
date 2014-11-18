var MarkdownContents,
    Remarkable = require('remarkable'),
    jsdom = require('jsdom').jsdom,
    Contents = require('../../2014 09 11 contents/src/contents.js');

MarkdownContents = function MarkdownContents (markdown) {
    var markdownContents;

    if (!(this instanceof MarkdownContents)) {
        return new MarkdownContents(markdown);
    }

    markdownContents = this;

    markdownContents.tree = function () {
        var html = MarkdownContents.markdownToHTML(markdown),
            doc = jsdom(html),
            articles = doc.querySelectorAll('h1, h2, h3, h4, h5, h6'),
            tree;

        // This script is designed to be used in node.
        // Is there a risk in doing this other than someone else taking that risk?
        global.document = jsdom(html);

        tree = Contents.makeTree(articles, undefined, undefined, doc);
        
        MarkdownContents._removeElementProperty(tree);

        return tree;
    };

    markdownContents.markdown = function () {
        return MarkdownContents.treeToMarkdown(markdownContents.tree());
    };
};

/**
 * Render markdown to HTML.
 * 
 * @param {String} markdown
 * @return {String} HTML
 */
MarkdownContents.markdownToHTML = function (markdown) {
    var remarkable = new Remarkable();

    return remarkable.render(markdown);
};

/**
 * Generate markdown contents for an array of contents object definition.
 *
 * @param {Array} tree [{id: '', name: '', descendants: []}]
 * @return {String} markdown
 */
MarkdownContents.treeToMarkdown = function (tree, level) {
    var markdown = '',
        offset = '';

    level = level || 0;

    if (level) {
        offset = new Array(level * 4).join(' ') + ' ';
    }

    tree.forEach(function (article) {
        markdown += offset + '* [' + article.name + '](#' + article.id + ')\n';

        if (article.descendants) {
            markdown += MarkdownContents.treeToMarkdown(article.descendants, level + 1);
        }
    });

    return markdown;
};

MarkdownContents._removeElementProperty = function (tree) {
    tree.forEach(function (node) {
        delete node.element;

        MarkdownContents._removeElementProperty(node.descendants);
    });
};

module.exports = MarkdownContents;