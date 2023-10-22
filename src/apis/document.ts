import api from "./core";

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

export const postDocument = async ({ title, parent }: { title: string; parent: null | number }) => {
  try {
    const postedDocument = await api.post({ url: "/documents", body: { title, parent } });

    return await postedDocument;
  } catch (error) {
    console.error(error);
  }
};

export const updateDocument = async ({ id, title, content }: { id: number; title: string; content: string }) => {
  try {
    const result = await api.put({ url: `/documents/${id}`, body: { title, content } });

    console.log(result);
    return await result;
  } catch (error) {
    console.error(error);
  }
};
