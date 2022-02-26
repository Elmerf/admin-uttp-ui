const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ["id"],
      }),
    ],
  },
};
