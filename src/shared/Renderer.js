import { createDebug } from "./debug.js";

const debug = createDebug("Renderer");

const createHTMLElement = (tag) => {
    try {
        return document.createElement(tag);
    } catch (e) {
        debug(`[${tag}]는 브라우저에서 지원하지 않는 태그입니다.`);
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
        const isEventHandler = typeof props[property] === "function";
        if (isEventHandler) {
            $elem[property] = props[property];
            debug($elem, "에", property, " 이벤트 핸들러로 ", props[property], "를 등록함");
            continue;
        }
        // setAttribute는 property로 등록 못하는 key도 등록 가능함
        // className도 key로 정상 동작하는 게 신기함
        // setAttribute로 이벤트 핸들러를 등록 시 함수로 넘겨도 string으로 escape되어 변환됨 (오작동)
        debug(`${$elem.nodeName}.${property}=`, props[property]);
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
