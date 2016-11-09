'use strict';
  
  const NODE_ENV = process.env.NODE_ENV || "development";
  const webpack = require("webpack");
module.exports = { 
	context: __dirname + "/frontend", 
  entry:  {
  	home: "./home", 
  	about: "./about", 
  },
  output: { 
  	path: __dirname + "/public"
    filename: "[name].js",
    library: "[name]"

  },
  watch: NODE_ENV == "development",

  watchOptions:{
  	aggregateTimeout: 100
  },
  devtool: NODE_ENV == "development" ? "source-map" : null,
  plugins:[
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        LANG: JSON.stringify("ru")
    }) 
  ],
  resolve:{
    modulesDirectories: ["node_modules"],
    extensions: ["",".js"], 

  },
  resolveLoader:{
    modulesDirectories: ["node_modules"],
    moduleTemplates:   ["*-loader","*"],
    extensions: ["",".js"], 
  },
  module:{
    loader:[{
      test:   /\.js$/,
      loader: "babel"
    }]
  }
  
}
if (NODE_ENV=="production"){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_controle: true,
            unsafe: true
        }
    })
  )
}
