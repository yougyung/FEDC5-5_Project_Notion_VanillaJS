import styles from "./editor.module.scss";

const { s_editorForm, s_editorInput, s_editorContent } = styles;

function Editor() {
  return {
    element: `
      <form class=${s_editorForm}>
        <fieldset>
          <legend class="a11yHidden">새 문서 작성</legend>
          <label for="title">제목</label>
          <input id="title" type="text" class=${s_editorInput}/>
          <label for="content">내용</label>
          <textarea id="content" rows=50 class=${s_editorContent}></textarea>
        </fieldset>
      </form>
    `,
  };
}

export default Editor;
