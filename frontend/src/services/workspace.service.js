import { api } from "./api";

export const listWorkspaces = async () => {
  const { data } = await api.get("/workspaces");
  return data;
};
