const API_ENDPOINT = `https://kdt-frontend.programmers.co.kr`
const headers = {
  'Content-Type': 'application/json',
  'x-username': 'dlwhd5717',
}
export const requestDocumentInfo = async (url, option) => {
  const res = await fetch(`${API_ENDPOINT}/${url}`, {
    headers,
    ...option,
  })
  if (!res.ok) {
    const { status, statusText } = res
    throw new HTTPError(status, statusText)
  }
  return await res.json()
}

export class HTTPError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'HTTPError'
    this.status = status
    console.log(this.status)
  }
  get showAlert() {
    switch (this.status) {
      case 404:
        return alert('잘못된 접근입니다')
      case 401:
        return alert('header를 확인해주세요')
    }
  }
}