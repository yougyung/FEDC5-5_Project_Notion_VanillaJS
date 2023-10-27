export default function DocumentEditor({$target, initialState, onEdit}) {

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
            <input name="title" type="text" style="width:300px;" value=${title}></input>
            <br>
            <textarea name="content" style="width:300px; height:500px">${content ?? ''}</textarea>
        `
    }

    this.render()

    $editor.querySelector('[name="title"]').addEventListener('input', (e) => {
        onEdit({
            ...this.state,
            title: e.target.value
        })
    })

    $editor.querySelector('[name="content"]').addEventListener('input', e => {
        onEdit({
            ...this.state,
            content: e.target.value
        })
    })
}