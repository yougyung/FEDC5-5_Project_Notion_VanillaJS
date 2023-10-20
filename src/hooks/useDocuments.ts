import { useMounted, useState } from "@/core";
import { getDocuments, postDocument } from "@/apis";
import { setLocalStorage } from "@/utils";

function useDocuments() {
  const [documents, setDocuments] = useState([]);

  const fetchDocument = async () => {
    try {
      const documents = await getDocuments();

      setDocuments(documents);
    } catch (error) {
      console.error(error);
    }
  };

  const createDocument = async ({ title, parent }: { title: string; parent: null | number }) => {
    try {
      const postedDocument = await postDocument({ title, parent });

      setLocalStorage("document", { title, content: "" });

      history.pushState(null, "", `/documents/${postedDocument.id}`);

      fetchDocument();
    } catch (error) {
      console.error(error);
    }
  };

  useMounted(() => {
    fetchDocument();
  });

  return { documents, createDocument };
}

export default useDocuments;
