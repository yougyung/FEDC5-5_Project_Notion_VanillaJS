import toggleImg from "../../img/toggle.png";

export const documentListTemplate = (documents, isRoot = false) => {
  return `
            ${documents
              .map(({ id, title }) => {
                return `
                  <ul data-id="${id}" class="document-title" style="display: ${
                  isRoot ? "block" : "none"
                }"> 
                      <li class="document-element">
                          <img src="${toggleImg}" class="toggle-btn"/>
                          <button class="document">${
                            title === "" ? "제목 없음" : title
                          }</button>
                          <div class="control-button">
                              <button class="remove-btn">-</button>
                              <button class="add-sub-btn">+</button>
                          </div>
                      </li>
                  </ul>
              `;
              })
              .join("")}
            `;
};

export const documentTemplate = (id, display, style) => {
  const $template = document.createElement("ul");
  $template.className = "document-title";
  $template.style.display = display;
  if (style) $template.style.paddingLeft = "10px";

  $template.setAttribute("data-id", id);

  $template.innerHTML = `
    <li class="document-element">
      <img src="${toggleImg}" class="toggle-btn" />
       <button class="document">제목 없음</button>
        <div class="control-button">
            <button class="remove-btn">-</button>
            <button class="add-sub-btn">+</button>
        </div>
    </li>
  `;

  return $template;
};
