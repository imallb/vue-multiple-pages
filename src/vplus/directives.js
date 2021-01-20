import Vue from "vue";

function decodeHtmlEntity(text) {
  if (text) {
    const div = document.createElement("div");
    div.innerHTML = text;

    return div.innerText;
  } else {
    return "";
  }
}

Vue.directive("decode-entity", {
  bind(el, { value: content }) {
    if (content) {
      el.innerHTML = decodeHtmlEntity(content);
    }
  },
  update(el, { value: content, oldValue }) {
    if (content !== oldValue) {
      el.innerHTML = decodeHtmlEntity(content);
    }
  }
});
