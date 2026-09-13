import Ax from "../helpers/axios";

export async function requestPasswordReset(email) {
   const response = await Ax.post("/auth/forgot-password", { email });
   return response.data;
}

export async function resetPassword(email, pin, password) {
   const response = await Ax.post("/auth/reset-password", {
      email,
      pin,
      password,
   });
   return response.data;
}
