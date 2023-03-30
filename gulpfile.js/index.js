const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// конфигурация
const path = require('./config/path.js');
const app = require('./config/app.js')

// Сервер
const server = () => {
	browserSync.init({
		server: {
			baseDir: path.root
		}
	});
}

// задачи
const requireDir = require('require-dir');
const tasks = requireDir('./tasks', { recurse: true });

// наблюдение
const watcher = () => {
	watch(path.pug.watch, tasks.pug).on('all', browserSync.reload);
	watch(path.scss.watch, tasks.scss).on('all', browserSync.reload);
	watch(path.js.watch, tasks.js).on('all', browserSync.reload);
	watch(path.img.watch, tasks.img).on('all', browserSync.reload);
	watch(path.svg.watch, tasks.svg).on('all', browserSync.reload)
	watch(path.fonts.watch, tasks.fonts).on('all', browserSync.reload);
}

// продакшн
const build = series(
	tasks.clear,
	parallel(tasks.pug, tasks.scss, tasks.js, tasks.img, tasks.svg, tasks.fonts),
)

// разработка
const dev = series(
	build,
	parallel(watcher, server)
);

// вызовы задач
exports.watch = watcher;
exports.pug = tasks.pug;
exports.html = tasks.html;
exports.scss = tasks.scss;
exports.css = tasks.css;
exports.js = tasks.js;
exports.img = tasks.img;
exports.svg = tasks.svg;
exports.fonts = tasks.fonts;

// сборка
exports.default = app.isProd ? build : dev;
