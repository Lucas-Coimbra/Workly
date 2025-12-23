import { api } from "./api";

export async function getMemberDashboard() {
  const res = await api.get("/dashboard/member");
  return res.data;
}
