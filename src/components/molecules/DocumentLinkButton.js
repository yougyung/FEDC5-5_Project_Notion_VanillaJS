/*
 * DocumentLinkButton
 * - LinkButton : 해당 문서로 이동
 * */

import createDOM from '../../utils/createDOM.js';

export default function DocumentLinkButton({ $target, title, documentId }) {
  const $title = createDOM({
    $target,
    tagName: 'span',
    style: 'DocumentLinkButton',
    setAttribute: [
      ['data-id', documentId],
      ['data-type', 'document'],
    ],
  });

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
