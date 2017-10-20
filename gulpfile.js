var gulp        = require('gulp'),
		pug         = require('gulp-pug'),
		sass        = require('gulp-sass'),
		concat      = require('gulp-concat'),
		uglify      = require('gulp-uglify'),
		browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: "./public",
      open: false
  });
  gulp.watch("source/assets/scss/*.scss", ['sass']);
  gulp.watch("source/**/*.pug", ["views"]).on('change', browserSync.reload);
  gulp.watch("source/assets/js/*.js", ["js-watch"]);
  gulp.watch("source/vendor/**/*", ["copy"]);
  gulp.watch("source/assets/*", ["img-watch"]);
});

gulp.task('views', function buildHTML() {
	return gulp.src('source/**/!(_)*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest("public"));
});

gulp.task('sass', function() {
  return gulp.src("source/assets/scss/*.scss")
	  .pipe(sass())
	  .pipe(concat('main.css'))
	  .pipe(gulp.dest("public/assets/css"))
	  .pipe(browserSync.stream());
});

gulp.task('js-watch', function() {
  return gulp.src("source/assets/js/*.js")
	  // .pipe(uglify())
	  .pipe(gulp.dest("public/assets/js"));
});

gulp.task('img-watch', function() {
  return gulp.src("source/assets/images/*")
	  .pipe(gulp.dest("public/assets/images"));
});

gulp.task('copy', function() {
	return gulp.src(['source/vendor/**/*'])
		.pipe(gulp.dest('public/assets'))
});

gulp.task('default', ['serve']);