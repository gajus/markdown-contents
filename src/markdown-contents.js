var MarkdownContents,
    Contents,
    _;

_ = require('lodash');
Contents = require('contents').default;

/**
 * @param {string} markdown
 */
MarkdownContents = function MarkdownContents (markdown) {
    var markdownContents;

    if (!(this instanceof MarkdownContents)) {
        return new MarkdownContents(markdown);
    }

    markdownContents = this;

    /**
     * Generate flat index of the headings.
     *
     * @return {Array}
     */
    markdownContents.articles = function () {
        var articles = [];

        markdown = markdown.replace(/^```[\s\S]*?\n```/mg, function (match) {
            return '';
        });

        markdown.replace(/^(#+)(.*$)/mg, function (match, level, name) {
            level = level.length;
            name = name.trim();

            articles.push({
                level: level,
                id: _.trim(name.toLowerCase().replace(/[^\w]+/g, '-'), '-'),
                name: name
            });
        });

        return articles;
    };

    /**
     * Generates hierarchical index of the headings from a flat index.
     *
     * @return {Array}
     */
    markdownContents.tree = function () {
        var articles,
            tree;

        articles = markdownContents.articles();
        tree = MarkdownContents.tree(articles);

        return tree;
    };

    /**
     * Generate markdown for the table of contents.
     *
     * @return {string}
     */
    markdownContents.markdown = function () {
        return MarkdownContents.treeToMarkdown(markdownContents.tree());
    };
};

/**
 * Generate markdown contents for an array of contents object definition.
 *
 * @param {Array} tree [{id: '', name: '', descendants: []}]
 * @return {string} markdown
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

/**
 * Makes hierarchical index of the articles from a flat index.
 *
 * @param {Array} articles Generated using Contents.articles.
 * @param {boolean} makeUniqueIDs
 * @param {Array} uniqueIDpool
 * @return {Array}
 */
MarkdownContents.tree = function (articles, makeUniqueIDs, uniqueIDpool) {
    return Contents.tree(articles, makeUniqueIDs, uniqueIDpool);
};

module.exports = MarkdownContents;
