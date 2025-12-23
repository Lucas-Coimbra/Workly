import { api } from "./api";

export async function getPlans() {
  const res = await api.get("/plans");
  return res.data;
}

export async function getPlanByName(name) {
  const res = await api.get(`/plans/${name}`);
  return res.data;
}
