//편집화면 렌더링
import LinkButton from '../linkButton.js' 
export default function Editor({
    $target,
    initialState = {
        title: '',
        content: ''
    },
    onEdit
}) {
    this.state = initialState
    const $editor = document.createElement('div')
    $target.appendChild($editor)

    let isinitialize = true

    this.setState = (nextState) => {
        this.state = nextState
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        
        this.render()
    }

    // const renderLinkButton = (documents) => {
    //     return `
    //         <div>
    //             ${documents.map(list =>     
    //                 `<button data-id=${list.id} name="childDocumentButton" >${list.title}</button>
    //                 `).join('')}
    //         </div>
    //     `
    // };

    this.render = () => {
        if (isinitialize) {
            $editor.innerHTML = `
            <input type = "text" name = "title" style = "width: 600px;"  placeholder="제목 없음" autofocus value = "${this.state.title}"/>
            <textarea name = "content" style = "width: 600px; height: 400px"placeholder="내용을 입력하세요.">${this.state.content}</textarea>
        `
        isinitialize = false
        }

        
        // // documents가 존재하고 길이가 1 이상인 경우에만 버튼 렌더링
        // if (this.state.documents && this.state.documents.length > 0) {
        //     $editor.innerHTML += renderLinkButton(this.state.documents);
        // } else {
        //     // documents가 없거나 길이가 0이면 버튼을 숨깁니다.
        //     $editor.innerHTML = $editor.innerHTML.replace(renderLinkButton(this.state.documents), '');
        // }
        
    }
    this.render()


    $editor.addEventListener('keyup', e => {
        const {target} = e
        const name = target.getAttribute('name')
        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState)
            onEdit(this.state)
        }
    })
}