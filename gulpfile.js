var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var del = require('del');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;


gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling LESS --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp + 'css'));
});

gulp.task('fonts', function() {
   log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'))
        .pipe(gulp.dest(config.temp + 'fonts'));
});

gulp.task('images', function() {
   log('Copying and compressing the images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationlevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    log ('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

gulp.task('clean-fonts', function(done) {
   clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function(done) {
   clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean-styles', function(done) {
   clean(config.temp + '/**/*.css', done);
});

gulp.task('clean-code', function(done) {
   var files = [].concat(
       config.temp + '**/*.js',
       config.build + '**/*.html',
       config.build + 'js/**/*.js'
   );
    clean(files, done);
});


gulp.task('less-watcher', function () {
    gulp.watch(config.less, ['styles']);
});

gulp.task('templatecache', ['clean-code'], function() {
   log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));

});

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
    log('Wire up the app css into the html, and call wiredep');
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject'], function() {
    log(('Optimizing the javascript, css, html'));

   // var assets = $.useref.assets({searchPath: './'});
    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe($.useref({searchPath: './'}))
        //.pipe($.if('**/app.js', $.ngAnnotate()))
        .pipe($.if('**/*.css', $.csso()))
        .pipe($.if('**/*.js', $.uglify()))
        .pipe(gulp.dest(config.build));

});

gulp.task('serve-build', ['optimize'], function() {
    serve(false /* isDev */);
});

gulp.task('serve-dev', ['inject'], function() {
    serve(true /* isDev */ );
});

//////////////////
function serve(isDev) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
             'PORT': port,
             'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    $.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            setTimeout(function() {
                startBrowserSync(isDev);
            }, config.browserReloadDelay);
        })
        .on('crash', function() {
            log('*** nodemone crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev) {
    if (browserSync.active) {
       return;
    }

    log('Starting browser-sync on port ' + port);

    if (isDev) {
        gulp.watch([config.less], ['styles'])
            .on('change', function(event) { changeEvent(event); });
    } else {
        gulp.watch([config.less, config.js, config.html], ['optimize', browserSync.reload])
            .on('change', function(event) { changeEvent(event); });
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [config.client + '**/*.*',
                '!' + config.less,
                config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    browserSync(options);
}

function clean(path, done) {
    log('Cleaning ' + $.util.colors.blue(path));
    del(path).then(done());
}

function log(msg) {
    if(typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}