export default function Editor({ $target, initialState = {
    title: '', 
    content: ''
}, onEditing }) {
    const $editor = document.createElement('div')
    $editor.className = 'editor'
    $editor.innerHTML = `
        <input type="text" class="editor-title" name="title" />
        <div name="content" class="editor-content" contentEditable="true" ></div>
        `
    //contentEditable 사용시 커서가 맨 앞으로 이동하는 현상 해결해야함.

    this.state = initialState

    $target.appendChild($editor)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
/*
    this.renderRichContent = (content) => {
        
        if(content == null) {
            return ''
        }
        console.log(content)
        //서버에서 내려오는 개행값은 \n
        // textarea에서는 \n으로 개행을 처리해줌
        const richContent = content
            .split('\n')
            .map(line => {
                console.log(line)
                if(line.indexOf('# ') === 0) {
                    return `<h1 placeholder="제목1">${line.substring(2)}</h1>`
                }
                else if(line.indexOf('## ') === 0) {
                    return `<h2 placeholder="제목2">${line.substring(3)}</h2>`
                }
                else if(line.indexOf('### ') === 0) {
                    return `<h3 placeholder="제목3">${line.substring(4)}</h3>`
                }
                else if(line.indexOf('#### ') === 0) {
                    return `<h4 placeholder="제목4">${line.substring(5)}</h4>`
                }
                else {
                    
                    return line
                }
                
            }).join('<br>')
        return richContent
    }   

    */



    this.render = () => {
        const richContent = this.state.content == null ? '' : this.state.content
            .split('\n')
            .map(line => {
                console.log(line)
                if(line.indexOf('# ') === 0) {
                    return `<h1>${line.substring(2)}</h1>`
                }
                else if(line.indexOf('## ') === 0) {
                    return `<h2>${line.substring(3)}</h2>`
                }
                else if(line.indexOf('### ') === 0) {
                    return `<h3>${line.substring(4)}</h3>`
                }
                else if(line.indexOf('#### ') === 0) {
                    return `<h4>${line.substring(5)}</h4>`
                }
                return line
            }).join('<br>')

        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').innerHTML = richContent//this.renderRichContent(this.state.content) || ''
    } 

    this.render()

    $editor.querySelector('[name=title]').addEventListener('keyup', e=> {
        const nextState = {
            ...this.state,
            title: e.target.value
        }
        
        this.setState(nextState)
        onEditing(this.state)
    })

    $editor.querySelector('[name=content]').addEventListener('input', e=> {
        if(e.isComposing) {
            return
        }
        
        const nextState = {
            ...this.state,
            content: e.target.innerHTML
        }

        this.setState(nextState)
        onEditing(this.state)

        handleCursor(e.target);
    })


    const handleCursor = (element) => {

        if(element.innerText.length === 0) {
            element.focus()
            return
        }
        const range = document.createRange();
        const selection = window.getSelection();
        
        range.selectNodeContents(element)
        range.collapse(false); // move to the end of the range

        selection?.removeAllRanges();
        selection?.addRange(range);
        //range.deleteContents()
        
    }
    
}