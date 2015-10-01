## Markdown Contents

{"gitdown": "badge", "name": "travis"}
{"gitdown": "badge", "name": "npm-version"}

Generate table of contents for a markdown document.

The underlying implementation is rendering markdown file into HTML and then use [Contents](https://github.com/gajus/contents).
 to generate the table of contents.

## Usage

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

## Download

Download using NPM:

```sh
npm install markdown-contents
```
