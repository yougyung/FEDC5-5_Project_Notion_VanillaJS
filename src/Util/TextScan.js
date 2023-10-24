// 마크업 적용 함수
export const applyMarkup = (text) => {
  const H1 = "# ";
  const H2 = "## ";
  const H3 = "### ";
  const BOLD = /\*\*(.*?)\*\*/g;
  const STRIKETHROUGH = /\~\~(.*?)\~\~/g;
  const UNDERSCORE = /\_\_(.*?)\_\_/g;

  // 개행을 기준으로 h1, h2, h3 태그로 파싱
  const scanEditor = text.split("\n").map((tag) => {
    if (tag.startsWith(H1)) return `<h1>${tag.slice(2)}</h1>`;
    else if (tag.startsWith(H2)) return `<h2>${tag.slice(3)}</h2>`;
    else if (tag.startsWith(H3)) return `<h3>${tag.slice(4)}</h3>`;
    else if (tag.match(BOLD)) return tag.replace(BOLD, "<b>$1</b>");
    else if (tag.match(STRIKETHROUGH))
      return tag.replace(STRIKETHROUGH, "<s>$1</s>");
    else if (tag.match(UNDERSCORE)) return tag.replace(UNDERSCORE, "<u>$1</u>");
    else return `<p>${tag}</p>`;
  });

  return scanEditor.join("");
};

// 마크업 제거 함수
export const removeMarkup = ($target) => {
  $target.addEventListener(
    "focusin",
    (e) => {
      document.querySelectorAll("h1").forEach((e, i) => {
        if (i !== 0 && !e.innerText.startsWith("# "))
          e.innerText = `# ${e.innerText}`;
      });
      document.querySelectorAll("h2").forEach((e) => {
        if (!e.innerText.startsWith("## ")) e.innerText = `## ${e.innerText}`;
      });
      document.querySelectorAll("h3").forEach((e) => {
        if (!e.innerText.startsWith("### ")) e.innerText = `### ${e.innerText}`;
      });
      document.querySelectorAll("b").forEach((e) => {
        if (!e.innerText.startsWith("**")) e.innerText = `**${e.innerText}**`;
      });
      document.querySelectorAll("s").forEach((e) => {
        if (!e.innerText.startsWith("~~")) e.innerText = `~~${e.innerText}~~`;
      });
      document.querySelectorAll("u").forEach((e) => {
        if (!e.innerText.startsWith("__")) e.innerText = `__${e.innerText}__`;
      });
    },
    { once: true }
  );
};
