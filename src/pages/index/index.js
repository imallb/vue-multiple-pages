import index from "./index.vue";

window.$vue.$options.render = h => {
  return h(index);
};
window.$vue.$mount("#app");
