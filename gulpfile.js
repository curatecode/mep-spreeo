var gulp        = require('gulp'),
		pug         = require('gulp-pug'),
		sass        = require('gulp-sass'),
		uglify      = require('gulp-uglify'),
		browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: "./public"
  });
  gulp.watch("source/assets/scss/*.scss", ['sass']);
  gulp.watch("source/**/*.pug", ["views"]).on('change', browserSync.reload);
});

gulp.task('views', function buildHTML() {
	return gulp.src('source/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest("public"));
});

gulp.task('sass', function() {
  return gulp.src("source/assets/scss/*.scss")
	  .pipe(sass())
	  .pipe(gulp.dest("public/assets/css"))
	  .pipe(browserSync.stream());
});

gulp.task('js-watch', function() {
  return gulp.src("source/assets/js/*.js")
	  .pipe(browserify())
	  .pipe(uglify())
	  .pipe(gulp.dest("public/assets/js"));
});

gulp.task('default', ['serve']);