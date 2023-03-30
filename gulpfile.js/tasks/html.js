const { src, dest } = require('gulp');

// конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// плагины
const gp = require('gulp-load-plugins')();

// обработка HTML
const html = () => {
	return src(path.html.src)
		.pipe(gp.plumber({
			errorHandler: gp.notify.onError(error => ({
				title: 'HTML',
				message: error.message,
			}))
		}))
		.pipe(gp.fileInclude())
		.pipe(gp.webpHtml())
		.pipe(gp.size({
			title: 'До сжатия'
		}))
		.pipe(gp.htmlmin(app.htmlmin))
		.pipe(gp.size({
			title: 'После сжатия'
		}))
		.pipe(dest(path.html.dest))
}

module.exports = html;