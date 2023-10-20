export default function NotionList({
    $target,
    initialState,
    onListClick
}){
    const $notionList = document.createElement('div')
    $target.appendChild($notionList)

    this.state = initialState
    console.log(this.state)
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        console.log(this.state)
        $notionList.innerHTML = `
            <ul>
                ${this.state.map(list => `
                    <li data-id = ${list.id} >${list.title}</li>
                `).join('')}
            </ul>
        `
    }

    this.render()
}