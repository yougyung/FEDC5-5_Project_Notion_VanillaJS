export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (url = "", options) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "mino",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리 중 뭔가 이상합니다.");
  } catch (e) {
    alert(e.message);
  }
};

/** API에 더미 데이터 추가 */
const testData = { title: "여기에도!", parent: null };

async function add(params) {
  const newData = await request("", {
    method: "POST",
    body: JSON.stringify(params),
  });

  return newData;
}
// add(testData)

/** 루트 데이터 가져오기 */
export async function getRootData() {
  const rootData = await request("", {
    method: "GET",
  });

  return await rootData;
}

/** 데이터 추가하기 */
export async function addNewData(targetParentId) {
  const newData = await request("", {
    method: "POST",
    body: JSON.stringify({ title: "제목없음", parent: targetParentId }),
  });
  return await newData;
}

/** 데이터 삭제하기 */
export async function deleteData(documentId) {
  await request(`/${documentId}`, {
    method: "DELETE",
  });
}
