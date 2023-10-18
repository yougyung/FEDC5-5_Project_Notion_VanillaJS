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


// TEST

// 넣기

export async function insertDocument(params) {
  const createdPost = await request('documents', {
    method: 'POST',
    body: JSON.stringify(params)
  })

  return createdPost
}

/* 삭제 */

export async function deleteDocumnet(id) {
  await request(`/documents/${id}`, {
    method: 'DELETE'
  })
}

