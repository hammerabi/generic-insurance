const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const compression = require("compression");


module.exports = {
  start: function(prodMode) {

    const env = {
      production: process.env.NODE_ENV === "production"
    };

    const express = require("express");
    const app = express();
    app.use(compression())
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(methodOverride())

    const port = Number(process.env.PORT || 8080);

    if (!env.production) {
      const webpack = require("webpack");
      const webpackMiddleware = require("webpack-dev-middleware");
      const webpackHotMiddleware = require("webpack-hot-middleware");
      const config = require("../../webpack.dev.config.js");
      const compiler = webpack(config);

      app.use(webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: "src",
        stats: {
          colors: true,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
          modules: false
        }
      }));

      app.use(webpackHotMiddleware(compiler));


    } else {
      app.use("/static", express.static(__dirname + "/public"));
    }

    app.get("*", function(req, res) {
      res.render("index");
    });

    app.listen(port, function () {
      console.log("Server running at localhost:8080");
    });
  }
}
