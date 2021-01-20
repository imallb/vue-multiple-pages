const fs = require("fs");
const path = require("path");

class vueConfig {
  constructor() {
    this.page = "src/pages";
    // 配置单页面中文件名称
    this.style = "index.scss";
    this.index = "index.js";
    this.html = "index.html";
    // 公共入口 包含，公共组件，样式，插件等配置
    this.main = "src/main.js";
  }

  pagesPath() {
    const entryPages = {};
    const page = this.page;

    (fs.readdirSync(path.join(__dirname, page)) || []).forEach(name => {
      const entryPath = path.join(page, name);

      if (fs.statSync(path.join(__dirname, entryPath)).isDirectory()) {
        entryPages[name] = {
          // page 的入口
          entry: [
            this.main,
            path.join(entryPath, this.style),
            path.join(entryPath, this.index)
          ],
          // 模板来源
          template: path.join(entryPath, this.html),
          // 输出文件
          filename: `${name}.html`,
          // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
          chunks: ["chunk-vendors", "chunk-common", name]
        };
      }
    });
    return entryPages;
  }

  output() {
    return {
      // 应用的部署路径
      publicPath: "./",
      outputDir: "./dist",
      assetsDir: "static",

      pages: this.pagesPath(),
      productionSourceMap: false,

      // 代理
      devServer: {
        // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
        proxy: {
          "/api.php/": {
            target: "https://www.fmchain.cc",
            changeOrigin: true,
            pathRewrite: {
              "^/api.php/": "/"
            },
            headers: {
              Referer: "https://www.fmchain.cc/"
            },
            cookieDomainRewrite: {
              ".fmchain.cc": "localhost"
            }
          },
          "/uploads/": {
            target: "https://www.fmchain.cc",
            changeOrigin: true
          }
        }
      }
    };
  }
}

module.exports = new vueConfig().output();
