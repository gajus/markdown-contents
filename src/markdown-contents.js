var MarkdownContents,
    marked = require('marked'),
    Contents = require('contents');

/**
 * @param {string} markdown
 */
MarkdownContents = function MarkdownContents (markdown) {
    var markdownContents;

    if (!(this instanceof MarkdownContents)) {
        return new MarkdownContents(markdown);
    }

    markdownContents = this;

    markdownContents.tree = function () {
        var renderer = new marked.Renderer(),
            articles = [],
            tree;

        renderer.heading = function (text, level, raw) {
            articles.push({
                level: level,
                id: text.toLowerCase().replace(/[^\w]+/g, '-'),
                name: text
            });
        };

        marked(markdown, {
            renderer: renderer
        });

        tree = Contents.tree(articles, []);

        return tree;
    };

    markdownContents.markdown = function () {
        return MarkdownContents.treeToMarkdown(markdownContents.tree());
    };
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

module.exports = MarkdownContents;