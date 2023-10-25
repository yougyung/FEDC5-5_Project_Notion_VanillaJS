import { useState, useEffect } from "@/core";
import { deleteDocument, getDocuments, postDocument, updateDocument } from "@/apis";
import { navigateTo } from "@/utils";
import { DocumentPostRequestDto, DocumentPutRequestDto, DocumentResponseDto } from "@/types";

const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentResponseDto[]>([]);

  const fetchDocuments = async () => {
    try {
      const fetchedDocuments = await getDocuments();

      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error(error);
    }
  };

  const createDocument = async ({ title, parent }: DocumentPostRequestDto) => {
    try {
      const postedDocument = await postDocument({ title, parent });

      navigateTo(`/documents/${postedDocument.id}`);

      fetchDocuments();
    } catch (error) {
      console.error(error);
    }
  };

  const modifyDocument = async ({ id, title, content }: DocumentPutRequestDto) => {
    try {
      const updatedDocument = await updateDocument({ id, title, content });

      fetchDocuments();
      return updatedDocument;
    } catch (error) {
      console.error(error);
    }
  };

  const removeDocument = async (id: number) => {
    try {
      const deletedDocument = await deleteDocument(id);

      fetchDocuments();
      return deletedDocument;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return { documents, createDocument, modifyDocument, removeDocument };
};

export default useDocuments;
