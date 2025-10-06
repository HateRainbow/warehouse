import api from "@/api";

export async function searchUserByEmail(email: string) {
  return api.get(
    `/api/auth/admin/search-user?email=${encodeURIComponent(email)}`,
  );
}

export async function addUserToWarehouse(
  email: string,
  warehouseId: string,
  role: string,
) {
  return api.post("/api/auth/admin/warehouse/add-user", {
    email,
    warehouseId,
    role,
  });
}

export async function removeUserFromWarehouse(
  email: string,
  warehouseId: string,
) {
  return api.post("/api/auth/admin/warehouse/remove-user", {
    email,
    warehouseId,
  });
}
