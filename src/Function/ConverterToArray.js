export default function converterToArray(text) {
  const makeArray = text
    .replace(/<\/div>/g, "<pass>")
    .replace(/&nbsp;/g, " ")
    .split("<pass>");
  makeArray.pop();

  const result = makeArray.map((item) => {
    /* h1 */
    if (item.includes(' class="h1"')) {
      const removeClassName = item.replace(/.class="h1"/, "");

      const text = removeClassName.replace(
        /<div contenteditable="true">/,
        "# "
      );
      return text;
    }
    /* h2 */
    if (item.includes(' class="h2"')) {
      const removeClassName = item.replace(/.class="h2"/, "");

      const text = removeClassName.replace(
        /<div contenteditable="true">/,
        "## "
      );
      return text;
    }

    /* h3 */
    if (item.includes(' class="h3"')) {
      const removeClassName = item.replace(/.class="h3"/, "");

      const text = removeClassName.replace(
        /<div contenteditable="true">/,
        "### "
      );
      return text;
    }

    /* 일반 div 페이지 줄 변환 */
    const text = item.replace(/<div contenteditable="true">/, "");
    return text;
  });

  return result.join("<cut>");
}
