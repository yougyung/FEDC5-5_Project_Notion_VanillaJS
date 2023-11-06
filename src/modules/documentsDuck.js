import { request } from "../utils/api.js";

const FETCH_DOCUMENTS = "documents/FETCH_DOCUMENTS";
const FETCH_CURRENT_DOCUMENT = "documents/FETCH_CURRENT_DOCUMENT";
const UPDATE_DOCUMENT = "documents/UPDATE_DOCUMENT";

export const fetchDocuments = () => ({
  type: FETCH_DOCUMENTS,
});

export const fetchCurrentDocument = (documentId) => ({
  type: FETCH_CURRENT_DOCUMENT,
  payload: documentId,
});

export const updateDocument = (title, content) => ({
  type: UPDATE_DOCUMENT,
  payload: {
    title,
    content,
  },
});

/* 
[{id:number, title:string, documents:array, createAt:string, updatedAt:string}]
*/

const initialState = {
  documents: [],
};

export default async function documentsReducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case FETCH_DOCUMENTS: {
      const documents = await request("/documents");
      return { ...state, documents };
    }
    default:
      return state;
  }
}
