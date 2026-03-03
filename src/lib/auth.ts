import { getServerBaseApi } from "@/api/ServerBaseApi";

export type User = {
  id: number;
  name?: string;
  surname?: string;
  email: string;
  type?: string;
};

export async function getUser(): Promise<User | null> {
  try {
    const api = await getServerBaseApi();
    const res = await api.get<User>("/auth/me");
    return res.data;
  } catch {
    return null;
  }
}
