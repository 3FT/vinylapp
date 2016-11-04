var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var del = require('del');
var config = require('./gulp.config.old.js')();
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

/*
gulp.task('styles', ['clean-styles'], function() {


    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe(gulp.dest(config.temp));
});*/

// gulp.task('fonts', ['clean-fonts'], function() {
//    log('Copying fonts');
//
//     return gulp
//         .src(config.fonts)
//         .pipe(gulp.dest(config.build + 'fonts'));
// });

gulp.task('images', ['clean-images'], function() {
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
   clean(config.temp + '/**/*.*', done);
});

gulp.task('watch:vet', function () {
    gulp.watch('./**/*.js', ['vet']);
});

gulp.task('sass-watcher', function () {
    gulp.watch(config.sass, ['styles']);
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

gulp.task('inject', ['wiredep', 'styles'], function() {
    log('Wire up the app css into the html, and call wiredep');
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function() {

    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'buid'
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
            }, config.browserReloadDelay)
        })
        .on('start', function() {
            log('*** nodemon started');
            setTimeout(function() {
                startBrowserSync();
            }, config.browserReloadDelay)
        })
        .on('crash', function() {
            log('*** nodemone crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
});

gulp.task('styles', ['fonts'], function() {
    log('Compiling SASS --> CSS');
    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass({
            includePaths: [config.bootstrapDir + '/assets/stylesheets'],
        }))
        .pipe(gulp.dest(config.temp + '/css'));
});

gulp.task('fonts', function() {
    log('Copying Bootstrap fonts');
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
        .pipe(gulp.dest(config.temp + '/fonts'));
});

//////////////////

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
    if (browserSync.active) {
       return;
    }

    log('Starting browser-sync on port ' + port);

    gulp.watch([config.sass], ['styles'])
        .on('change', function(event) { changeEvent(event); });

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [config.client + '**/*.*',
                '!' + config.sass,
                config.temp + '**/*.css'
        ],
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