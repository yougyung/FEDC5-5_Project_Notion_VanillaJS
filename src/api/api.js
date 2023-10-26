const API_END_POINT = 'https://kdt-frontend.programmers.co.kr'

export default async function request(url, options) {

    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'x-username': 'roto',
                'Content-Type': 'application/json'
            }
        })

        return res.ok ? res.json() : new Error('응답 오류')
    } catch(e) {
        throw new Error(`API 요청에 실패했습니다!: ${e.message}`)
    }
}