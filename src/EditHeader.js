import { addStorage, getStorage } from './storage.js';

export default function EditHeader({ $target, initialState, onEditing }) {
  const $editHeader = document.createElement('header');
  $editHeader.className = 'edit-header';
  $target.appendChild($editHeader);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const { selectedDoc, currentFocus } = this.state;
    const title = selectedDoc.title;
    const { pathname } = location;

    if (pathname === '/') {
      $editHeader.remove();
    } else {
      $target.appendChild($editHeader);

      $editHeader.innerHTML =
        title !== undefined
          ? `
      <input type="text" id="title" name="title" placeholder="제목 없음" value=""/>
     `
          : '';

      const $editHeaderInput = document.querySelector('input#title');
      if (currentFocus.element === 'title') $editHeaderInput.focus();
      $editHeaderInput.value = title;
    }

    // focus 이벤트

    const $editHeaderInput = document.querySelector('input#title');

    if (!!$editHeaderInput) {
      $editHeaderInput.addEventListener('focus', (e) => {
        const $input = e.target;
        $input.placeholder = '';
      });

      $editHeaderInput.addEventListener('blur', (e) => {
        const $input = e.target;
        if ($input.text !== '') $input.placeholder = '제목 없음';
      });

      let timer = null;
      // 수정 이벤트
      $editHeaderInput.addEventListener('keyup', (e) => {
        if (timer !== null) clearTimeout(timer);

        const newTitle = e.target.value;

        timer = setTimeout(() => {
          const { selectedDoc } = this.state;
          const editDoc = getStorage('selectedDoc', {
            title: selectedDoc.title,
            content: selectedDoc.content,
          });

          const newDoc = { ...editDoc, title: newTitle };

          // addStorage('selectedDoc', {
          //   ...editDoc,
          //   title: newTitle,
          // });

          addStorage('selectedDoc', newDoc);

          onEditing(newDoc);
        }, 2000);
      });
    }
  };

  this.render();
}
