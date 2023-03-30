const { src, dest } = require('gulp');

// конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// плагины
const gp = require('gulp-load-plugins')();
const svgSprite = require('gulp-svg-sprite');

// обработка SVG
const sprite = () => {
    return src(path.svg.src)
        .pipe(gp.plumber({
            errorHandler: gp.notify.onError(error => ({
                title: 'SVG',
                message: error.message,
            }))
        }))
        .pipe(svgSprite(app.svgSprites))
        .pipe(dest(path.svg.dest))

}

module.exports = sprite;