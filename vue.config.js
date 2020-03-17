// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/constants.scss";`
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            emitWarning: true
          }
        }
      ]
    }
  }
};
