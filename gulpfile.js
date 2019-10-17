const gulp = require("gulp"),
      gulpUtil = require("gulp-util"),
      del = require("del"),
      vinylPaths = require("vinyl-paths"),
      webpack = require("webpack"),
      webpackDevServer = require("webpack-dev-server"),
      webpackConfig = require("./webpack.config.js"),
      fs = require('fs');


// Чистка директории сбилдженных файлов
gulp.task("clean", () => {
    return gulp.src("./public/build")
        .pipe(vinylPaths(del));
});

// Билдим главный bundle.js файл
gulp.task("build:bundle", (callback) => {
    webpack(webpackConfig({devServer: false }), (err, stats) => {
        if(err) throw new gulpUtil.PluginError("webpack", err);
        gulpUtil.log("[webpack]", stats.toString());
        callback();
    });
});


gulp.task("build", ["clean"], () => {    // Чистим перед сборкой
    gulp.start("build:bundle");  // Gulp обрабатывает эти задачи параллельно, порядок здесь не важен.
});

gulp.task("serve", (callback) => {             // Стартуем сервер
    let compiler = webpack(webpackConfig({ devServer: true }));
    new webpackDevServer(compiler,
        {
            contentBase: "./public",
            publicPath: "/",
            inline: true,
            hot: true,
            historyApiFallback: true,
            https: {
                key: fs.readFileSync('./ssl/server.key'),
                cert: fs.readFileSync('./ssl/server.crt'),
            }
        }
    ).listen(8090, "localhost", (err) => {
        if(err) throw new gulpUtil.PluginError("webpack-dev-server", err);
        gulpUtil.log("[webpack-dev-server]", "https://localhost:8090/");
    }); // Слушаем сервер

    callback();
});

gulp.task('default', ['build', 'serve']);