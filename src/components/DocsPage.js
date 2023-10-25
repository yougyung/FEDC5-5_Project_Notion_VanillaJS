export default function documentsPage({
  $target
}) {
  const $page = document.createElement('div')
  $page.id = 'sidebar'
  
  this.render = () => {
    $page.innerHTML = `
    <div>여기는 DocsPage</div>
    <ul>
      <li>루트 1</li>
      <li>루트 2</li>
      <ul>
        <li>하위 페이지</li>
      </ul>
    </ul>
    <div>페이지 추가 +</div>
    `
    $target.appendChild($page)
  }
  this.render()
}