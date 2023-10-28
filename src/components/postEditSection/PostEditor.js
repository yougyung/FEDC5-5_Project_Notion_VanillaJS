export default function PostEditor({$target, initialState, onEdit}) {

    const $editor = document.createElement('div')
    $target.appendChild($editor)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        this.render()
    }

    this.render = () => {
        const {title, content} = this.state
        
        $editor.innerHTML = `
            <input name="title" style="width:300px;" value="${title}"></input>
            <br>
            <textarea name="content" style="width:300px; height:500px">${content ?? ''}</textarea>
        `
    }

    this.render()

    $editor.addEventListener('input', () => {
        const $input = $editor.querySelector('[name="title"]')
        const $content = $editor.querySelector('[name="content"]')

        onEdit({
            title: $input.value,
            content: $content.value
        })
    })
}