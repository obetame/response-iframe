var gulp = require("gulp");
var uglify = require("gulp-uglify");

gulp.task("default",function(){
	return gulp.src("./src/response-iframe.js")
	.pipe(uglify())
	.pipe(gulp.dest("dist/"));
});