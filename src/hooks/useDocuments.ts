import { useState, useEffect } from "@/core";
import { getDocuments, postDocument } from "@/apis";
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

  useEffect(() => {
    fetchDocuments();
  }, []);

  return { documents, createDocument };
};

export default useDocuments;
