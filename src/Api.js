export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents"

export const request = async (url = '', options) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'Content-Type' : 'application/json',
                'x-username' : 'mino'
            }
        })

        if (res.ok) {
            return await (res.json())
        }

        throw new Error('API 처리 중 뭔가 이상합니다.')
    } catch (e) {
        alert(e.message);
    }
}
const testData = {title : 'test1', parent : 101429}

async function add(params) {
    const newData = await request('', {
        method : 'POST',
        body : JSON.stringify(params)
    });

    return newData;
}


// console.log(add(testData));





