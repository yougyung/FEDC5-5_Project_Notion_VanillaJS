import api from "./core";

export const getDocuments = async () => {
  try {
    const documents = await api.get({ url: "/documents" });

    return await documents;
  } catch (error) {
    console.error(error);
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
