import { addStorage, getStorage } from './storage.js';

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('textarea');
  $editor.setAttribute('id', 'editor');
  $editor.setAttribute('name', 'text');

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    // 선택한 문서 content 값 표시
    // state 유효성 검사

    const { selectedDoc, currentFocus } = this.state;
    const { pathname } = location;

    const content = selectedDoc.content;

    if (pathname === '/') {
      $editor.remove();
    } else {
      $target.appendChild($editor);

      $editor.value = !content ? '' : `${content}`;
      // 포커스 위치 설정
      if (currentFocus.element === 'content') $editor.focus();
    }
  };

  let timer = null;
  // 수정 이벤트
  $editor.addEventListener('keyup', (e) => {
    if (timer !== null) clearTimeout(timer);

    const newContent = e.target.value;

    timer = setTimeout(() => {
      const { selectedDoc } = this.state;
      const editDoc = getStorage('selectedDoc', {
        title: selectedDoc.title,
        content: selectedDoc.content,
      });

      const newDoc = { ...editDoc, content: newContent };

      addStorage('selectedDoc', newDoc);

      onEditing(newDoc);

      // onEditing(newValue);
    }, 2000);
  });

  this.render();
}
