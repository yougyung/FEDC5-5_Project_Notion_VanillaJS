import { addStorage } from './storage.js';

export default function EditFooter({ $target, initialState, onClick }) {
  const $footer = document.createElement('footer');
  $footer.className = 'edit-footer';

  const findChildDoc = (selectedDoc, childDocList) => {
    if (Object.keys(selectedDoc).length === 0) {
      addStorage('childDocList', []);
      return;
    }

    const childDocs = selectedDoc.documents;

    childDocs.forEach((child) => {
      childDocList.push({
        id: child.id,
        title: child.title,
      });
    });

    addStorage('childDocList', childDocList);
    return childDocList;
  };

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $target.appendChild($footer);
    $footer.innerHTML = '';

    const { selectedDoc } = this.state;
    // child 문서 탐색
    const childDocList = findChildDoc(selectedDoc, []);

    if (childDocList) {
      childDocList.forEach((child) => {
        const $childLinkBox = document.createElement('div');
        $childLinkBox.className = 'child-link-box';
        $childLinkBox.setAttribute('data-id', child.id);

        const $childLink = document.createElement('a');
        $childLink.className = 'child-link';
        $childLink.setAttribute('href', `/documents/${child.id}`);
        $childLink.innerText = child.title;

        $childLinkBox.appendChild($childLink);

        $footer.appendChild($childLinkBox);
      });
    }
  };

  $footer.addEventListener('click', (e) => {
    e.preventDefault();
    const clickedId = e.target.closest('div').dataset.id;
    onClick(clickedId);
  });
}
