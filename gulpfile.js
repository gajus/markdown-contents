var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint'),
    gitdown = require('gitdown');

gulp.task('lint', function () {
    return gulp
        .src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['lint'], function () {
    return gulp
        .src(['./tests/*.js'], {read: false})
        .pipe(mocha());
});

gulp.task('gitdown', function () {
    var Gitdown = require('gitdown'),
        gitdown,
        config = {};

    // Read the markdown file written using the Gitdown extended markdown.
    // File name is not important.
    // Having all of the Gitdown markdown files under .gitdown/ path is a recommended convention.
    gitdown = Gitdown.read('.gitdown/README.md');

    // If you have the subject in a string, call the constructor itself:
    // gitdown = Gitdown('literal string');

    // Output the markdown file.
    // All of the file system operations are relative to the root of the repository.
    gitdown.write('README.md');
});

gulp.task('watch', function () {
    gulp.watch(['./src/*', './tests/*'], ['default']);
    gulp.watch(['./.gitdown/*'], ['gitdown']);
});

gulp.task('default', ['test']);