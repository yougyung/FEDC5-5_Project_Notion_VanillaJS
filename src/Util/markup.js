export const convertToMarkup = (text) => {
    if (!text) {
        return;
    }

    return text
        .split('</div>')
        .map((line) => {
            line = line.replace('<div>', '');

            line = line.replace(/&nbsp;/g, ' '); // h태그들 판별하기 위해 공백 마크업을 " " 로 변경
            line = line.replace(/__((?:\S.*?\S)|\S)__/g, '<strong>$1</strong>'); // __굵게__
            line = line.replace(/\*\*((?:\S.*?\S)|\S)\*\*/g, '<strong>$1</strong>'); // **굵게**
            line = line.replace(/_((?:\S.*?\S)|\S)_/g, '<em>$1</em>'); // _기울게_
            line = line.replace(/\*((?:\S.*?\S)|\S)\*/g, '<em>$1</em>'); // *기울게*
            line = line.replace(/~~((?:\S.*?\S)|\S)~~/g, '<s>$1</s>'); // ~~취소선~~
            line = line.replace(/^# (.*?)$/, '<h1>$1</h1>'); // h1 부터
            line = line.replace(/^## (.*?)$/, '<h2>$1</h2>');
            line = line.replace(/^### (.*?)$/, '<h3>$1</h3>');
            line = line.replace(/^#### (.*?)$/, '<h4>$1</h4>');
            line = line.replace(/^##### (.*?)$/, '<h5>$1</h5>');
            line = line.replace(/^###### (.*?)$/, '<h6>$1</h6>'); // h6 까지
            line = line.replace(' ', '&nbsp;'); // 다시 공백 " "을 마크업으로 변경

            // 아무것도 없다면 div를 감싸주지 않고 종료
            if (!line) {
                return;
            }

            // 다시 div 태그로 감싸준다.
            return '<div>' + line + '</div>';
        })
        .join('');
};
