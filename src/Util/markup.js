export const convertToMarkup = (text) => {
    if (!text) {
        return;
    }
    let lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Headers
        if (line.startsWith('# ')) {
            line = `<h1>${line.slice(2)}</h1>`;
        } else if (line.startsWith('## ')) {
            line = `<h2>${line.slice(3)}</h2>`;
        } else if (line.startsWith('### ')) {
            line = `<h3>${line.slice(4)}</h3>`;
        }

        // Unordered list items
        else if (line.startsWith('* ')) {
            line = `<li>${line.slice(2)}</li>`;
            // If the previous or next lines are not list items, add <ul> tags
            if (i === 0 || !lines[i - 1].startsWith('* ')) {
                line = '<ul>' + line;
            }
            if (i === lines.length - 1 || !lines[i + 1].startsWith('* ')) {
                line += '</ul>';
            }
        }

        // Bold and italic text
        let boldPattern = /\*\*(.*?)\*\*/g;
        let italicPattern = /\*(.*?)\*/g;

        line = line.replace(boldPattern, '<strong>$1</strong>');
        line = line.replace(italicPattern, '<em>$1</em>');

        // Links
        let linkPattern = /\[(.*?)\]\((.*?)\)/g;
        line = line.replace(linkPattern, '<a href="$2">$1</a>');

        lines[i] = line;
    }

    return lines.join('\n');
};
