// ====================================================
// *************** prototype extend

// 在对象上添加方法
function _addMethod(obj, name, func) {
  if (obj[name]) return;
  Object.defineProperty(obj, name, { value: func });
}

/**
 * 输出指定宽度的整数，默认填充'0'
 * 注意：超出部分不进行截取
 */
_addMethod(Number.prototype, "setFill", function(w, c = "0") {
  return Math.round(this)
    .toString()
    .padStart(w, c);
});

/**
 * 返回数值的易读字符串：'x,xxx.xx'
 * @param places : 小数部分位数，默认2位
 * @param group : 整数分组位数，默认3位
 * @param thousand : 千分位符号，默认','
 * @param decimal : 小数点符号，默认'.'
 */
_addMethod(Number.prototype, "toReadable", function(
  places = 2,
  group = 3,
  thousand = ",",
  decimal = "."
) {
  if (isNaN(this)) return this.toString();

  const numStr = Math.abs(this).toFixed(places);
  let retStr = this < 0 ? "-" : ""; // 保存转换结果值
  let len = places > 0 ? numStr.length - places - 1 : numStr.length;
  let out = len > group ? len % group : 0;

  if (out) retStr += numStr.slice(0, out) + thousand;

  retStr += numStr
    .slice(out, len)
    .replace(new RegExp(`(\\d{${group}})(?=\\d)`, "g"), "$1" + thousand);

  if (places > 0) retStr += decimal + numStr.slice(len + 1);

  return retStr;
});

/**
 * 转换数值为汉字表示，忽略小数部分
 */
{
  // 计数单位依次为：个、十、百、千、万、十万、百万、千万、亿、十亿、百亿、千亿、
  //               兆、十兆、百兆、千兆、京、十京、百京、千京、垓、十垓、百垓、千垓。。。
  const digitZH = [..."零一二三四五六七八九"];
  const stepZH = ["", ..."十百千"];
  const unitZH = ["", ..."万亿兆京垓"];

  _addMethod(Number.prototype, "convert2Zh", function() {
    if (isNaN(this)) return "非数值";
    // 最大范围：九千九百九十九兆九千九百九十九亿九千九百九十九万九千九百九十九
    if (Math.abs(this) > 9999999999999999) return this.toString();

    const numStr = Math.round(Math.abs(this)).toString();
    const lastIdx = numStr.length - 1;
    let retChar = this < 0 ? "负" : this.valueOf() === 0 ? digitZH[0] : ""; // 数值的汉字表示
    let outZero = false; // 输出零
    let outUnit = false; // 输出单位

    for (let i = 0; i <= lastIdx; i++) {
      let n = numStr[lastIdx - i]; // 从低位向高位遍历，当前位数字
      let q = Math.floor(i / 4);
      let r = i % 4;

      if (!r) outUnit = false; // 万进制，每四位更改一次单位

      if (n === "0") {
        if (i === 0) outZero = true;

        // 连续的零只输出一个
        if (!outZero) {
          retChar = digitZH[0] + retChar;
          outZero = true;
        }
      } else {
        if (outZero) outZero = false;

        // 每四位显示一个单位：万、亿、兆。。。
        if (!outUnit) {
          retChar = unitZH[q] + retChar;
          outUnit = true;
        }

        retChar = stepZH[r] + retChar;

        // 最高位为十位且数值为1，则不输出“一”
        if (i !== lastIdx || n !== "1" || r !== 1) {
          retChar = digitZH[n] + retChar;
        }
      }
    }

    return retChar;
  });
}

// option: 'YYYY-MM-DD hh:mm:ss.SSS'
_addMethod(Date.prototype, "format", function(fmt) {
  const map = {
    // "(Y+)": this.getFullYear(),
    "(M+)": this.getMonth() + 1,
    "(D+)": this.getDate(),
    "(h+)": this.getHours(),
    "(m+)": this.getMinutes(),
    "(s+)": this.getSeconds(),
    "(S+)": this.getMilliseconds()
  };

  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      this.getFullYear()
        .toString()
        .substring(4 - RegExp.$1.length)
    );
  }

  for (let [k, v] of Object.entries(map)) {
    if ((k = new RegExp(k).exec(fmt))) {
      fmt = fmt.replace(k[1], v.setFill(k[1].length));
    }
  }

  return fmt;
});

// output: 'YYYY-MM-DD hh:mm:ss'
_addMethod(Date.prototype, "toUnified", function() {
  return this.format("YYYY-MM-DD hh:mm:ss");
});
