// Todo: write controllers to get, various message types

export async function getVisitorMessages(c) {}

export async function getCommunityMessages(c) {}

export async function getGroupMessages(c) {}

export async function getDirectMessages(c) {
   const { userID } = await c.req.json();
   try {
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch User's direct messages" });
   }
}
