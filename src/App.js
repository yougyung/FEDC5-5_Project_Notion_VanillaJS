import { fetchDocument, fetchDocuments } from "./api/fetch.js"
import DocumentEditSection from "./components/documentEditSection/DocumentEditSection.js"
import DocumnetListSection from "./components/documentListSection/DocumentListSection.js"
import { initRouter, routeTrigger } from "./router/router.js"

export default function App({ $target, initialState }) {

    const $listContainer = document.createElement('div')
    const $documentContainer = document.createElement('div')

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        documentListSection.setState(this.state.documents)

        if (this.state.selectedDocument) {
            documentEditSection.setState(this.state.selectedDocument)
        }
    }

    const documentListSection = new DocumnetListSection({
        $target: $listContainer,
        initialState: this.state.documents,
        onAdd: async () => {
            const documents = await fetchDocuments()

            this.setState({
                ...this.state,
                documents
            })
        },
        onDelete: async (deleteId) => {
            const documents = await fetchDocuments()

            this.setState({
                ...this.state,
                documents
            })

            if (deleteId == this.state.selectedDocument.id) {
                this.setState({
                    ...this.state,
                    selectedDocument: null
                })

                routeTrigger("/")
            }
        }
    })

    const documentEditSection = new DocumentEditSection({
        $target: $documentContainer,
        initialState: this.state.selectedDocument,
        onChangeList: async (editedPost) => {
            const documents = await fetchDocuments()
 
            this.setState({
                ...this.state,
                documents,
                selectedDocument: {
                    ...this.state.selectedDocument,
                    ...editedPost
                }
            })
        }
    })

    const route = async () => {
        const {pathname} = window.location

        $target.innerHTML = ''

        $target.appendChild($listContainer)

        if (pathname.startsWith('/documents/')) {
            const id = pathname.split('/documents/')[1]

            if (id) {
                const selectedDocument = await fetchDocument(id)

                this.setState({
                    ...this.state,
                    selectedDocument
                })
                
                if (selectedDocument) {
                    $target.appendChild($documentContainer)
                }
            }           
        }
    }

    const init = async () => {
        const documents = await fetchDocuments()

        this.setState({
            ...this.state,
            documents
        })

        route()

        initRouter(route)
    }
    
    init()
}