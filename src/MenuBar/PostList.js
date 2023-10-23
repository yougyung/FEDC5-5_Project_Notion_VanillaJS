import { HTTPRequest } from "../Util/Api.js";
import { getItem } from "../Util/Storage.js";
import Modal from "./Modal.js";

export default function PostList({ $target, initialState, onRenderContents }) {
  const LOCAL_STORAGE_KEY = "PostID-";
  // 상단 소개 글
  const $introduce = document.createElement("div");
  $introduce.textContent = "📒 최익의 Notion";
  $introduce.style.fontSize = "20px";
  $introduce.style.margin = "20px";
  // 루트 포스트 추가
  const $addPost = document.createElement("div");
  $addPost.setAttribute("class", "addPost");
  $addPost.textContent = "📂 새 폴더 추가 ➕";
  $addPost.addEventListener("click", (e) =>
    modal.setState({
      id: null,
      $target: document.querySelector("[name=post]"),
    })
  );
  // 포스트 리스트 엘리먼트
  const $postList = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  $target.appendChild($introduce);
  $target.appendChild($addPost);

  // 모달 생성
  const modal = new Modal({
    initialState: {
      id: null,
      $target: null,
    },
    onSavePost: async (title, content, id) => {
      // 모달에 쓰여진 내용을 우선적으로 POST하고 이후 POST된 ID 값으로 PUT 진행
      const data = await fetchData("", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: content,
          parent: id,
        }),
      });

      await fetchData(`/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      this.setState(await fetchData(""));
    },
  });

  // 루트 폴더를 제외한 리스트 클릭 시 -> 해당 폴더가 가지고 있는 content 내용 editor의 state에 전달
  const onClickList = ($element) => {
    $element.addEventListener("click", async (e) => {
      const { id } = e.target;

      // 로컬의 최종 업데이트 시간과 서버의 최종 업데이트 시간을 비교하여 사용자의 선택에 의해 로컬 또는 서버의 데이터를 불러옴
      if (id) {
        const data = await fetchData(`/${id}`);
        const localData = getItem(LOCAL_STORAGE_KEY + id, data);

        if (localData.RecentlyAt && data.updatedAt < localData.RecentlyAt) {
          if (
            confirm("현재 저장되지 않은 데이터가 있습니다. 불러 오시겠습니까?")
          ) {
            // 서버 데이터를 로컬 데이터로 수정
            await fetchData(`/${id}`, {
              method: "PUT",
              body: JSON.stringify({
                title: data.title,
                content: localData.content,
              }),
            });

            onRenderContents(id);
          } else {
            onRenderContents(id);
          }

          return;
        }

        onRenderContents(id);
      }
    });
  };

  // +, - 버튼 클릭 이벤트
  const onClickButton = ($element) => {
    $element.addEventListener("click", async (e) => {
      const { id } = e.target.dataset;
      const className = e.target.className;

      // 추가버튼 클릭시 모달 생성
      if (className === "addBtn") {
        modal.setState({
          id: id,
          $target: $element,
        });
      }
      // 삭제버튼 클릭시 리스트 삭제
      else if (className === "deleteBtn") {
        await fetchData(`/${id}`, {
          method: "DELETE",
        });

        const data = await fetchData(``);
        this.setState(data);
      }
    });
  };

  // 자식 포스트 재귀호출 함수
  const postListRecursion = (depth, data, parentId) => {
    const $postListDiv = $postList.querySelector("[name=post]");

    // 루트 Post 순회
    if (depth === 0) {
      data.forEach((rootItem) => {
        const { title, id, documents } = rootItem;
        const $details = document.createElement("details");

        $details.innerHTML = `
          <summary class="summary">${title}
            <button data-id="${id}" class="addBtn">➕</button>
            <button data-id="${id}" class="deleteBtn"> ➖ </button>
          </summary>
          <ul name="${id}"></ul>
        `;

        $postListDiv.appendChild($details);
        documents.length && postListRecursion(depth + 1, documents, id);
      });
    }
    // 자식 post 순회
    else {
      // 부모에 해당하는 ul 참조
      const $ul = [...$postListDiv.querySelectorAll("ul")].filter(
        (ul) => ul.getAttribute("name") === String(parentId)
      );

      data.forEach((childData) => {
        const { title, id, documents } = childData;
        const $details = document.createElement("details");

        $details.innerHTML = `
          <summary class="summary" id="${id}">${title}
            <button data-id="${id}" class="addBtn">➕</button>
            <button data-id="${id}" class="deleteBtn"> ➖ </button>
          </summary>
          <ul name="${id}"></ul>
        `;

        $ul[0].appendChild($details);
        documents.length && postListRecursion(depth + 1, documents, id);
      });
    }
  };

  // API Request
  const fetchData = async (url, payload = {}) => {
    return await HTTPRequest(url, payload);
  };

  this.render = () => {
    $postList.innerHTML = `<div class="postlist" name="post"></div>`;
    postListRecursion(0, this.state);
    // 토글 버튼으로 루트 폴더와 하위 폴더 생성
    // 추후 재귀 함수로 리팩토링 예정
    // $postList.innerHTML = `
    // <div class="postlist" name="post">
    //   ${this.state
    //     .map(
    //       ({ title, id, documents }) => `
    //     <details>
    //        <summary class="summary">${title}
    //         <button data-id="${id}" class="addBtn"> ➕ </button>
    //         <button data-id="${id}" class="deleteBtn"> ➖ </button>
    //        </summary>
    //        <ul id="${id}">
    //         ${documents
    //           .map(
    //             ({ title, id }) =>
    //               `<li id="${id}" >${title}
    //                 <button data-id="${id}"class="addBtn"> ➕ </button>
    //                 <button data-id="${id}" class="deleteBtn"> ➖ </button>
    //               </li>`
    //           )
    //           .join("")}
    //        </ul>
    //     </details>`
    //       // const $ul = document.querySelector(`#${id}`);
    //     )
    //     .join("")}
    // </div>`;

    $target.appendChild($postList);

    const $div = document.querySelector("[name=post]");
    onClickList($div);
    onClickButton($div);
  };
}
