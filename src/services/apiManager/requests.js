export function validateCreateDocumentRequest(requestDocument) {
    try {
        if (typeof requestDocument.title !== "string")
            throw new Error("문서 요청 title이 문자열 타입이 아닙니다");
        else if (
            typeof requestDocument.parent !== "number" &&
            requestDocument.parent !== null
        )
            throw new Error(
                "문서 요청 parent가 숫자 타입 혹은 루트 문서가 아닙니다"
            );
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export function validateUpdateDocumentRequest(updateDocument) {
    try {
        if (typeof updateDocument.title !== "string")
            throw new Error("문서 수정 title이 문자열 타입이 아닙니다");
        else if (typeof updateDocument.content !== "string")
            throw new Error("문서 수정 content가 문자열 타입이 아닙니다");
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
