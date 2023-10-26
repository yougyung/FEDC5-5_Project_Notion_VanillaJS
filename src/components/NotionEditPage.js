import Editor from "./Editor.js"
import { setItem, getItem, removeItem } from "../utils/storage.js"
import { request } from "../utils/api.js"

export default function NotionEditPage({$target, fetchDocuments}) {
    const $page = document.createElement('div')
    $page.className = 'notion-edit-page'

    this.state = {}

    this.setState = async nextState => {
        const { id } = nextState
        
        if (id) {
            const document = await request(`/documents/${id}`);
            this.state = document;
            editor.setState(this.state);
            this.render();
        } 
        else if($target.childNodes.length >= 2) {
            $target.removeChild($page);
        }
    }

    this.render = () => {
        $target.appendChild($page)
    }

    this.render()

    const DOCUMENT_LOCAL_SAVE_KEY = 'temp-post'

    let timer = null

    const editor = new Editor({
        $target : $page,
        initialState: {
            title: '',
            content: ''
        },
        onEditing : (document) => { //디바운스
            if(timer !== null) { 
                clearTimeout (timer) 
            }
            timer = setTimeout(async() => { //연속으로 타자를 칠 때에는 이벤트 발생을 지연
                setItem(DOCUMENT_LOCAL_SAVE_KEY, {
                    ...document,
                    updatedAt: new Date()
                })

                await request(`/documents/${document.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(getItem(DOCUMENT_LOCAL_SAVE_KEY)),
                  });
                  removeItem(DOCUMENT_LOCAL_SAVE_KEY);
          
                  fetchDocuments();
            }, 1000)
        }
    })
}