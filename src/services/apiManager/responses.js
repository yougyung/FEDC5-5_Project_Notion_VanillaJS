export function validateRootDocumentResponse(rootDocument) {
    function validate(data) {
        if (typeof data.id !== "number")
            throw new Error("문서 id가 숫자 타입이 아닙니다");
        else if (typeof data.title !== "string")
            throw new Error("문서 title가 문자열 타입이 아닙니다");
        else if (Array.isArray(data.documents) === false)
            throw new Error("문서 documents가 배열이 아닙니다");
    }

    if (Array.isArray(rootDocument) === false) {
        throw new Error("rootDocument가 배열이 아닙니다");
    }

    try {
        rootDocument.forEach((data) => validate(data));
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export function validateDocumentContentResponse(documentContent) {
    try {
        if (typeof documentContent.id !== "number")
            throw new Error("문서 id가 숫자 타입이 아닙니다");
        else if (typeof documentContent.title !== "string")
            throw new Error("문서 title가 문자열 타입이 아닙니다");
        else if (typeof documentContent.content !== "string")
            throw new Error("문서 content가 문자열 타입이 아닙니다");
        else if (Array.isArray(data.documents) === false)
            throw new Error("문서 documents가 배열이 아닙니다");
        else if (typeof documentContent.createdAt !== "string")
            throw new Error("문서 createdAt이 문자열 타입이 아닙니다");
        else if (typeof documentContent.updatedAt !== "string")
            throw new Error("문서 updatedAt이 문자열 타입이 아닙니다");
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export function validateCreateDocumentResponse(responseDocument) {
    try {
        if (typeof responseDocument.title !== "string")
            throw new Error("문서 응답 title이 문자열 타입이 아닙니다");
        else if (typeof responseDocument.id !== "number")
            throw new Error("문서 응답 id가 숫자 타입이 아닙니다");
        else if (typeof responseDocument.createdAt !== "string")
            throw new Error("문서 응답 createdAt이 문자열 타입이 아닙니다");
        else if (typeof responseDocument.updatedAt !== "string")
            throw new Error("문서 응답 updatedAt이 문자열 타입이 아닙니다");
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
