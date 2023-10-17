const DOCUMENT_API_ADDRESS = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, username, options = {}) => {
    const res = await fetch(`${DOCUMENT_API_ADDRESS}${url}`, {
        ...options,
        headers: {
            "Content-Type" : "application/json", 
            'x-username' : `${username}`,
        }
    })

    if(!res.ok || res.status !== 200) {
        throw new Error("통신 실패!");
    }
    
    return res.json();
}

// [
//     {
//         "id": 1, // Document id
//         "title": "노션을 만들자", // Document title
//         "documents": [
//             {
//                 "id": 2,
//                 "title": "블라블라",
//                 "documents": [
//                     {
//                         "id": 3,
//                         "title": "함냐함냐",
//                         "documents": []
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         "id": 4,
//         "title": "hello!",
//         "documents": []
//     }
// ]
