import { request } from "../utils/api.js";
import { push } from "../utils/handleRouteEvent.js";
const FETCH_DOCUMENTS = "documents/FETCH_DOCUMENTS";
const FETCH_CURRENT_DOCUMENT = "documents/FETCH_CURRENT_DOCUMENT";
const UPDATE_DOCUMENT = "documents/UPDATE_DOCUMENT";

export const fetchDocumentsAsync = () => async (dispatch, getState) => {
  try {
    const documents = await request("/documents");
    // [{id:number, title:string, documents:array, createAt:string, updatedAt:string}]
    dispatch({ type: FETCH_DOCUMENTS, payload: documents });
  } catch (e) {
    console.log(e);
  }
};

export const fetchCurrentDocumentAsync = (documentId) => async (dispatch) => {
  try {
    const selectedDocument = await request(`/documents/${documentId}`);
    dispatch({ type: FETCH_CURRENT_DOCUMENT, payload: selectedDocument });
  } catch (e) {
    console.log(e);
    alert("존재하지 않는 문서군요?");
    push("/");
  }
};

export const updateDocument = (title, content) => ({
  type: UPDATE_DOCUMENT,
  payload: {
    title,
    content,
  },
});

const initialState = {
  documents: [],
  selectedDocument: [],
};

export default function documentsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_DOCUMENTS: {
      return { ...state, documents: action.payload };
    }
    case FETCH_CURRENT_DOCUMENT: {
      return { ...state, selectedDocument: action.payload };
    }
    default:
      return state;
  }
}
