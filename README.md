<h2 id="markdown-contents">Markdown Contents</h2>

[![Travis build status](http://img.shields.io/travis/gajus/markdown-contents/master.svg?style=flat)](https://travis-ci.org/gajus/markdown-contents)
[![NPM version](http://img.shields.io/npm/v/markdown-contents.svg?style=flat)](https://www.npmjs.org/package/markdown-contents)

Generate table of contents for a markdown document.

The underlying implementation is rendering markdown file into HTML and then use [Contents](https://github.com/gajus/contents).
 to generate the table of contents.

<h2 id="usage">Usage</h2>

```js
var MarkdownContents,
    markdown,
    markdownContents;

MarkdownContents = require('markdown-contents');
markdown = '';
markdownContents = MarkdownContents(markdown);

/**
 * Generate flat index of the headings.
 *
 * @return {Array}
 */
markdownContents.articles();

/**
 * Generates hierarchical index of the headings from a flat index.
 *
 * @return {Array}
 */
markdownContents.tree();

/**
 * Generate markdown for the table of contents.
 *
 * @return {string}
 */
markdownContents.markdown();

/**
 * Generate markdown contents for an array of contents object definition.
 *
 * @param {Array} tree [{id: '', name: '', descendants: []}]
 * @return {string} markdown
 */
MarkdownContents.treeToMarkdown();

/**
 * Makes hierarchical index of the articles from a flat index.
 *
 * @param {Array} articles Generated using Contents.articles.
 * @param {boolean} makeUniqueIDs
 * @param {Array} uniqueIDpool
 * @return {Array}
 */
MarkdownContents.tree();
```

<h2 id="download">Download</h2>

Download using NPM:

```sh
npm install markdown-contents
```
