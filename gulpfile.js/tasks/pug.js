const { src, dest } = require('gulp');

// конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// плагины
const gp = require('gulp-load-plugins')();

// обработка PUG
const pug = () => {
    return src(path.pug.src)
        .pipe(gp.plumber({
            errorHandler: gp.notify.onError(error => ({
                title: 'PUG',
                message: error.message,
            }))
        }))
        .pipe(gp.pug(app.pug))
        .pipe(gp.webpHtml())
        .pipe(dest(path.pug.dest))
}

module.exports = pug;