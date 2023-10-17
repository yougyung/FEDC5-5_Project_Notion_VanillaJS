import { apiClient } from "./apiClient";

export const getPostList = async () => {
  const res = await apiClient();
  return res;
};
