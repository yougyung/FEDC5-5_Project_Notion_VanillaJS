import { request } from "../utils/api.js";
import getDeepCopy from "../utils/getDeepCopy.js";

const FETCH_DOCUMENTS = "documents/FETCH_DOCUMENTS";
const FETCH_CURRENT_DOCUMENT = "documents/FETCH_CURRENT_DOCUMENT";
const UPDATE_DOCUMENT = "documents/UPDATE_DOCUMENT";

export const fetchDocumentsAsync = () => async (dispatch, getState) => {
  try {
    const documents = await request("/documents");
    dispatch({ type: FETCH_DOCUMENTS, payload: documents });
  } catch (e) {
    console.log(e);
  }
};

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

export default function documentsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_DOCUMENTS: {
      return { ...state, documents: action.payload };
    }
    default:
      return state;
  }
}
