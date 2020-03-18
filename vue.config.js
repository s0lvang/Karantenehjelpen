// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/constants.scss";`
      }
    }
  },
  devServer: {
    disableHostCheck: true
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
  },
  pwa: {
    name: "Karantenehjelpen",
    themeColor: "#0060a3",
    msTileColor: "#0060a3",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW"
  }
};
