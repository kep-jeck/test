const { src, dest } = require('gulp');

// конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// плагины
const sass = require('gulp-sass')(require('sass'));
const gp = require('gulp-load-plugins')();

// обработка SCSS
const scss = () => {
    return src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(gp.plumber({
            errorHandler: gp.notify.onError(error => ({
                title: 'SCSS',
                message: error.message,
            }))
        }))
        .pipe(gp.sassGlob())
        .pipe(sass())
        .pipe(gp.webpCss())
        .pipe(gp.autoprefixer())
        .pipe(gp.shorthand())
        .pipe(gp.groupCssMediaQueries())
        .pipe(gp.size({
            title: 'До сжатия'
        }))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
        .pipe(gp.rename({
            suffix: '.min',
        }))
        .pipe(gp.csso())
        .pipe(gp.size({
            title: 'После сжатия'
        }))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
}

module.exports = scss;
