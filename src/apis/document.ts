import api from "./core";
import {
  DocumentDeleteResponseDto,
  DocumentDetailResponseDto,
  DocumentPostRequestDto,
  DocumentPostResponseDto,
  DocumentPutRequestDto,
  DocumentPutResponseDto,
  DocumentResponseDto,
} from "@/types";

export const getDocuments = async () => {
  const documents = await api.get<{ url: string }, DocumentResponseDto[]>({ url: "/documents" });

  return documents;
};

export const getDocument = async (id: number) => {
  const document = await api.get<{ url: string }, DocumentDetailResponseDto>({ url: `/documents/${id}` });

  return document;
};

export const postDocument = async ({ title, parent }: DocumentPostRequestDto) => {
  const postedDocument = await api.post<{ title: string; parent: null | number }, DocumentPostResponseDto>({
    url: "/documents",
    body: { title, parent },
  });

  return postedDocument;
};

export const updateDocument = async ({ id, title, content }: DocumentPutRequestDto) => {
  const updatedDocument = await api.put<{ title: string; content: string }, DocumentPutResponseDto>({
    url: `/documents/${id}`,
    body: { title, content },
  });

  return updatedDocument;
};

export const deleteDocument = async (id: number) => {
  const deletedDocument = await api.delete<{ url: string }, DocumentDeleteResponseDto>({ url: `/documents/${id}` });

  return deletedDocument;
};
