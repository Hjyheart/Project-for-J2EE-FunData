var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-clean-css');

paths = {
    appScss: ['./public/scss/**/*.scss', '! node_module/**/*.*', './views/**/*.ejs'],
    assets: ['./public']
}

gulp.task('sass' ,function(){
    gulp.src( paths.appScss[0] )
    .pipe( sass().on('error', sass.logError) )
    .pipe( minifycss( { compatibility: 'ie8'} ))
    .pipe( gulp.dest( './public/stylesheets' ) );
});

gulp.task('watch',function(){
    gulp.watch( paths.appScss, ['sass']).on('change', function(event){
        console.log('===========================');
        console.log('scss is update successfully');
        console.log('===========================');
    })
})
