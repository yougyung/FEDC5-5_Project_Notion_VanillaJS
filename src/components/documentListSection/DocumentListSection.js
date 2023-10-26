import DocumnetList from "./DocumentList.js"

export default function DocumnetListSection({ $target, initialState, onSelect, onAdd, onRemove, onToggle }) {
    
    const $section = document.createElement('div')
    $target.appendChild($section)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState
        documentList.setState(this.state)
    }

    const documentList = new DocumnetList({
        $target: $section,
        initialState: this.state
    })
}