import client from "../helpers/prismaClient";

export async function createGroup(c) {
   const { newGroupName: groupName, selectedMembers: groupMembers } =
      await c.req.json();
   const { userID: creatorId } = c.get("jwtPayload");

   try {
      // Todo create an empty group then create the memberships and feed then to the group
      // * Wrap the two operations in a transaction to provide fall back incase any fails

      const newPopulatedGroup = client.$transaction(async (tx) => {
         // create empty group with just a name
         const newEmptyGroup = await tx.group.create({
            data: {
               groupName,
            },
         });

         const id = newEmptyGroup.groupId;

         // create Admin membership
         const admin = await tx.groupMember.create({
            data: {
               userId: creatorId,
               groupId: id,
               role: "admin",
            },
         });

         // populate the rest of the group members
         const membersData = groupMembers.map((userId) => ({
            groupId: id,
            userId,
         }));

         const members = await tx.groupMember.createManyAndReturn({
            data: membersData,
         });

         return { group: newEmptyGroup, admin, members };
      });

      return c.json(
         {
            message: `Group "${groupName}" created successfully`,
            group: newPopulatedGroup,
         },
         201,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: `Failed to create group ${groupName}` }, 500);
   }
}

export async function getUserGroups(c) {
   const { userID: userId } = c.get("jwtPayload");
   try {
      const userGroups = await client.group.findMany({
         where: { groupMembers: { some: { userId } } },
         include: {
            _count: {
               select: { groupMembers: true },
            },
         },
      });

      // Fetch last message for each group
      const groupsWithLastMessage = await Promise.all(
         userGroups.map(async (group) => {
            const lastMessage = await client.conversation.findFirst({
               where: {
                  groupId: group.groupId,
                  messageType: "group",
               },
               orderBy: { createdAt: "desc" },
               select: {
                  content: true,
                  createdAt: true,
               },
            });
            return {
               ...group,
               lastMessage: lastMessage?.content || null,
               lastMessageTime: lastMessage?.createdAt || null,
            };
         }),
      );

      return c.json(
         {
            message: "Successfully fetched User groups",
            userGroups: groupsWithLastMessage,
         },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch User groups" });
   }
}
