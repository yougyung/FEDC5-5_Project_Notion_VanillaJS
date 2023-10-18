export function parseContent(content) {
  // Regular Expressions
  const h1 = /^#{1}[^#].*$/gm;
  const h2 = /^#{2}[^#].*$/gm;
  const h3 = /^#{3}[^#].*$/gm;
  const bold = /\*\*[^\*\n]+\*\*/gm;
  // const italics = /[^\*]\*[^\*\n]+\*/gm;
  const italics = /\*([^*]+)\*/gm;

  // # -> Heading 1
  if (h1.test(content)) {
    const matches = content.match(h1);

    matches.forEach((element) => {
      const extractedText = element.slice(1);
      content = content.replace(element, "<h1>" + extractedText + "</h1>");
    });
  }

  // ## -> Heading 2
  if (h2.test(content)) {
    const matches = content.match(h2);

    matches.forEach((element) => {
      const extractedText = element.slice(2);
      content = content.replace(element, "<h2>" + extractedText + "</h2>");
    });
  }

  // ### -> Heading 3
  if (h3.test(content)) {
    const matches = content.match(h3);

    matches.forEach((element) => {
      const extractedText = element.slice(3);
      content = content.replace(element, "<h3>" + extractedText + "</h3>");
    });
  }

  // **Bold**
  if (bold.test(content)) {
    const matches = content.match(bold);

    matches.forEach((element) => {
      const extractedText = element.slice(2, -2);
      content = content.replace(
        element,
        "<strong>" + extractedText + "</strong>"
      );
    });
  }

  // *Italic*
  if (italics.test(content)) {
    const matches = content.match(italics);

    matches.forEach((element) => {
      const extractedText = element.slice(1, -1);
      content = content.replace(element, "<em>" + extractedText + "</em>");
    });
  }

  return content
    .split("\n")
    .map((line) => {
      if (!h1.test(line) && !h2.test(line) && !h3.test(line)) {
        return line.replace(line, line ? "<p>" + line + "</p>" : "<br/>");
      }
    })
    .join("");
}
