import { addEvent, appendChildAll, createDOM } from '../../utils/dom.js';
import Modal from '../common/Modal.js';

export default function DocumentFooter({ $target, onOpen }) {
  const $documentFooter = createDOM({
    tagName: 'div',
    className: 'document-footer',
  });
  const $helpButton = createDOM({
    tagName: 'button',
    className: 'help-button',
    innerHTML: '<i class="fa-regular fa-circle-question"></i>',
  });

  const $socialGroup = createDOM({ tag: 'div', className: 'social-group' });
  const $githubButton = createDOM({
    tagName: 'button',
    className: 'github-button',
    innerHTML:
      '<a href="https://github.com/lunarmoon7" target="_blank"><i class="fa-brands fa-github"></i></a>',
  });
  const $velogButton = createDOM({
    tagName: 'button',
    className: 'velog-button',
    innerHTML:
      '<a href="https://velog.io/@49crehbgr" target="_blank"><i class="fa-brands fa-vimeo"></i></a>',
  });

  appendChildAll($socialGroup, [$githubButton, $velogButton]);
  appendChildAll($documentFooter, [$helpButton, $socialGroup]);
  // appendChildAll($documentFooter, [$helpButton, $socialGroup]);
  appendChildAll($target, [$documentFooter]);

  // this.handleModal = () => {
  //   new Modal();
  // };

  // // Add Event
  // addEvent({
  //   $dom: $documentFooter,
  //   className: 'help-button',
  //   type: 'click',
  //   callback: this.handleModal,
  // });
}
