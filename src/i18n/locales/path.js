// 让每个页面的内容保存在单独的文件夹
export default (function() {
  const text = window.location.pathname;
  const html = text.match(/[^\/]+(.html)/) ? text.match(/[^\/]+(.html)/)[0] : "index";
  return html.replace(/(.html)|\//g, "");
})();
