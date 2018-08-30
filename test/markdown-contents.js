const expect = require('chai').expect;
const MarkdownContents = require('../src/markdown-contents.js');

describe('MarkdownContents', function () {
    describe('.treeToMarkdown()', function () {
        it('converts array representation of the table of contents to a markdown list', function () {
            var tree,
                markdown;

            tree = [
                {id: 'foo', name: 'Foo', descendants: []},
                {id: 'bar', name: 'Bar', descendants: []}
            ];

            markdown = MarkdownContents.treeToMarkdown(tree);

            expect(markdown).to.equal('* [Foo](#foo)\n* [Bar](#bar)\n');
        });
        it('indents markdown list element to reflect content nesting', function () {
            var tree,
                markdown,
                foo,
                bar,
                baz;

            foo = {id: 'foo', name: 'Foo', descendants: []};
            bar = {id: 'bar', name: 'Bar', descendants: []};
            baz = {id: 'baz', name: 'Baz', descendants: []};

            foo.descendants = [bar];
            bar.descendants = [baz];

            tree = [foo];

            markdown = MarkdownContents.treeToMarkdown(tree);

            expect(markdown).to.equal('* [Foo](#foo)\n    * [Bar](#bar)\n        * [Baz](#baz)\n');
        });
    });
});

describe('markdownContents', function () {
    var removeElementProperty;

    describe('.articles()', function () {
        it('returns a collection of objects representing flat index of the table headings', function () {
            var markdownContents = MarkdownContents('# a\n## b\n'),
                tree = markdownContents.articles(),
                expectedTree;

            expectedTree = [
                {level: 1, id: 'a', name: 'a'},
                {level: 2, id: 'b', name: 'b'}
            ];

            expect(tree).to.deep.equal(expectedTree);
        });
        it('does not include headings in the codeblock', function () {
            var markdownContents = MarkdownContents('# a\n```\n# b\n```'),
                tree = markdownContents.articles(),
                expectedTree;

            expectedTree = [
                {level: 1, id: 'a', name: 'a'}
            ];

            expect(tree).to.deep.equal(expectedTree);
        });
    });
    describe('.tree()', function () {
        it('returns a collection of objects representing the table of contents', function () {
            var markdownContents = MarkdownContents('# a\n## b\n'),
                tree = markdownContents.tree(),
                expectedTree;

            expectedTree = [
                {level: 1, id: 'a', name: 'a', descendants: [
                    {level: 2, id: 'b', name: 'b', descendants: []}
                ]}
            ];

            expect(tree).to.deep.equal(expectedTree);
        });
    });
    describe('.markdown()', function () {
        it('generates markdown representing the table of contents', function () {
            var markdownContents = MarkdownContents('# a\n## b\n'),
                markdown = markdownContents.markdown(),
                expectedMarkdown = '* [a](#a)\n    * [b](#b)\n';

            expect(markdown).to.equal(expectedMarkdown);
        });
    });
});
