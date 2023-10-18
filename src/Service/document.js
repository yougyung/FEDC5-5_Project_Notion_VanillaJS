const DOCUMENT_API_ADDRESS = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, userName, options = {}) => {
    const res = await fetch(`${DOCUMENT_API_ADDRESS}${url}`, {
        ...options,
        headers: {
            "Content-Type" : "application/json", 
            'x-username' : `${userName}`,
        }
    })

    if(!res.ok || res.status !== 200) {
        throw new Error("통신 실패!");
    }
    
    return res.json();
}
