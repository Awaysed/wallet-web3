const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { VantResolver } = require("@vant/auto-import-resolver");
// const AutoImport = require("unplugin-auto-import/webpack");
const Components1 = require("unplugin-vue-components/webpack");
console.log(1111,Components1);
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
      // AutoImport({ resolvers: [VantResolver()] }),
      Components1.default({ resolvers: [VantResolver()] }),
    ],
  },
});
