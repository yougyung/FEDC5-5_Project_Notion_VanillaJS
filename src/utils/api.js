const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "meowTarae",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    throw new Error(`API Error: ${e.message}`);
  }
};

// delete
export const deleteDocument = async (id) => {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
};

// post
export const insertDocument = async (data) => {
  const res = await request("/documents", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res;
};

// get
export const getDocument = async (id) => {
  const res = await request(`/documents/${id}`, {
    method: "GET",
  });

  return res;
};

// put
export const updateDocument = async ({ id, title, content }) => {
  const res = await request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return res;
};
