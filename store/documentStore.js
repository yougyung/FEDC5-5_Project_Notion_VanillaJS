import createStore from "./createStore.js"
import {
  fetchAllDocuments,
  createNewDocument,
  deleteDocumentById
} from "../apis/documents.js"
const initialState = { documents: [] }

const reducer = async (state, action) => {
  switch (action.type) {
    case "FETCH":
      const documents = await fetchAllDocuments()
      return { ...state, documents }

    case "ADD":
      await createNewDocument(action.payload)
      const updatedDocuments = await fetchAllDocuments()
      return { ...state, documents: updatedDocuments }

    case "DELETE":
      await deleteDocumentById(action.payload)
      const deletedDocuments = await fetchAllDocuments()
      return { ...state, documents: deletedDocuments }

    default:
      return { ...state }
  }
}

export const documentStore = new createStore(initialState, reducer)
