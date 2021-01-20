import Vue from "vue";
import Vuex from "vuex";
import i18n from "@/i18n";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userHabit: "zh" // 保存用户选择语言
  },
  mutations: {
    saveLanguage({ userHabit }, language) {
      userHabit = language;
      localStorage.setItem("language", language);
    }
  },
  actions: {
    // 保存language属性运行方法
    // 获取language主要在3种情况，url属性 > 在localStorage缓存中 > 默认
    async changeLanguage({ state, commit }) {
      const lang = location.search.match(/(language=)[^\&]+/g);
      const language = lang && lang[0] ? lang[0].replace("language=", "")
        : localStorage.getItem("language") ? localStorage.getItem("language")
          : state.userHabit;
      commit("saveLanguage", language);
      i18n.locale = language;
      return true;
    }
  },
  strict: true
});
