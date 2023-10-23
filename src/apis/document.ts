import api from "./core";
import { DocumentPostRequestDto, DocumentPutRequestDto } from "@/types";

export const getDocuments = async () => {
  try {
    const documents = await api.get({ url: "/documents" });

    return await documents;
  } catch (error) {
    console.error(error);
  }
};

export const getDocument = async (id: number) => {
  try {
    const document = await api.get({ url: `/documents/${id}` });

    return await document;
  } catch (error) {
    console.error(error);

    throw new Error(`error : ${error}`);
  }
};

export const postDocument = async ({ title, parent }: DocumentPostRequestDto) => {
  try {
    const postedDocument = await api.post({ url: "/documents", body: { title, parent } });

    return await postedDocument;
  } catch (error) {
    console.error(error);
  }
};

export const updateDocument = async ({ id, title, content }: DocumentPutRequestDto) => {
  try {
    const updaatedDocument = await api.put({ url: `/documents/${id}`, body: { title, content } });

    return await updaatedDocument;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocument = async (id: number) => {
  try {
    const deletedDocument = await api.delete({ url: `/documents/${id}` });

    return await deletedDocument;
  } catch (error) {
    console.error(error);
  }
};
