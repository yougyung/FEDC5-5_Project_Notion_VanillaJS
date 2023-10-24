export default function converterToArray(text) {
  const makeArray = text
    .replace(/<\/div>/g, "<pass>")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#035;/g, "#")
    .replace(/&#039;/g, "'")
    .split("<pass>");
  makeArray.pop();

  const result = makeArray.map((item) => {
    /* 제목 관련 */
    /* h1 */
    if (item.includes(' class="h1"')) {
      const text = item.replace(
        /<div contenteditable="true" class="h1">/,
        "# "
      );
      return text;
    }
    /* h2 */
    if (item.includes(' class="h2"')) {
      const text = item.replace(
        /<div contenteditable="true" class="h2">/,
        "## "
      );
      return text;
    }

    /* h3 */
    if (item.includes(' class="h3"')) {
      const text = item.replace(
        /<div contenteditable="true" class="h3">/,
        "### "
      );
      return text;
    }

    /* 구분선 관련 */

    if (item.includes(' class="divisionLine"')) {
      const text = item.replace(/<div class="divisionLine">/, "<divisionLine>");
      return text;
    }

    /* 콜 아웃 */

    if (item.includes(' class="callBox"')) {
      const text = item.replace(
        /<div class="callBox"><span class="callBox_emoji">💡<\/span><span contenteditable="true" class="callBox_textBox">/,
        "<callOut>"
      );
      return text.replace(/<\/span>/g, "");
    }

    /* 일반 div 페이지 줄 변환 */
    const text = item.replace(/<div contenteditable="true">/, "");
    return text;
  });

  return result.join("<cut>");
}
