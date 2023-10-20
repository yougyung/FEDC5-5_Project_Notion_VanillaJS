import { request } from '.';
import { API_END_POINT } from '../constants/api';

export const getAllDocuments = async (options = {}) => {
  return await request(API_END_POINT.DOCUMENTS, {
    method: 'GET',
    ...options,
  });
};

export const getDetailOfDocument = async (documentId, options = {}) => {
  return await request(`${API_END_POINT.DOCUMENTS}/${documentId}`, {
    method: 'GET',
    ...options,
  });
};

export const createDocument = async (parentDocumentId, options = {}) => {
  return await request(
    API_END_POINT.DOCUMENTS,
    {
      method: 'POST',
      ...options,
    },
    {
      title: '',
      parent: parentDocumentId,
    },
  );
};

export const updateDocument = async (documentId, payload, options = {}) => {
  await request(
    `${API_END_POINT.DOCUMENTS}/${documentId}`,
    {
      method: 'PUT',
      ...options,
    },
    payload,
  );
};

export const deleteDocument = async (documentId, options = {}) => {
  await request(`${API_END_POINT.DOCUMENTS}/${documentId}`, {
    method: 'DELETE',
    ...options,
  });
};
