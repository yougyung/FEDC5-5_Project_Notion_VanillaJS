export const convertToMarkup = (text) => {
    if (!text) {
        return;
    }
    return text
        .split('</div>')
        .map((line) => {
            line = line.replace('<div>', '');

            // 비어있다면 div를 제거해주고 종료
            if (line === '') {
                return '';
            }

            // // Headers
            // if (line.startsWith('# ')) {
            //     line = `<h1>${line.slice(2)}</h1>`;
            // } else if (line.startsWith('## ')) {
            //     line = `<h2>${line.slice(3)}</h2>`;
            // } else if (line.startsWith('### ')) {
            //     line = `<h3>${line.slice(4)}</h3>`;
            // } else if (line.startsWith('#### ')) {
            //     line = `<h4>${line.slice(5)}</h4>`;
            // } else if (line.startsWith('##### ')) {
            //     line = `<h5>${line.slice(6)}</h5>`;
            // } else if (line.startsWith('##### ')) {
            //     line = `<h6>${line.slice(7)}</h6>`;
            // } else {
            //     line = `<div>${line}</div>`;
            // }

            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
            line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

            return line;
        })
        .join('');
};

/* 
replace(/&nbsp;/g, " ")     .replace(/&lt;/g, "<")     .replace(/&gt;/g, ">")     .replace(/&amp;/g, "&")     .replace(/&quot;/g, '"')     .replace(/&#035;/g, "#")     .replace(/&#039;/g, "'")
*/
