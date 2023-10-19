import api from "./core";

export const getDocuments = async () => {
  try {
    const documents = await api.get("/documents");

    return await documents;
  } catch (error) {
    console.error(error);
  }
};
