export const postStorage = {};

// postStorage 객체 키(title) 값(id) 추가
export const pushPostStorage = (postData) => {
  const { title, id } = postData;

  if (!postStorage[title]) postStorage[title] = id;
  else postStorage[title] = id;
};

export const linkText = (text) => {
  for (const key in postStorage) {
    const regex = new RegExp(key, "g");

    text = text.replace(
      regex,
      `<div class="linktext" id="${postStorage[key]}" >${key}</div>`
    );
  }
  // 일단 title과 같은 content들에 div 입히는건 완료
  const splitText = text.split("\n").map((data) => {
    if (!data.startsWith("📃")) return data;
    else return;
  });

  return splitText.join("\n");
};
