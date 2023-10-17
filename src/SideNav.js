export default function SideNav({ $target, initialState }) {
  const $sideNav = document.createElement('nav');
  $sideNav.className = 'nav-container';
  $target.appendChild($sideNav);

  this.state = initialState;

  console.log(initialState);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $sideNav.innerHTML = `
        ${this.state
          .map(
            (document) =>
              `<div class="nav-document-container">
                <button class="nav-toggle-btn">🔽</button>
                <div class="nav-document" data-id=${document.id}>${document.title}</div>
                <button class="nav-toggle-btn">➕</button>
            </div>
            `
          )
          .join('')}
    `;
  };

  this.render();
}
