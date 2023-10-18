const API_END_POINT = 'https://kdt-frontend.programmers.co.kr'

export async function request(url, options) {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'Lee Jae Young',
        "Content-Type": "application/json"
      },
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    alert(error.message)
  }
}



/* insert */

export async function insertDocument(params) {
  const createdPost = await request('/documents', {
    method: 'POST',
    body: JSON.stringify(params)
  })

  return createdPost
}

/* delete */

export async function deleteDocumnet(id) {
  await request(`/documents/${id}`, {
    method: 'DELETE'
  })
}

