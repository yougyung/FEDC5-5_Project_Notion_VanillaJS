import { request } from "../utils/api.js"

export default function SideBar({ $target, initialState}) {
    const $sideBar = document.createElement('div')
    const $addButton = document.createElement('button')
    $addButton.innerText= '+'
    //const $deleteButton = document.createElement('button')
    $target.appendChild($addButton)
    $target.appendChild($sideBar)

    const ROOT_DUMMY_DATA = [
        {
          "id": 1, // Document id
          "title": "노션을 만들자", // Document title
          "documents": [
            {
              "id": 2,
              "title": "블라블라",
              "documents": [
                {
                  "id": 3,
                  "title": "함냐함냐",
                  "documents": []
                }
              ]
            }
          ]
        },
        {
          "id": 4,
          "title": "hello!",
          "documents": []
        }
    ]

    this.state = ROOT_DUMMY_DATA

    this.setState = nextState => {
        this.state = nextState
        console.log(this.state)
        this.render()
    }

    const renderDocumentTree = childDocuments => {
        return `
            ${childDocuments.map(document => {
                const {id, title, documents} = document
                return `
                    <ul>
                        <li data-id=${id}> 
                            ${title}
                            <button data-id=${id} data-name="addButton">
                                +
                            </button>
                            <button data-id=${id} data-name="deleteButton">
                                -
                            </button>
                        </li>
                        
                        ${documents.length === 0 ? '' : 
                            `${renderDocumentTree(documents)}`
                        }
 
                    </ul>
                `
            }).join('')}
        `
    }

    

    this.render = () => {
        //console.log(this.state)
        console.log('side render')
        
        
        $sideBar.innerHTML = `${renderDocumentTree(this.state)}`

    }

    const onAdd = async (parent) => {
        await request('', {
            method: "POST",
            body: JSON.stringify({
                title : "제목 없음 new",
                parent
            })
        })
    }

    const onDelete = async (id) => {
        await request(id, {
            method: "DELETE"
        })
    }
    
    
    $addButton.addEventListener('click', e => {
        onAdd(null)
    })

    $sideBar.addEventListener('click', e => {
        const $addSubButton = e.target.closest('button')
        console.log($addSubButton)

        if($addSubButton) {
            const {id, name} = $addSubButton.dataset
            if(name === 'addButton') {
                onAdd(id)
            }
            else if(name === 'deleteButton'){
                onDelete(id)
            }
        }
        
    })
    


    this.render()


    
    
    

    //add버튼을 클릭하면
    //해당 docuemnt의 하위 documents에 추가해주면 됨.
    
}