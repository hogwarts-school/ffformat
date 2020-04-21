/* eslint-disable @typescript-eslint/no-require-imports */
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

gulp.task('build', function () {
  return (
    gulp
      .src(['./src/**/*.ts', '!./src/**/*.test.ts'])
      .pipe(tsProject())
      .js.pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('lib'))
  );
});
