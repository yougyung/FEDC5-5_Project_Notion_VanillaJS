const API_ENDPOINT = `https://kdt-frontend.programmers.co.kr`
const headers = {
  'Content-Type': 'application/json',
  'x-username': 'whdgur5717',
}
export const requestDocumentInfo = async (url, option) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/${url}`, {
      headers,
      ...option,
    })
    if (!res.ok) {
      console.log(res.status, res.statusText)
      throw new Error(res)
    }
    const data = await res.json()
    return data
  } catch (e) {
    console.error(e.statusText)
    throw new Error(e.statusText)
  }
}
