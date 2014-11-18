## Markdown Contents

{"gitdown": "badge", "name": "travis"}
{"gitdown": "badge", "name": "npm-version"}

Generate table of contents for a markdown document.

The underlying implementation is rendering markdown file into HTML and then use [Contents](https://github.com/gajus/contents).
 to generate the table of contents.

## Usage

```js
var Contents = require('markdown-contents'),
    markdown = '',
    config = '';

Contents(markdown, config);
```

## Download

Download using NPM:

```sh
npm install markdown-contents
```