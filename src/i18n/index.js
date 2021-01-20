import Vue from "vue";
import VueI18n from "vue-i18n";
import store from "@/stores";

var chinese, english;
try {
  const path = require("./locales/path");
  chinese = require(`@/pages/${path.default}/i18n/zh`);
  english = require(`@/pages/${path.default}/i18n/en`);
} catch (e) {}

Vue.use(VueI18n);

export default new VueI18n({
  // 隐藏警告
  silentTranslationWarn: true,
  locale: store.state.userHabit, // store.state.userHabit.language,
  messages: {
    zh: chinese && chinese.default,
    en: english && english.default
  }
});
