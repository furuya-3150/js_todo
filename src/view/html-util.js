export function escapeSpecialChars(str) {
  return str
      .replace(/&/g, "&amp;")   // & を &amp; に変換
      .replace(/</g, "&lt;")    // < を &lt; に変換
      .replace(/>/g, "&gt;")    // > を &gt; に変換
      .replace(/"/g, "&quot;")  // " を &quot; に変換
      .replace(/'/g, "&#039;"); // ' を &#039; に変換       .replace(/&/g, "&amp")
}

export function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}

export function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
      const value = values[i - 1];
      if (typeof value === "string") {
          return result + escapeSpecialChars(value) + str;
      } else {
          return result + String(value) + str;
      }
  });
  return htmlToElement(htmlString);
}

export function render(bodyElement, containerElement) {
  // containerElementの中身を空にする
  containerElement.innerHTML = "";
  // containerElementの直下にbodyElementを追加する
  containerElement.appendChild(bodyElement);
}