const createHTMLElement = (tag) => {
    try {
        return document.createElement(tag);
    } catch (e) {
        console.log(`[${tag}]는 브라우저에서 지원하지 않는 태그입니다.`);
    }
};

export const renderIntoHTML = (rawProps) => {
    const { tag, properties } = rawProps;

    // 1. 텍스트 노드면 우선 반환
    if (tag === "TEXT_CONTENT") {
        return document.createTextNode(properties.textContent);
    }

    // 2. 요소 생성
    const $elem = createHTMLElement(tag);

    const { className = "", children = [], ...props } = properties;

    // 3. className 타입에 따라 다르게
    if (typeof className === "string" && className.length > 0) {
        $elem.className = className;
    }

    if (className instanceof Array) {
        $elem.className = className.join(" ");
    }

    // 4. 요소의 property 설정대로 추가
    for (const property of Object.keys(props)) {
        // className도 key로 정상 동작하는 게 신기함
        // setAttribute는 property로 등록 못하는 key도 등록 가능함
        // TODO: setAttribute는 string 형태의 이벤트 리스너만 등록 가능한지 확인해보기
        $elem.setAttribute(property, props[property]);
    }

    // 5. 자식 요소 생성 및 등록
    for (const child of children) {
        // 이미 HTML Element로 들어온 경우는 그대로 사용
        const $child = child instanceof HTMLElement ? child : renderIntoHTML(child);
        $elem.appendChild($child);
    }

    return $elem;
};
