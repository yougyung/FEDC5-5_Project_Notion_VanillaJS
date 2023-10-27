/**
 * 파싱 중 한 노드의 시작(<) 부터 끝(>)에 해당하는 부분을 파싱하는 파서.
 *
 * 노드 단위를 파싱한다고 하여 NodeParser라고 이름 붙임.
 */
export class NodeParser {
    #tag;
    #type;
    #opened;
    #properties;
    #pendingKeyStack;

    /**
     * 토큰이 `<`로 시작하는 경우 NodeParser가 생성됨
     * NodeParser는 이후 닫는 tag의 닫는 괄호(>)가 나올 때까지 파싱을 수행 후 생성할 Element를 반환
     *
     * @param {string} token `<`로 시작하는 토큰
     */
    constructor(token) {
        // "<tag a=b c=" --> ['<tag', 'a=b', 'c=']
        // trim 추가했음. '<h1 className=editor__title contentEditable=true '처럼 들어오면 문제가 됨.
        // TODO: trim이 괜찮은지 알아보기, 문제가 되면 정규 표현식 고치기
        const [tag, ...propsStrings] = token.trim().slice(1).split(" ");

        this.#tag = tag;
        this.#type = "open";
        this.#opened = true;
        this.#properties = {};
        this.#pendingKeyStack = [];

        // ['a=b', 'c='] --> [
        //      ['a', 'b']
        //      ['c', '']
        // ]
        const props = propsStrings.map((propString) => propString.split("="));
        for (const [key, value] of props) {
            // value가 VALUE여서 현재 string에 없는 경우
            // 당장은 처리할 수 없음.
            if (value === "") {
                this.#pendingKeyStack.push(key);
                continue;
            }

            this.#properties[key] = value;
        }
    }

    /**
     * @param {object | string} child
     */
    appendChild(child) {
        if (!this.#properties.children) {
            this.#properties.children = [];
        }

        this.#properties.children.push(child);
    }

    /**
     * token을 입력 받아 프로퍼티, 자식을 처리한다.
     *
     * @param {string} rawToken 여는 태그의 여는 꺾쇠가 아닌 token
     * @returns {object | undefined} 닫는 tag의 닫는 꺾쇠(>)를 받은 경우 파싱 결과를 반환한다.
     */
    parseToken(rawToken) {
        // 1. </ 로 시작하는 경우 무조건 종료 태그의 시작임
        if (rawToken.startsWith("</")) {
            this.#type = "close";
            this.#opened = true;
            return;
        }

        // a=b c=d /> ---> [true, 'a=b c=d']
        const { hasClosingBracket, inlineClose, token } = this.#parseEndTag(rawToken);

        // 2. 닫는 꺾쇠가 포함된 경우
        if (hasClosingBracket) {
            this.#opened = false;

            // 3. /> 이거나 닫는 태그의 닫는 꺾쇠였던 경우. 파싱 종료.
            if (inlineClose || this.#type === "close") {
                // 나중에는 HTMLElement로 반환하기
                return {
                    tag: this.#tag,
                    properties: this.#properties,
                };
            }

            // > 혹은 /> 만 있던 경우 남은 token은 빈 스트링이므로 미리 종료
            if (token.length === 0) {
                return;
            }
        }

        // 스트링을 child/props로 해석할지 구분
        // 4. props로 해석해야 하는 경우
        if (this.#openTagOpened()) {
            // 'a=b c=d' --> ['a=b', 'c='] --> [
            //      ['a', 'b']
            //      ['c', '']
            // ]
            const props = token
                .trim()
                .split(" ")
                .map((propString) => propString.split("="));
            for (const [key, value] of props) {
                // value가 VALUE여서 현재 string에 없는 경우
                // 당장은 처리할 수 없음.
                if (value === "") {
                    this.#pendingKeyStack.push(key);
                    continue;
                }

                this.#properties[key] = value;
            }
            return;
        }

        // 5. 자식으로 들어오는 TextContent인 경우
        const textNode = {
            tag: "TEXT_CONTENT",
            properties: {
                textContent: token,
            },
        };
        this.appendChild(textNode);
    }

    /**
     * @param {string | function | object} value
     */
    parseValue(value) {
        // props인지 child인지 판단해야 함
        // 1. child인 경우
        if (!this.#openTagOpened()) {
            // 1-1. null이면 무시
            if (value == null) {
                return;
            }

            // 1-2. 배열인 경우
            // map 함수 등으로 자식 HTML Element가 반환되는 CASE
            if (value instanceof Array) {
                for (const $elem of value) {
                    if (!($elem instanceof HTMLElement)) {
                        throw new Error(
                            "NodeParser] value 파싱 중 배열 요소 중 HTMLElement가 아닌 값을 만났습니다.",
                        );
                    }

                    this.appendChild($elem);
                }
                return;
            }

            // 1-3. 자식으로 들어오는 TextContent
            if (typeof value === "string") {
                const textNode = {
                    tag: "TEXT_CONTENT",
                    properties: {
                        textContent: value,
                    },
                };
                this.appendChild(textNode);
                return;
            }

            // 1-4. 그 외이면 직접 파싱한 HTML Element
            this.appendChild(value);
            return;
        }

        // 2. props인 경우
        // 3. key가 value를 기다리고 있는 경우
        const stack = this.#pendingKeyStack;
        if (stack.length > 0) {
            const key = stack[stack.length - 1];

            // 3-1. key가 style인 경우 특수하게 처리해야 함
            if (key === "style") {
                value = this.#createStyleString(value);
            }

            this.#properties[key] = value;
            stack.pop();
            return;
        }

        // 4. 자체 표현식에서 해결하는 경우
        // e.g. { value: 'exampleValue' }, { doubleChecked: true }
        // == null로 undefined, null일 때는 무시 (의도된 동작임)
        if (value == null) {
            return;
        }

        // string, object가 아닌 경우
        if (typeof value !== "string" || typeof value !== "object") {
            throw new Error("[NodeParser] value 파싱 중 string, object가 아닌 타입을 만났습니다");
        }

        for (const [propKey, propValue] of Object.entries(value)) {
            this.#properties[propKey] = propValue;
        }
    }

    // style 프로퍼티의 경우 할당 시 string으로 할당해야 함.
    // object -> string으로 변환하는 과정 필요
    #createStyleString(value) {
        return Object.entries(value)
            .map(([key, value]) => `${key}:${value}`)
            .join(";");
    }

    /**
     *
     * @param {string} token
     * @returns {{ hasClosingBracket: boolean, inlineClose: boolean, token: string ]}
     */
    #parseEndTag(token) {
        // 닫는 꺾쇠 case
        if (token.endsWith("/>")) {
            return {
                hasClosingBracket: true,
                inlineClose: true,
                token: token.slice(0, token.length - 2),
            };
        }
        if (token.endsWith(">")) {
            return {
                hasClosingBracket: true,
                inlineClose: false,
                token: token.slice(0, token.length - 1),
            };
        }

        return { hasClosingBracket: false, inlineClose: false, token };
    }

    #openTagOpened() {
        return this.#type === "open" && this.#opened;
    }
}
