import DocumentEditor from "./DocumnetEditor.js"

export default function DocumentSection({$target, initialState}) {

    const $section = document.createElement('div')
    $target.appendChild($section)
    
    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        editor.setState(this.state)
    }

    const editor = new DocumentEditor({
        $target,
        initialState: this.state
    })
}