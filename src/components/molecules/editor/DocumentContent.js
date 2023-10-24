/*
 * DocumentContent
 * - Content : 문서 내용 (Editor)
 */

import { moveCursorToEnd } from '../../../utils/editerUtils.js';
import styleInJS from '../../../style/tagStyles.js';

export default function DocumentContent({ $target, content, onEditContent }) {
  const $content = document.createElement('div');
  $content.setAttribute('contenteditable', 'true');
  styleInJS({ $target: $content, styleTagName: 'DocumentContent' });
  $target.appendChild($content);

  $content.addEventListener('input', e => {
    this.setState(e.target.innerHTML);
    onEditContent(this.state);
    moveCursorToEnd($content);
  });

  this.state = content;
  this.setState = nextState => {
    // this.state = nextState;
    this.state = nextState.startsWith('<div>') ? nextState : `<div>${nextState}</div>`;

    this.render();
  };

  this.render = () => {
    const richContent = this.state
      .split('<div>')
      .map(line => {
        if (line.indexOf('# ') === 0) {
          return `<h1>${line.substring(2)}</h1>`;
        } else if (line.indexOf('## ') === 0) {
          return `<h2>${line.substring(3)}</h2>`;
        } else if (line.indexOf('### ') === 0) {
          return `<h3>${line.substring(3)}</h3>`;
        }
        return line;
      })
      .join('<div>');

    $content.innerHTML = richContent;
  };

  this.render();
}
