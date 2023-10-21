export default function IndexPage({ $target }) {
  const $indexPage = document.createElement('div');

  $indexPage.innerHTML = 'hi';

  this.render = () => {
    $target.appendChild($indexPage);
  };
}
