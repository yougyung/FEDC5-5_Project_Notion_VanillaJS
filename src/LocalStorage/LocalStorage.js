const STORAGE_NAME = 'SAVE_DATA_'

export function setStorage(pageData) {
  const updatedAt = new Date()
  const newData = JSON.stringify({ ...pageData, updatedAt })
  localStorage.setItem(`${STORAGE_NAME}${pageData.id}`, newData)
}

export function removeStorage(id) {
  localStorage.removeItem(`${STORAGE_NAME}${id}`)
}

export function getStorage(id) {
  return JSON.parse(localStorage.getItem(`${STORAGE_NAME}${id}`))
}
