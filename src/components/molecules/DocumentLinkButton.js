/*
 * DocumentLinkButton
 * - LinkButton : 해당 문서로 이동
 * */
import styleInJS from '../../style/tagStyles.js';

export default function DocumentLinkButton({ $target, title, documentId }) {
  const $title = document.createElement('span');
  styleInJS({ $target: $title, styleTagName: 'DocumentLinkButton' });
  $title.setAttribute('data-id', documentId);
  $title.setAttribute('data-type', 'document');
  $target.appendChild($title);

  this.state = title;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $title.textContent = this.state;
    const { pathname } = window.location;
    if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      if (Number(postId) === documentId) {
        $title.style.color = 'blue';
      }
    }
  };

  this.render();
}
