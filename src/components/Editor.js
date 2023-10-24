export default function Editor({ $target }) {
    const $editor = document.createElement('div')

    $target.appendChild($editor)

    this.render = () => {
        $editor.innerHTML = `
            editor
        `
    }

    this.render()
}