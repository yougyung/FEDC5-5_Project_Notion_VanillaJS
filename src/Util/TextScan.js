export const textScan = (text) => {
  const H1 = "# ";
  const H2 = "## ";
  const H3 = "### ";

  const scanEditor = text.split("\n").map((tag) => {
    if (tag.startsWith(H1)) return `<h1>${tag.slice(2)}</h1>`;
    else if (tag.startsWith(H2)) return `<h2>${tag.slice(3)}</h2>`;
    else if (tag.startsWith(H3)) return `<h3>${tag.slice(4)}</h3>`;
    else return `${tag}`;
  });

  return scanEditor.join("");
};
