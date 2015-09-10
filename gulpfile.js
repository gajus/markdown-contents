var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    Gitdown = require('gitdown');

/* gulp.task('lint', function () {
    return gulp
        .src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
}); */

gulp.task('test', /* ['lint'], */ function () {
    return gulp
        .src(['./tests/*.js'], {read: false})
        .pipe(mocha());
});

gulp.task('gitdown', function () {
    var gitdown;

    gitdown = Gitdown.read('.gitdown/README.md');

    return gitdown.write('README.md');
});

gulp.task('watch', function () {
    gulp.watch(['./src/*', './tests/*'], ['default']);
    gulp.watch(['./.gitdown/*'], ['gitdown']);
});

gulp.task('default', ['test']);
