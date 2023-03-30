const isProd = process.argv.includes('--production');
const isDev = !isProd;

// настройки плагинов

module.exports = {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        collapseWhitespace: isProd,
    },
    pug: {
        pretty: isDev,
        data: {
            news: require('../data/news.json')
        }
    },
    webpack:
    {
        mode: isProd ? 'production' : 'development',
    },
    imagemin: {
        verbose: true,
    },
    fonter: {
        formats: ['woff','ttf']
    },
    svgSprites: {
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }
}