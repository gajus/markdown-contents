## Markdown Contents

[![Travis build status](http://img.shields.io/travis/gajus/markdown-contents/master.svg?style=flat-square)](https://travis-ci.org/gajus/markdown-contents)
[![Coveralls](https://img.shields.io/coveralls/gajus/markdown-contents.svg?style=flat-square)](https://coveralls.io/github/gajus/markdown-contents)
[![NPM version](http://img.shields.io/npm/v/markdown-contents.svg?style=flat-square)](https://www.npmjs.org/package/markdown-contents)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Generate table of contents for a markdown document.

The underlying implementation is rendering markdown file into HTML and then use [Contents](https://github.com/gajus/contents).
 to generate the table of contents.

## Usage

```js
import MarkdownContents from 'markdown-contents';

const markdown = '';
const markdownContents = MarkdownContents(markdown);

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
