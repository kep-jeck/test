const { src, dest } = require('gulp');

// конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// плагины
const gp = require('gulp-load-plugins')();

// обработка CSS
const css = () => {
    return src(path.css.src, { sourcemaps: app.isDev })
        .pipe(gp.plumber({
            errorHandler: gp.notify.onError(error => ({
                title: 'CSS',
                message: error.message,
            }))
        }))
        .pipe(gp.concat('main.css'))
        .pipe(gp.cssimport())
        .pipe(gp.webpCss())
        .pipe(gp.autoprefixer())
        .pipe(gp.shorthand())
        .pipe(gp.groupCssMediaQueries())
        .pipe(gp.size({
            title: 'До сжатия'
        }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(gp.rename({
            suffix: '.min',
        }))
        .pipe(gp.csso())
        .pipe(gp.size({
            title: 'После сжатия'
        }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
}

module.exports = css;