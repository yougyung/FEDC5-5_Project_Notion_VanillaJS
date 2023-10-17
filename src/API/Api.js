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

// const obj = {
//   'title': 'Test Children 1 100994 Document',
//   'parent': 100994
// }


// async function pushDocument(url, params) {

//   const createdPost = await request(url, {
//     method: 'POST',
//     body: JSON.stringify(params)
//   })

//   console.log(createdPost)
// }
// pushDocument('/documents', obj)

/* 삭제 */

// async function deleteDoc(url, id) {
//   await request(`${url}/${id}`, {
//     method: 'DELETE'
//   })
// }

// deleteDoc('/documents', 100983)
