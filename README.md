<h2 id="markdown-contents">Markdown Contents</h2>

[![Travis build status](http://img.shields.io/travis/gajus/markdown-contents/master.svg?style=flat)](https://travis-ci.org/gajus/markdown-contents)
[![NPM version](http://img.shields.io/npm/v/markdown-contents.svg?style=flat)](https://www.npmjs.org/package/markdown-contents)

Generate table of contents for a markdown document.

The underlying implementation is rendering markdown file into HTML and then use [Contents](https://github.com/gajus/contents).
 to generate the table of contents.

<h2 id="usage">Usage</h2>

```js
var Contents = require('markdown-contents'),
    markdown = '',
    config = '';

Contents(markdown, config);
```

<h2 id="download">Download</h2>

Download using NPM:

```sh
npm install markdown-contents
```