import request from "./api.js"

export const fetchDocument = async (id) => {
    const defaultDocument = {
        title: '',
        content: ''
    }

    return id === 'new' ? defaultDocument : await request(`/documents/${id}`)
}

export const fetchDocuments = async () => {

    return await request('/documents')
}