module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var server = './src/server/';
    var temp = './tmp/';

    var config = {

        /**
         * File paths
         */
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/',
        client: client,
        css: temp + 'css/styles.css',
        fonts: './bower_components/bootstrap/fonts/**/*.*',
        html: clientApp + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        sass: client + 'styles/styles.less',
        less: client + 'styles/styles.less',
        server: server,
        temp: temp,

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'vinylApp',
                standAlone: false,
                root: '/app'
            }
        },

        /**
         * Browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        /**
         * Node settings
         */
        defaultPort: 7205,
        nodeServer: './src/server/app.js'
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    }
    ;
    return config;
};