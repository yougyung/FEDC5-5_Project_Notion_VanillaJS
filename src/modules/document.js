const FETCH_DOCUMENTS = "documents/FETCH_DOCUMENTS";
const UPDATE_DOCUMENT = "documents/UPDATE_DOCUMENT";

export const fetchDocuments = (documents) => ({
  type: FETCH_DOCUMENTS,
  documents,
});

export const updateDocument = (id, content) => ({
  type: UPDATE_DOCUMENT,
  id,
  content,
});

const initialState = {};

export default function documentsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return { ...state, documents: action.documents };
    case UPDATE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.id ? { ...doc, content: action.content } : doc
        ),
      };
    default:
      return state;
  }
}
