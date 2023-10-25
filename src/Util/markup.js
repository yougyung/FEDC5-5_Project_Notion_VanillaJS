export const convertToMarkup = (text) => {
    if (!text) {
        return;
    }
    let lines = text.split('</div>');
    return lines
        .map((line) => {
            line = line.replace('<div>', '');
            line = line.replace(/&nbsp;/g, ' ');
            line = line.replace(/&lt;/g, '<');
            line = line.replace(/&gt;/g, '>');
            line = line.replace(/&amp;/g, '&');
            line = line.replace(/&quot;/g, '"');
            line = line.replace(/&#035;/g, '#');
            line = line.replace(/&#039;/g, "'");

            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
            line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
            line = line.replace(/^# (.*?)$/, '<h1>$1</h1>');
            line = line.replace(/^## (.*?)$/, '<h2>$1</h2>');
            line = line.replace(/^### (.*?)$/, '<h3>$1</h3>');
            line = line.replace(/^#### (.*?)$/, '<h4>$1</h4>');
            line = line.replace(/^##### (.*?)$/, '<h5>$1</h5>');
            line = line.replace(/^###### (.*?)$/, '<h6>$1</h6>');

            line = line.replace(' ', '&nbsp;');

            if (!line) {
                return;
            }
            return '<div>' + line + '</div>';
        })
        .join('');
};
