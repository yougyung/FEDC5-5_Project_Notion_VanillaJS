//'x-username': '주장권'
import { API_END_POINT, X_USERNAME } from "../env"

async function request(url, id) {
    const res = await fetch(`${API_END_POINT}${url}`, {
        ...id,
        headers: {
            'x-username': X_USERNAME,
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const json = await res.json()
        return json;
    }
}


export async function getRootDocumentsList() {
    const res = await request("");
    console.log(res);
    return res;
}