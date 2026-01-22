import client from "./prismaClient";

export async function getUserDetails(username) {
  return client.user.findUnique({
    where: {
      userName: username,
    },
  });
}
