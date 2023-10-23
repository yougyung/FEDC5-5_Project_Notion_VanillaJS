import { useState, useEffect } from "@/core";
import { deleteDocument, getDocuments, postDocument, updateDocument } from "@/apis";
import { DocumentResponse } from "@/types";
import { navigateTo } from "@/utils";

const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);

  const fetchDocuments = async () => {
    try {
      const fetchedDocuments = await getDocuments();

      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error(error);
    }
  };

  const createDocument = async ({ title, parent }: { title: string; parent: null | number }) => {
    try {
      const postedDocument = await postDocument({ title, parent });

      navigateTo(`/documents/${postedDocument.id}`);

      fetchDocuments();
    } catch (error) {
      console.error(error);
    }
  };

  const modifyDocument = async ({ id, title, content }: { id: number; title: string; content: string }) => {
    try {
      const updatedDocument = await updateDocument({ id, title, content });

      fetchDocuments();
      return await updatedDocument;
    } catch (error) {
      console.error(error);
    }
  };

  const removeDocument = async (id: number) => {
    try {
      const deletedDocument = await deleteDocument({ id });

      fetchDocuments();
      return await deletedDocument;
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
