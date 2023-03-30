const { src, dest } = require('gulp');

// конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// плагины
const gp = require('gulp-load-plugins')();

// обработка Fonts
const fonts = () => {
    return src(path.fonts.src)
        .pipe(gp.plumber({
            errorHandler: gp.notify.onError(error => ({
                title: 'Fonts',
                message: error.message,
            }))
        }))
        .pipe(gp.newer(path.fonts.dest))
        .pipe(gp.fonter(app.fonter))
        .pipe(dest(path.fonts.dest))
        .pipe(gp.ttf2woff2())
        .pipe(dest(path.fonts.dest))
}

module.exports = fonts;