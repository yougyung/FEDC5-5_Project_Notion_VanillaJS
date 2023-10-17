import { apiClient } from "./apiClient";

export const getPostList = async () => {
  const res = await apiClient("", { method: "GET" });
  return res;
};

export const getPost = async documentId => {
  const res = await apiClient(`/${documentId}`, { method: "GET" });
  return res;
};

/*
{
  "title": "문서 제목",
  "parent": null
}

{
  "id": 6,
  "title": "문서 제목",
  "createdAt": "생성된 날짜",
  "updatedAt": "수정된 날짜"
}
*/
export const createPost = async postBody => {
  const res = await apiClient("", {
    method: "POST",
    body: JSON.stringify(postBody),
  });
  return res;
};

/*
{
  "title": "제목 수정",
  "content": "내용 수정"
}
*/
export const updatePost = async (documentId, postBody) => {
  const res = await apiClient(`/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(postBody),
  });
  return res;
};

export const deletePost = async documentId => {
  const res = await apiClient(`/${documentId}`, {
    method: "DELETE",
  });
  return res;
};
