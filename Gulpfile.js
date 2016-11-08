const gulp = require('gulp');
const p = require('gulp-load-plugins')();

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const aliasify = require('aliasify');
const babelify = require('babelify');
const vueify = require('vueify');

const aliasifyConfig = {
  aliases: {
    // https://vuejs.org/guide/installation.html#Standalone-vs-Runtime-only-Build
    'vue': 'vue/dist/vue.js',
  }
};
const babelConfig = {
  presets: ['es2015'],
  plugins: ['transform-es2015-shorthand-properties'],
};

gulp.task('connect', () => {
  p.connect.server({
    root: 'dist',
    livereload: true,
  });
});

gulp.task('dev', ['dev:vue', 'dev:html', 'dev:watch', 'connect']);
gulp.task('dev:vue', () => {
  const app = browserify('src/index.js', {debug: true})
    .transform(babelify, babelConfig)
    .transform(aliasify, aliasifyConfig)
    .transform(vueify);

  return app.bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist'))
    .pipe(p.connect.reload());
});
gulp.task('dev:html', () => {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(p.connect.reload());
});
gulp.task('dev:watch', () => {
  gulp.watch('src/**/*.vue', ['dev:vue']);
  gulp.watch('src/**/*.js', ['dev:vue']);
  gulp.watch('src/**/*.html', ['dev:html']);
});

gulp.task('publish', () => {

});

gulp.task('default', ['dev']);
