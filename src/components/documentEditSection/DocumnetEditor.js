export default function DocumentEditor({$target, initialState}) {

    const $editor = document.createElement('div')
    $target.appendChild($editor)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        this.render()
    }

    this.render = () => {
        $editor.innerHTML = `
            <input type="text" style="width:300px;" value=${this.state.title} />
            <br>
            <textarea name="content" style="width:300px; height:500px">${this.state.content}</textarea>
        `
    }

    this.render()
}