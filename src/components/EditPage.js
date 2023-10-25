export default function DocumentEditor({ $target, initialState }) {
  const $page = document.createElement('div')
  $page.id = "document-contents"
  
  this.render = () => {
    $page.innerHTML = `
    <div>여기는 EditPage</div>
    <input type="text" name="title" style="width: 600px;" placeholder="제목 없음" value="타이틀" />
        <textarea name="content" style="width: 600px; height: 400px;" placeholder="내용을 입력하세요">내용을 입력하자</textarea>
    `
    $target.appendChild($page)
  }
  this.render()
}