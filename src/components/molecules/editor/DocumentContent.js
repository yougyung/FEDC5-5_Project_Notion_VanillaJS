/*
 * DocumentContent
 * - Content : 문서 내용 (Editor)
 */

import { moveCursorToEnd } from '../../../utils/editerUtils.js';

export default function DocumentContent({ $target, content, onEditContent }) {
  this.state = content;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const $content = document.createElement('div');
  $content.setAttribute('contenteditable', 'true');
  $content.style.width = '100%';
  $content.style.height = '90vh';
  $target.appendChild($content);

  $content.addEventListener('input', e => {
    this.setState(e.target.innerHTML);
    onEditContent(this.state);
    moveCursorToEnd($content);
  });

  this.render = () => {
    // const richContent = this.state
    //   .split('\n')
    //   .map(line => {
    //     if (line.indexOf('# ') === 0) {
    //       return `<h1>${line.substring(2)}</h1>`;
    //     } else if (line.indexOf('## ') === 0) {
    //       return `<h2>${line.substring(3)}</h2>`;
    //     } else if (line.indexOf('### ') === 0) {
    //       return `<h3>${line.substring(3)}</h3>`;
    //     }
    //     return line;
    //   })
    //   .join('<br/>');

    // $content.innerHTML = richContent;
    $content.innerHTML = this.state;
  };

  this.render();
}
