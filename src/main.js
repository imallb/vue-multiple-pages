// vue框架
import Vue from "vue";
import i18n from "@/i18n";
import store from "@/stores";
// css默认样式
import "@/style/index.scss";
// 自定义属性和方法
import "@/vplus";

Vue.config.productionTip = false;
// 加载promise.prototype.finally
require("promise.prototype.finally").shim();

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /\.vue$/
);

requireComponent.keys().forEach((fileName, index) => {
  let componentConfig = requireComponent(fileName);
  let componentName = componentConfig.default.name;
  // 当没有发现组件中存在name属性，取当前组件的文件名为组件名称
  // 是用组件时不能命名相同名称，就算在子文件夹中也建议不要取与外层和其他文件夹中的文件名，防止组件注册失败
  if (!componentName) {
    componentName = fileName.replace(/^(.*\/)|(\.vue)$/g, '')
  }

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
});

store.dispatch("changeLanguage");

// 全局vue对象
window.$vue = new Vue({
  i18n,
  store
});
