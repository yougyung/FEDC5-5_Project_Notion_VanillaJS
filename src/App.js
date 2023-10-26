import request from "./api/api.js"
import DocumentSection from "./components/documentEditSection/DocumentEditSection.js"
import DocumnetListSection from "./components/documentListSection/DocumentListSection.js"

export default function App({ $target, initialState }) {

    const $listContainer = document.createElement('div')
    const $documentContainer = document.createElement('div')

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        documentListSection.setState(this.state.documents)
        documentSection.setState(this.state.selectedDocument)
    }

    const documentListSection = new DocumnetListSection({
        $target: $listContainer,
        initialState: this.state.documents
    })

    const documentSection = new DocumentSection({
        $target: $documentContainer,
        initialState: this.state.selectedDocument
    })

    const fetchDocument = async (id) => {
        const selectedDocument = await request(`/documents/${id}`)

        this.setState({
            ...this.state,
            selectedDocument
        })
    }

    const fetchDocuments = async () => {
        const documents = await request('/documents')

        this.setState({
            ...this.state,
            documents
        })
    }

    const route = () => {
        const {pathname} = window.location

        $target.innerHTML = ''

        $target.appendChild($listContainer)

        if (pathname.startsWith('/documents/')) {
            const id = pathname.split('/documents/')[1]
            fetchDocument(id)
            $target.appendChild($documentContainer)
        }
    }

    window.addEventListener('route-content', (e) => {
        const { id } = e.detail

        if (id) {
            history.pushState(null,null, `/documents/${id}`)
        
            route()
        }
    })

    window.addEventListener('popstate', route)
    
    fetchDocuments()
    route()
}