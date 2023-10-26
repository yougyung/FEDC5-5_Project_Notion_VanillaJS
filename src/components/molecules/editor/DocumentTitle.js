/*
 * DocumentTitle
 * - Title : 문서 제목 (Editor)
 */

import styleInJS from '../../../style/tagStyles.js';
import { saveDocumentTitle } from '../../../utils/saveDocumentTitle.js';

export default function DocumentTitle({ $target, initialState, onEditTitle }) {
  const $title = document.createElement('input');
  styleInJS({ $target: $title, styleTagName: 'DocumentTitle' });

  $title.setAttribute('placeholder', initialState.title || '제목을 입력하세요.');
  $target.appendChild($title);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  $title.addEventListener('keyup', e => {
    const nextTitle = e.target.value;
    saveDocumentTitle(nextTitle, this.state.id);
    onEditTitle(nextTitle);
  });

  this.render = () => {
    $title.value = this.state.title;
    this.state.isDisabled ? $title.setAttribute('disabled', 'true') : $title.removeAttribute('disabled');
  };

  this.render();
}
